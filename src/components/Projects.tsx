import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ActivityCalendar } from 'react-activity-calendar';
import { FiGithub } from 'react-icons/fi';
import projectsData from '../data/projects.json';

// --- Project Card Component ---
const ProjectCard = ({ project }: { project: any }) => {
    const glowColor = project.isHackathon ? 'from-amber-600/20 to-amber-900/5' : 'from-emerald-600/20 to-emerald-900/5';

    return (
        <a href={`/projects/${project.id}`} className="block w-[300px] shrink-0 group">
            <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-[#121214] transition-all group-hover:border-white/20 relative">
                {/* Image */}
                <div className="h-40 overflow-hidden bg-[#1a1a1d]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="p-4 relative">
                    {/* Internal Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            {project.isHackathon ? (
                                <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-500/20">
                                    Hackathon
                                </span>
                            ) : (
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/20">
                                    Personal
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 truncate">{project.title}</h3>
                        <p className="text-xs text-white/50 truncate uppercase tracking-wide">{project.type}</p>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default function Projects() {
    const [calendarData, setCalendarData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const controls1 = useAnimation();
    const controls2 = useAnimation();

    const startAnimation = (controls: any, duration: number) => {
        controls.start({
            x: ['0%', '-33.33%'],
            transition: {
                repeat: Infinity,
                duration: duration,
                ease: "linear",
            },
        });
    };

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch('https://github-contributions-api.jogruber.de/v4/jacobamobin?y=last');
                const data = await response.json();

                if (data && data.contributions) {
                    setCalendarData(data.contributions);
                }
            } catch (e) {
                console.error("Failed to fetch contributions", e);
                setCalendarData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();

        // Start marquee animations
        startAnimation(controls1, 30);
        startAnimation(controls2, 35);
    }, []);

    // Split projects into rows for the marquee
    const row1 = projectsData.slice(0, 5);
    const row2 = projectsData.slice(5, 9);
    // Duplicate for seamless scroll
    const marqueeRow1 = [...row1, ...row1, ...row1];
    const marqueeRow2 = [...row2, ...row2, ...row2];

    return (
        <section id="projects" className="py-24 bg-[#0a0a0b] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 mb-20">
                {/* 1. Git Graph Section */}
                <div className="mb-24">
                    {/* Story / Intro */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-6">Always shipping.</h2>
                        <p className="text-lg text-white/60 leading-relaxed">
                            Consistently building, testing, and deploying production software.
                        </p>
                    </div>

                    <div className="flex justify-center w-full px-4">
                        <div className="w-full max-w-5xl bg-black/40 rounded-xl p-6 md:p-8">

                            {/* Header: Handle */}
                            <div className="flex items-center gap-4 mb-8">
                                <img
                                    src="/images/profile/pfp.png"
                                    alt="Jacob Mobin"
                                    className="w-10 h-10 rounded-full border border-white/10"
                                />
                                <div className="text-white font-medium text-lg flex items-center gap-2">
                                    <span className="text-white/60">@jacobamobin</span> on GitHub
                                </div>
                            </div>

                            {/* Graph */}
                            <div className="flex justify-center overflow-x-auto pb-6 scrollbar-hide">
                                {loading ? (
                                    <div className="h-[140px] flex items-center justify-center text-white/20 animate-pulse w-full">
                                        Loading Activity...
                                    </div>
                                ) : (
                                    <div className="min-w-[700px]">
                                        <ActivityCalendar
                                            data={calendarData}
                                            labels={{
                                                totalCount: '{{count}} commits in the last year',
                                            }}
                                            theme={{
                                                light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                            }}
                                            blockRadius={3}
                                            blockSize={13}
                                            blockMargin={4}
                                            fontSize={14}
                                            style={{ color: '#ffffff' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Projects Marquee Section */}
            <div id="project-carousel" className="relative w-full pt-16 scroll-mt-24">
                <div className="container mx-auto px-6 mb-8">
                    <h2 className="text-2xl font-bold text-white">Select Projects</h2>
                </div>

                {/* Marquee Row 1 */}
                <div className="flex gap-6 overflow-hidden mb-8">
                    <motion.div
                        className="flex gap-6 pl-6"
                        animate={controls1}
                    >
                        {marqueeRow1.map((project, idx) => (
                            <ProjectCard key={`${project.id}-1-${idx}`} project={project} />
                        ))}
                    </motion.div>
                </div>

                {/* Marquee Row 2 (Slower or Offset) */}
                <div className="flex gap-6 overflow-hidden">
                    <motion.div
                        className="flex gap-6 pl-6"
                        animate={controls2}
                    >
                        {marqueeRow2.map((project, idx) => (
                            <ProjectCard key={`${project.id}-2-${idx}`} project={project} />
                        ))}
                    </motion.div>
                </div>

                {/* Gradient Fades for Marquee Edges */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#0a0a0b] to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#0a0a0b] to-transparent pointer-events-none z-10" />
            </div>

        </section>
    );
}
