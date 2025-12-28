import { motion } from 'framer-motion';
import {
    SiPython, SiSwift, SiReact, SiNodedotjs, SiJavascript,
    SiTailwindcss, SiFlask, SiGooglecloud, SiSpring, SiGithub,
    SiMysql, SiHtml5, SiCss3, SiJupyter, SiGnubash
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';

// Skills from resume with proper icons and brand colors
const technologies = [
    // Programming & Tools
    { name: 'Java', Icon: DiJava, color: '#ED8B00' },
    { name: 'Python', Icon: SiPython, color: '#3776AB' },
    { name: 'ASM', Icon: SiGnubash, color: '#4EAA25' },
    { name: 'C', Icon: SiJavascript, color: '#FFFFFF' },
    { name: 'Swift', Icon: SiSwift, color: '#F05138' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'HTML', Icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS', Icon: SiCss3, color: '#1572B6' },
    // Frameworks
    { name: 'React', Icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
    { name: 'TailwindCSS', Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
    { name: 'SwiftUI', Icon: SiSwift, color: '#F05138' },
    { name: 'SwiftData', Icon: SiSwift, color: '#F05138' },
    // Backend & Cloud
    { name: 'Spring Boot', Icon: SiSpring, color: '#6DB33F' },
    { name: 'Flask', Icon: SiFlask, color: '#FFFFFF' },
    { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
    { name: 'Google Cloud', Icon: SiGooglecloud, color: '#4285F4' },
    // Developer Tools
    { name: 'Git', Icon: SiGithub, color: '#FFFFFF' },
    { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
    { name: 'Jupyter', Icon: SiJupyter, color: '#F37626' },
    { name: 'Bash', Icon: SiGnubash, color: '#4EAA25' },
];

interface SkillsMarqueeProps {
    hero?: boolean;
}

export default function SkillsMarquee({ hero = false }: SkillsMarqueeProps) {
    // Duplicate the array 4 times for seamless infinite scroll
    const duplicatedTech = [...technologies, ...technologies, ...technologies, ...technologies];

    return (
        <section className={`py-5 overflow-hidden ${hero ? 'absolute bottom-0 left-0 right-0 bg-[#0f0f11]/80 backdrop-blur-sm border-t border-white/[0.04]' : 'relative bg-[#0f0f11] border-y border-white/[0.04]'}`}>
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f0f11] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f0f11] to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <motion.div
                className="flex gap-10 items-center"
                animate={{ x: ['0%', '-25%'] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 12,
                        ease: 'linear',
                    },
                }}
            >
                {duplicatedTech.map((tech, index) => {
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
