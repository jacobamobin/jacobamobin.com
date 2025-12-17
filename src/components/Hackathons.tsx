import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiExternalLink, FiLinkedin, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';
import hackathonsData from '../data/hackathons.json';

// --- LinkedIn Post Card Component ---
const LinkedInPost = ({
    author,
    date,
    content,
    likes,
    comments,
    link
}: {
    author: string;
    date: string;
    content: string;
    likes: string;
    comments: string;
    link: string
}) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#1d2226] border border-white/10 rounded-xl p-4 w-full max-w-sm shrink-0 shadow-lg hover:shadow-xl transition-all"
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src="/images/profile/pfp.png"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-white/10"
                        onError={(e) => { e.currentTarget.src = "https://github.com/jacobamobin.png" }}
                    />
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-white">{author}</span>
                            <span className="text-xs text-white/40">• 1st</span>
                        </div>
                        <p className="text-xs text-white/60">{date} • <FiLinkedin className="inline w-3 h-3" /></p>
                    </div>
                </div>

                {/* Content */}
                <p className="text-sm text-white/90 mb-4 line-clamp-4 leading-relaxed whitespace-pre-line">
                    {content}
                </p>

                {/* Engagement Mock */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-white/40">
                    <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">👍</div>
                            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white">❤️</div>
                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white">👏</div>
                        </div>
                        <span>{likes}</span>
                    </div>
                    <span>{comments} comments</span>
                </div>
            </motion.div>
        </a>
    );
};

// --- Hackathons Component ---
export default function Hackathons() {
    // Manually define LinkedIn posts based on user request
    const linkedInPosts = [
        {
            id: 1,
            author: "Jacob Mobin",
            date: "1 week ago",
            content: "Last weekend I took part in Canada's largest hackathon! It was an incredible experience connecting with so many developers. We built something amazing that pushes the boundaries of what's possible in just 36 hours. 🚀\n\n#hackthenorth #coding #hackathon",
            likes: "428",
            comments: "24",
            link: "https://www.linkedin.com/posts/jacob-mobin_last-weekend-i-took-part-in-canadas-largest-activity-7311897422593486849-Zdf6"
        },
        {
            id: 2,
            author: "Jacob Mobin",
            date: "2 months ago",
            content: "My team brought home 1st place at SolutionHacks! 🏆 We built Bin Buddy to tackle sustainable waste management. Huge thanks to the organizers for an amazing event.\n\n#solutionhacks #winner #sustainability",
            likes: "856",
            comments: "52",
            link: "https://www.linkedin.com/posts/jacob-mobin_my-team-brought-home-1st-place-at-solution-activity-7345901899633598465-LZ7O"
        },
        {
            id: 3,
            author: "Jacob Mobin",
            date: "3 months ago",
            content: "I got 1 million views and won third at GoonHacks! 😱 What started as a fun weekend project turned into something viral. Check out the demo below!\n\n#viral #hackathon #building",
            likes: "1,240",
            comments: "142",
            link: "https://www.linkedin.com/posts/jacob-mobin_i-got-1-million-views-and-won-third-at-goonhacks-activity-7397346025729888256-DA4Y"
        },
        {
            id: 4,
            author: "Jacob Mobin",
            date: "4 months ago",
            content: "Won 1st overall as a solo squad at Sheridan! 🥇 Pushing myself to build a full-stack app alone in 24 hours was tough but rewarding. Excited for the next challenge!\n\n#hackville #sheridan #fullstack",
            likes: "392",
            comments: "18",
            link: "https://www.linkedin.com/posts/jacob-mobin_won-1st-overall-as-a-solo-squad-at-sheridan-activity-7399207569317113856-J9kw"
        }
    ];

    return (
        <section id="hackathons" className="py-24 bg-[#0a0a0b] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left Column: Hackathons List */}
                    <div>
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Hackathons</h2>
                            <p className="text-white/50">Building rapidly, solving real problems, and winning awards.</p>
                        </div>

                        <div className="space-y-6">
                            {hackathonsData.map((hackathon: any) => (
                                <motion.div
                                    key={hackathon.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-[#121214] border border-white/5 hover:border-white/10 p-6 rounded-2xl transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4">
                                            {/* Logo/Image */}
                                            {hackathon.image && (
                                                <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                                    <img
                                                        src={hackathon.image}
                                                        alt={hackathon.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {hackathon.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                                                    <span className="flex items-center gap-1"><FiCalendar /> {hackathon.date}</span>
                                                    <span className="flex items-center gap-1"><FiMapPin /> {hackathon.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {hackathon.achievement && (
                                            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-2 shrink-0">
                                                <FiAward className="text-amber-500 text-sm" />
                                                <span className="text-amber-500 text-xs font-bold whitespace-nowrap hidden sm:inline">{hackathon.achievement}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                                        {hackathon.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {hackathon.technologies?.map((tech: any) => (
                                            <span key={tech.name} className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/50 border border-white/5">
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: LinkedIn Feed (Marquee/Scroll) */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <FiLinkedin className="text-[#0077b5]" />
                                    Featured Posts
                                </h3>
                                <a
                                    href="https://linkedin.com/in/jacobamobin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-white/40 hover:text-white transition-colors"
                                >
                                    View Profile →
                                </a>
                            </div>

                            {/* Scrolling Container */}
                            <div className="relative h-[800px] overflow-hidden rounded-2xl bg-[#0f0f12] border border-white/5">
                                {/* Gradient fades */}
                                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0f0f12] to-transparent z-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0f0f12] to-transparent z-10 pointer-events-none" />

                                <div className="absolute inset-x-0 top-0 p-6 space-y-6 animate-marquee-vertical hover:pause-animation">
                                    {/* Duplicated list for seamless scroll */}
                                    {[...linkedInPosts, ...linkedInPosts].map((post, index) => (
                                        <LinkedInPost key={`${post.id}-${index}`} {...post} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
