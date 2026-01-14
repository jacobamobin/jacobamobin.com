import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read projects.json
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// Output directory for images
const outputDir = path.join(__dirname, '../public/images/project-gallery');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Fetch Devpost media
async function getDevpostMedia(devpostUrl) {
    if (!devpostUrl || !devpostUrl.includes('devpost.com')) return { images: [], video: null };

    try {
        console.log(`  Fetching Devpost: ${devpostUrl}`);
        const res = await fetch(devpostUrl);
        if (!res.ok) return { images: [], video: null };

        const html = await res.text();
        const images = [];
        let videoId = null;

        // Extract YouTube video ID
        const youtubePatterns = [
            /youtube\.com\/embed\/([^"&?\/\s]{11})/,
            /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
            /youtu\.be\/([^"&?\/\s]{11})/,
            /youtube\.com\/v\/([^"&?\/\s]{11})/
        ];

        for (const pattern of youtubePatterns) {
            const match = html.match(pattern);
            if (match) {
                videoId = match[1];
                console.log(`  Found YouTube video: ${videoId}`);
                break;
            }
        }

        // Extract images from Devpost gallery (look for specific gallery containers)
        const galleryRegex = /<div[^>]*class="[^"]*software-list-content[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^">]+)"/g;
        const imgRegex = /<img[^>]+src="([^">]+)"/g;

        let match;
        while ((match = imgRegex.exec(html)) !== null) {
            let imgUrl = match[1];

            // Filter out common non-gallery images
            if (imgUrl.includes('img.shields.io') ||
                imgUrl.includes('badge') ||
                imgUrl.includes('avatar') ||
                imgUrl.includes('user-thumbnail') ||
                imgUrl.includes('/users/') ||
                imgUrl.includes('logo') ||
                imgUrl.includes('icon') ||
                imgUrl.includes('default') ||
                imgUrl.includes('placeholder') ||
                imgUrl.endsWith('.svg')) {
                continue;
            }

            // Only include images from Devpost CDN (more likely to be gallery images)
            if (!imgUrl.includes('devpost.com') && !imgUrl.includes('amazonaws.com')) {
                continue;
            }

            if (imgUrl.startsWith('//')) {
                imgUrl = 'https:' + imgUrl;
            }
            if (imgUrl.startsWith('http')) {
                images.push(imgUrl);
            }
        }

        console.log(`  Found ${images.length} images from Devpost`);
        return { images: [...new Set(images)], video: videoId };
    } catch (e) {
        console.error(`  Error fetching Devpost: ${e.message}`);
        return { images: [], video: null };
    }
}

// Fetch GitHub README media
async function getGitHubMedia(githubUrl) {
    if (!githubUrl || !githubUrl.includes('github.com')) return { images: [], video: null };

    try {
        const repoPath = githubUrl.replace('https://github.com/', '').replace(/\/$/, '');
        console.log(`  Fetching GitHub: ${repoPath}`);

        const branches = ['main', 'master'];
        let content = '';
        let validBranch = '';

        for (const branch of branches) {
            const url = `https://raw.githubusercontent.com/${repoPath}/${branch}/README.md`;
            const res = await fetch(url);
            if (res.ok) {
                content = await res.text();
                validBranch = branch;
                console.log(`  Found README on branch: ${branch}`);
                break;
            }
        }

        if (!content) {
            console.log(`  No README found`);
            return { images: [], video: null };
        }

        const images = [];
        let videoId = null;

        // Extract YouTube video
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const videoMatch = content.match(youtubeRegex);
        if (videoMatch) {
            videoId = videoMatch[1];
            console.log(`  Found YouTube video: ${videoId}`);
        }

        // Extract Markdown images
        const mdRegex = /!\[.*?\]\((.*?)\)/g;
        let match;
        while ((match = mdRegex.exec(content)) !== null) {
            let imgUrl = match[1];
            if (!imgUrl.startsWith('http')) {
                if (imgUrl.startsWith('./')) imgUrl = imgUrl.substring(2);
                if (imgUrl.startsWith('/')) imgUrl = imgUrl.substring(1);
                imgUrl = `https://raw.githubusercontent.com/${repoPath}/${validBranch}/${imgUrl}`;
            }
            if (!imgUrl.includes('img.shields.io') && !imgUrl.includes('badge')) {
                images.push(imgUrl);
            }
        }

        // Extract HTML images
        const htmlRegex = /<img[^>]+src="([^">]+)"/g;
        while ((match = htmlRegex.exec(content)) !== null) {
            let imgUrl = match[1];
            if (!imgUrl.startsWith('http')) {
                if (imgUrl.startsWith('./')) imgUrl = imgUrl.substring(2);
                if (imgUrl.startsWith('/')) imgUrl = imgUrl.substring(1);
                imgUrl = `https://raw.githubusercontent.com/${repoPath}/${validBranch}/${imgUrl}`;
            }
            if (!imgUrl.includes('img.shields.io') && !imgUrl.includes('badge')) {
                images.push(imgUrl);
            }
        }

        console.log(`  Found ${images.length} images from GitHub`);
        return { images: [...new Set(images)], video: videoId };
    } catch (e) {
        console.error(`  Error fetching GitHub: ${e.message}`);
        return { images: [], video: null };
    }
}

// Download image
async function downloadImage(url, filepath) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filepath, buffer);
        return true;
    } catch (e) {
        console.error(`    Failed to download ${url}: ${e.message}`);
        return false;
    }
}

