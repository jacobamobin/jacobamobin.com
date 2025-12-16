import { motion } from 'framer-motion';
import {
    SiPython, SiSwift, SiReact, SiTypescript, SiNodedotjs,
    SiJavascript, SiFirebase, SiPostgresql, SiMongodb, SiDocker,
    SiGit, SiAmazon, SiTailwindcss, SiNextdotjs, SiFlask,
    SiSupabase, SiStripe, SiOpenai, SiFigma, SiVercel
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';

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

export default function SkillsMarquee() {
    // Triple the array for seamless infinite scroll
    const tripletech = [...technologies, ...technologies, ...technologies];

    return (
        <section className="relative py-5 bg-[#0f0f11] border-y border-white/[0.04] overflow-hidden">
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
        </section>
    );
}
