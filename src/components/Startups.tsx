import { motion } from 'framer-motion';
import { FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';
import experienceData from '../data/experience.json';

const Startups = () => {
    // Find the startup (Resumate)
    const startup = experienceData.find(job => job.id === 'resumate') || experienceData[0];

    // Fallback if not found, but we know it's there based on file read
    if (!startup) return null;

    return (
        <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#050505]">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-[#0a0a0b] to-[#0a0a0b] z-10" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)`,
                    }}
                />

                {/* Advanced Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative z-20 container mx-auto px-6 py-20">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left: Content */}
                        <div className="space-y-8">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
                                >
                                    Latest Venture
                                </motion.span>

                                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
                                    Resumate
                                </h2>
                                <p className="text-xl text-white/40 font-light">
                                    by StreamlineX
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-white/50">
                                <div className="flex items-center gap-2">
                                    <FiMapPin className="text-indigo-400" />
                                    {startup.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="text-indigo-400" />
                                    {startup.startDate} - {startup.endDate}
                                </div>
                            </div>

                            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                                {startup.description && startup.description[0]}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {startup.technologies?.slice(0, 5).map((tech: any) => (
                                    <span
                                        key={tech.name}
                                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-mono"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>

                            <motion.a
                                href={startup.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Visit Startup
                                <FiExternalLink />
                            </motion.a>
                        </div>

                        {/* Right: Visual/Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="relative h-full min-h-[300px] flex items-center justify-center"
                        >
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f12] group">
                                {/* Video Loop */}
                                <iframe
                                    src="https://www.youtube.com/embed/zE8t6ItEl6o?playlist=zE8t6ItEl6o,iiQBA6SQuNQ&autoplay=1&mute=1&controls=0&loop=1&playsinline=1&rel=0&iv_load_policy=3"
                                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    title="Resumate Demo"
                                />

                                {/* Gradient Overlay (Optional, for better text visibility if needed, or just aesthetic) */}
                                <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay pointer-events-none" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Startups;
