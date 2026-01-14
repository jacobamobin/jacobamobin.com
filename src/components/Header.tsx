import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';

const navLinks = [
    { name: 'Startups', href: '/#startups' },
    { name: 'Projects', href: '/#project-carousel' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${isScrolled || isMobileMenuOpen
                ? 'bg-[#0a0a0b]/95 backdrop-blur-md shadow-lg shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo - Left */}
                    <motion.a
                        href="/"
                        className="flex items-center group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-xl font-bold text-white tracking-tight">
                            Jacob<span className="text-accent">.</span>
                        </span>
                    </motion.a>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-[15px] text-white/60 hover:text-white transition-colors duration-200 font-medium"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -1 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Resume Link - Right */}
                    <motion.a
                        href="/Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-1.5 text-[15px] font-medium text-white hover:text-accent transition-colors duration-200 group"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        whileHover={{ x: 2 }}
                    >
                        Resume
                        <FiArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? (
                            <HiOutlineX className="w-6 h-6" />
                        ) : (
                            <HiOutlineMenuAlt3 className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="md:hidden overflow-hidden absolute top-full left-0 right-0 bg-[#0a0a0b]/95 backdrop-blur-md border-b border-white/[0.06]"
                        >
                            <div className="py-6 space-y-1 px-6">
                                {navLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className="block px-2 py-3 text-[15px] text-white/60 hover:text-white transition-colors font-medium"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <a
                                    href="/Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium text-accent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Resume
                                    <FiArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}
