import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import experienceData from '../data/experience.json';

export default function Experience() {
    return (
        <section id="experience" className="relative py-32 bg-[#0a0a0b] overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                        >
                            Experience
                        </motion.h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    </div>

                    {/* Timeline */}
                    <div className="space-y-8">
                        {experienceData.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Glass Card */}
                                <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">

                                    {/* Subtle Gradient Glow on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Logo */}
                                        <div className="shrink-0">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1d] shadow-lg group-hover:scale-105 transition-transform duration-300">
                                                {job.logo ? (
                                                    <img
                                                        src={job.logo}
                                                        alt={job.company}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white/40">
                                                        {job.company.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                                                    {job.position}
                                                </h3>
                                                <span className="text-sm font-mono text-white/40 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] w-fit">
                                                    {job.startDate} - {job.endDate}
                                                </span>
                                            </div>

                                            <a
                                                href={job.companyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-base text-white/60 hover:text-white mb-4 transition-colors"
                                            >
                                                {job.company}
                                            </a>

                                            {/* Description */}
                                            {job.description && (
                                                <ul className="space-y-2 mb-5">
                                                    {job.description.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                                                            <span className="mt-2 w-1 h-1 rounded-full bg-white/20 shrink-0 group-hover:bg-purple-400/50 transition-colors" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Tech Stack */}
                                            {job.technologies && (
                                                <div className="flex flex-wrap gap-2">
                                                    {job.technologies.map(tech => (
                                                        <span
                                                            key={tech.name}
                                                            className="px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/40 bg-white/[0.03] rounded-md border border-white/5 group-hover:text-white/60 group-hover:border-white/10 transition-colors"
                                                        >
                                                            {tech.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
