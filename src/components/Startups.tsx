import { motion } from 'framer-motion';
import { FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';
import startupsData from '../data/startups.json';

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const StartupSection = ({ startup, index }: { startup: any; index: number }) => {
    const accentColor = startup.accentColor;

    return (
        <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#050505]">
            {/* Background with dynamic accent color */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(135deg, ${hexToRgba(accentColor, 0.2)} 0%, #0a0a0b 50%, #0a0a0b 100%)`
                    }}
                />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, ${hexToRgba(accentColor, 0.1)} 0%, transparent 50%)`,
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
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6"
                                    style={{
                                        backgroundColor: hexToRgba(accentColor, 0.1),
                                        borderColor: hexToRgba(accentColor, 0.2),
                                        color: accentColor
                                    }}
                                >
                                    {startup.badge}
                                </motion.span>

                                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
                                    {startup.name}
                                </h2>
                                <p className="text-xl text-white/40 font-light">
                                    {startup.tagline}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-white/50">
                                <div className="flex items-center gap-2">
                                    <FiMapPin style={{ color: accentColor }} />
                                    {startup.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiCalendar style={{ color: accentColor }} />
                                    {startup.startDate} - {startup.endDate}
                                </div>
                            </div>

                            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                                {startup.description}
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
                                href={startup.url}
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

                        {/* Right: Visual/Video or Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="relative h-full min-h-[300px] flex items-center justify-center"
                        >
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f12] group">
                                {startup.videoEmbed ? (
                                    <>
                                        {/* Video Loop */}
                                        <iframe
                                            src={startup.videoEmbed}
                                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            title={`${startup.name} Demo`}
                                        />
                                        {/* Gradient Overlay */}
                                        <div
                                            className="absolute inset-0 mix-blend-overlay pointer-events-none"
                                            style={{
                                                background: hexToRgba(accentColor, 0.1)
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* Static Image */}
                                        <img
                                            src={startup.image}
                                            alt={startup.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        {/* Gradient Overlay */}
                                        <div
                                            className="absolute inset-0 mix-blend-overlay pointer-events-none"
                                            style={{
                                                background: hexToRgba(accentColor, 0.1)
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Startups = () => {
    return (
        <div id="startups">
            {startupsData.map((startup, index) => (
                <StartupSection key={startup.id} startup={startup} index={index} />
            ))}
        </div>
    );
};

export default Startups;
