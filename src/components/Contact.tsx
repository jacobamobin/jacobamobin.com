import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiArrowUpRight } from 'react-icons/fi';
import profile from '../data/profile.json';

export default function Contact() {
    return (
        <section id="contact" className="relative py-32 bg-[#050505] overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm font-medium text-emerald-400 uppercase tracking-widest mb-4 block">
                            What's Next?
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                            Let's Work Together
                        </h2>

                        <p className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed">
                            I'm currently seeking Summer 2026 internships. Whether you have a question
                            or just want to say hi, you can contact me at the email below!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.a
                                href="mailto:jacobmobin@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center gap-2 w-44 py-3.5 bg-white text-black font-semibold text-[15px] rounded-full overflow-hidden transition-transform active:scale-95"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Say Hello</span>
                                <FiMail className="w-4 h-4" />
                            </motion.a>

                            <motion.a
                                href={profile.resume || "/Resume.pdf"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 w-44 py-3.5 bg-transparent text-white font-medium text-[15px] rounded-full border border-white/20 hover:bg-white/[0.05] hover:border-white/30 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>View Resume</span>
                                <FiArrowUpRight className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-20 pt-10 border-t border-white/5 flex justify-center gap-8"
                    >
                        {profile.socials?.github && (
                            <a
                                href={profile.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-white transition-colors p-2"
                            >
                                <FiGithub className="w-6 h-6" />
                            </a>
                        )}
                        {/* Fallback hardcoded if profile.json empty, as user requested links earlier */}
                        <a
                            href="https://www.linkedin.com/in/jacob-mobin/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors p-2"
                        >
                            <FiLinkedin className="w-6 h-6" />
                        </a>

                        {(profile.socials?.twitter) && (
                            <a
                                href={profile.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-white transition-colors p-2"
                            >
                                <FiTwitter className="w-6 h-6" />
                            </a>
                        )}
                    </motion.div>

                    <motion.div
                        className="mt-16 text-sm text-white/20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
                        <p className="mt-2">Built with Astro, React & Tailwind</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