// Main function
async function fetchAllProjectMedia() {
    console.log('Starting media fetch for all projects...\n');

    const results = {
        total: projects.length,
        processed: 0,
        videos: {},
        images: {}
    };

    for (const project of projects) {
        console.log(`\n[${++results.processed}/${results.total}] Processing: ${project.title}`);

        const projectDir = path.join(outputDir, project.id);
        if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true });
        }

        let allImages = [];
        let videoId = null;

        // Fetch from Devpost
        if (project.links?.devpost) {
            const devpostMedia = await getDevpostMedia(project.links.devpost);
            if (devpostMedia.video) {
                videoId = devpostMedia.video;
            }
            allImages = [...allImages, ...devpostMedia.images];
        }

        // Fetch from GitHub
        if (project.links?.github) {
            const githubMedia = await getGitHubMedia(project.links.github);
            if (!videoId && githubMedia.video) {
                videoId = githubMedia.video;
            }
            allImages = [...allImages, ...githubMedia.images];
        }

        // Remove duplicates
        allImages = [...new Set(allImages)];

        // Save video ID to metadata file
        if (videoId) {
            const metadataPath = path.join(projectDir, 'metadata.json');
            fs.writeFileSync(metadataPath, JSON.stringify({ videoId }, null, 2));
            results.videos[project.id] = videoId;
            console.log(`  Saved video ID: ${videoId}`);
        }

        // Download images
        if (allImages.length > 0) {
            console.log(`  Downloading ${allImages.length} images...`);
            let downloadCount = 0;

            for (let i = 0; i < allImages.length; i++) {
                const imgUrl = allImages[i];
                const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
                const filename = `${i + 1}${ext}`;
                const filepath = path.join(projectDir, filename);

                const success = await downloadImage(imgUrl, filepath);
                if (success) {
                    downloadCount++;
                    console.log(`    ✓ Downloaded: ${filename}`);
                }
            }

            results.images[project.id] = downloadCount;
            console.log(`  Downloaded ${downloadCount}/${allImages.length} images`);
        } else {
            console.log(`  No images found`);
        }
    }

    // Save summary
    const summaryPath = path.join(outputDir, 'fetch-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

    console.log('\n\n=== SUMMARY ===');
    console.log(`Total projects: ${results.total}`);
    console.log(`Videos found: ${Object.keys(results.videos).length}`);
    console.log(`Projects with images: ${Object.keys(results.images).length}`);
    console.log(`\nImages saved to: ${outputDir}`);
    console.log('\nReview the images and delete any unwanted ones.');
    console.log('Then update your projects.json with the gallery paths.\n');
}

fetchAllProjectMedia().catch(console.error);
