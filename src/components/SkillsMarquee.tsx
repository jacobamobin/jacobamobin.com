'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
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

// Mobile-only: filter out duplicate icons (keep first occurrence)
const mobileUniqueTechnologies = technologies.filter((tech, index, arr) =>
    arr.findIndex(t => t.Icon === tech.Icon) === index
);

interface SkillsMarqueeProps {
    hero?: boolean;
}

export default function SkillsMarquee({ hero = false }: SkillsMarqueeProps) {
    const [isHovered, setIsHovered] = useState(false);
    const xPos = useRef(0);
    const currentSpeed = useRef(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const baseSpeed = 50; // pixels per second
    const targetSpeed = isHovered ? 0 : 1;

    // Smooth animation with eased speed transitions
    useAnimationFrame((_, delta) => {
        // Smoothly interpolate current speed towards target (0 when hovered, 1 when not)
        const lerpFactor = 0.05; // Controls how fast the speed changes
        currentSpeed.current += (targetSpeed - currentSpeed.current) * lerpFactor;

        // Update position based on current speed
        const movement = (baseSpeed * (delta / 1000)) * currentSpeed.current;
        xPos.current -= movement;

        // Get the width of half the content (one full set) for seamless wrapping
        if (containerRef.current) {
            const halfWidth = containerRef.current.scrollWidth / 2;
            // Use modulo-style wrap to avoid jump - when we've scrolled past one full set, wrap back
            if (xPos.current <= -halfWidth) {
                xPos.current += halfWidth;
            }
            containerRef.current.style.transform = `translateX(${xPos.current}px)`;
        }
    });

    // Duplicate the array 2 times for seamless infinite scroll
    const duplicatedTech = [...technologies, ...technologies];
    const duplicatedMobileTech = [...mobileUniqueTechnologies, ...mobileUniqueTechnologies];

    return (
        <section
            className={`py-5 overflow-hidden ${hero ? 'absolute bottom-0 left-0 right-0 bg-[#0f0f11]/80 backdrop-blur-sm border-t border-white/[0.04]' : 'relative bg-[#0f0f11] border-y border-white/[0.04]'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f0f11] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f0f11] to-transparent z-10 pointer-events-none" />

            {/* Desktop scrolling container */}
            <div
                ref={containerRef}
                className="hidden md:flex gap-10 items-center will-change-transform"
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
                            <span className="text-base font-medium text-white/70">
                                {tech.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile scrolling container - icons only, no duplicates */}
            <div className="flex md:hidden gap-8 items-center skills-marquee-track">
                {duplicatedMobileTech.map((tech, index) => {
                    const Icon = tech.Icon;
                    return (
                        <div
                            key={`mobile-${tech.name}-${index}`}
                            className="shrink-0"
                        >
                            <Icon
                                className="w-6 h-6"
                                style={{ color: tech.color }}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
