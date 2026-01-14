# Project Media Fetcher

This script automatically fetches images and videos from your project's GitHub repos and Devpost pages.

## How to Use

1. **Run the fetch script:**
   ```bash
   npm run fetch-media
   ```

2. **Review the downloaded images:**
   - Images are saved to `public/images/project-gallery/{project-id}/`
   - Each project gets its own folder
   - Go through each folder and **delete any unwanted images** (profile pics, logos, badges, etc.)

3. **Update your projects.json:**
   After cleaning up the images, add the gallery paths to your projects:
   ```json
   {
     "id": "sourced",
     "title": "Sourced",
     "gallery": [
       "/images/project-gallery/sourced/1.jpg",
       "/images/project-gallery/sourced/2.png",
       "/images/project-gallery/sourced/3.jpg"
     ]
   }
   ```

4. **Video metadata:**
   - YouTube video IDs are automatically saved to `{project-id}/metadata.json`
   - The project detail pages will automatically display these videos

## What Gets Fetched

- **From Devpost**: YouTube videos and gallery images
- **From GitHub**: Images from README and YouTube videos
- **Priority**: Devpost video > GitHub video

## Output Structure

```
public/images/project-gallery/
├── sourced/
│   ├── metadata.json (contains videoId)
│   ├── 1.jpg
│   ├── 2.png
│   └── 3.jpg
├── bin-buddy/
│   ├── metadata.json
│   ├── 1.jpg
│   └── 2.png
└── fetch-summary.json (summary of all fetches)
```

## Tips

- Delete any images that are:
  - Profile pictures
  - Logos or badges
  - Low quality or irrelevant
  - Duplicates

- Keep images that show:
  - App screenshots
  - Demo workflows
  - UI/UX examples
  - Feature highlights
