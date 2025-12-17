import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { FiArrowRight, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import {
    SiPython, SiSwift, SiReact, SiTypescript, SiNodedotjs,
    SiJavascript, SiFirebase, SiPostgresql, SiMongodb, SiDocker,
    SiGit, SiAmazon, SiTailwindcss, SiNextdotjs, SiFlask,
    SiSupabase, SiStripe, SiOpenai, SiFigma, SiVercel
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';


interface HeroProps {
    name: string;
    title: string;
    avatarUrl: string;
}

// Tech stack with proper icons and brand colors
const technologies = [
    { name: 'Python', Icon: SiPython, color: '#3776AB' },
    { name: 'Swift', Icon: SiSwift, color: '#F05138' },
    { name: 'React', Icon: SiReact, color: '#61DAFB' },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
    { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Java', Icon: DiJava, color: '#ED8B00' },
    { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
    { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
    { name: 'Git', Icon: SiGit, color: '#F05032' },
    { name: 'AWS', Icon: SiAmazon, color: '#FF9900' },
    { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'Flask', Icon: SiFlask, color: '#FFFFFF' },
    { name: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' },
    { name: 'Stripe', Icon: SiStripe, color: '#635BFF' },
    { name: 'OpenAI', Icon: SiOpenai, color: '#FFFFFF' },
    { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
    { name: 'Vercel', Icon: SiVercel, color: '#FFFFFF' },
];

// Floating code window component
const FloatingWindow = ({
    children,
    className,
    delay = 0,
    duration = 6,
    yOffset = 20
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
}) => (
    <motion.div
        className={`absolute pointer-events-none ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: [0, 1, 1, 0],
            y: [yOffset, 0, 0, -yOffset],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    >
        {children}
    </motion.div>
);

// Terminal window mockup
const TerminalWindow = () => (
    <div className="w-72 bg-[#1a1a1d] rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f10] border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-xs text-white/40 font-mono">terminal</span>
        </div>
        <div className="p-4 font-mono text-xs space-y-2">
            <p><span className="text-emerald-400">➜</span> <span className="text-blue-400">~/projects</span> <span className="text-white/80">git status</span></p>
            <p className="text-white/50">On branch main</p>
            <p className="text-emerald-400">✓ All commits pushed</p>
            <p><span className="text-emerald-400">➜</span> <span className="text-blue-400">~/projects</span> <span className="text-white/40 animate-pulse">▊</span></p>
        </div>
    </div>
);

// Code editor window mockup
const CodeWindow = () => (
    <div className="w-64 bg-[#1a1a1d] rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f10] border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-xs text-white/40 font-mono">app.tsx</span>
        </div>
        <div className="p-4 font-mono text-xs space-y-1">
            <p><span className="text-purple-400">const</span> <span className="text-blue-300">developer</span> <span className="text-white/60">=</span> <span className="text-white/80">{'{'}</span></p>
            <p className="pl-4"><span className="text-white/60">name:</span> <span className="text-emerald-400">"Jacob"</span>,</p>
            <p className="pl-4"><span className="text-white/60">passion:</span> <span className="text-emerald-400">"building"</span>,</p>
            <p className="pl-4"><span className="text-white/60">coffee:</span> <span className="text-orange-400">false</span></p>
            <p><span className="text-white/80">{'}'}</span></p>
        </div>
    </div>
);

// Stats card mockup
const StatsCard = () => (
    <div className="w-48 bg-[#1a1a1d] rounded-xl border border-white/[0.08] shadow-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-sm">✓</span>
            </div>
            <span className="text-xs text-white/60 font-medium">Projects</span>
        </div>
        <p className="text-2xl font-bold text-white">12+</p>
        <p className="text-xs text-white/40 mt-1">Completed this year</p>
    </div>
);

// Skills Marquee Component
const SkillsMarquee = () => {
    const tripletech = [...technologies, ...technologies, ...technologies];

    return (
        <div className="absolute bottom-0 left-0 right-0 py-5 bg-[#0f0f11]/80 backdrop-blur-sm border-t border-white/[0.04] overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f0f11] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f0f11] to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <motion.div
                className="flex gap-10 items-center"
                animate={{ x: ['0%', '-33.33%'] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 35,
                        ease: 'linear',
                    },
                }}
            >
                {tripletech.map((tech, index) => {
                    const Icon = tech.Icon;
                    return (
                        <div
                            key={`${tech.name}-${index}`}
                            className="flex items-center gap-2.5 shrink-0"
                        >
                            <Icon
                                className="w-6 h-6"
                                style={{ color: tech.color }}
                            />
                            <span
                                className="text-base font-medium text-white/70"
                            >
                                {tech.name}
                            </span>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default function Hero({ name, title, avatarUrl }: HeroProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth - 0.5) * 40);
            mouseY.set((clientY / innerHeight - 0.5) * 40);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0b]">
            {/* Animated grid background */}
            <div className="absolute inset-0">
                {/* Animated grid lines */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Subtle horizontal grid accent lines */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(4, 102, 200, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(4, 102, 200, 0.03) 1px, transparent 1px)
            `,
                        backgroundSize: '160px 160px',
                    }}
                />

                {/* Radial fade from center */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, #0a0a0b 70%)',
                    }}
                />

                {/* Animated gradient orb */}
                <motion.div
                    className="absolute w-[1000px] h-[1000px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: 'radial-gradient(circle, rgba(4, 102, 200, 0.08) 0%, transparent 60%)',
                        filter: 'blur(60px)',
                        x,
                        y,
                    }}
                />

                {/* Secondary animated orbs */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full -top-20 -right-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(4, 102, 200, 0.05) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full -bottom-20 -left-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(4, 102, 200, 0.04) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>



            {/* Floating windows - only visible on larger screens */}
            <div className="hidden xl:block">
                <FloatingWindow className="top-32 left-16" delay={0} duration={8}>
                    <TerminalWindow />
                </FloatingWindow>

                <FloatingWindow className="top-40 right-20" delay={2} duration={9}>
                    <CodeWindow />
                </FloatingWindow>

                <FloatingWindow className="bottom-48 left-24" delay={4} duration={7}>
                    <StatsCard />
                </FloatingWindow>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Profile Picture */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10"
                >
                    <div className="relative inline-block">
                        {/* Subtle glow ring */}
                        <motion.div
                            className="absolute -inset-1 rounded-full opacity-50"
                            style={{
                                background: 'linear-gradient(135deg, rgba(4, 102, 200, 0.4), rgba(4, 102, 200, 0.1))',
                            }}
                            animate={{
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        {/* Image */}
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="relative w-32 h-32 rounded-full object-cover border-2 border-white/10"
                        />

                        {/* Location Pill (Overlapping) */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20"
                        >
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0b]/80 border border-white/10 backdrop-blur-md shadow-lg whitespace-nowrap">
                                <FiMapPin className="w-3 h-3 text-emerald-500" />
                                <span className="text-white/60 text-xs font-medium tracking-wide">Toronto, ON</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-5 tracking-[-0.02em]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {name}
                </motion.h1>

                {/* Title */}
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl text-white/50 font-medium mb-6"
                >
                    {title}
                </motion.p>



                {/* Description */}
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white/40 max-w-lg mx-auto text-lg mb-12 leading-relaxed"
                >
                    I just like building things.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
                >
                    <motion.a
                        href="#project-carousel"
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0a0a0b] font-semibold text-[15px] rounded-full hover:bg-white/90 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View Projects
                        <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.a>
                    <motion.a
                        href="mailto:jacob.mobin@gmail.com"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-white font-medium text-[15px] rounded-full border border-white/20 hover:bg-white/[0.05] hover:border-white/30 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get in Touch
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center gap-3"
                >
                    <motion.a
                        href="https://github.com/jacobamobin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiGithub className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/jacob-mobin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiLinkedin className="w-5 h-5" />
                    </motion.a>
                </motion.div>
            </div>

            {/* Skills Marquee at bottom */}
            <SkillsMarquee />
        </section>
    );
}
