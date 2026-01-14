import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiX, FiSend, FiBriefcase, FiCheckCircle } from 'react-icons/fi';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import startupsData from '../data/startups.json';

export default function HiringManagerButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [requirements, setRequirements] = useState('');
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const generatePrompt = () => {
        // Compile startup info
        const startups = startupsData.map(startup =>
            `${startup.name} (${startup.badge}): ${startup.description}\nTechnologies: ${startup.technologies.slice(0, 4).map(t => t.name).join(', ')}`
        ).join('\n\n');

        // Compile experience
        const experiences = experienceData.map(exp =>
            `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\nTechnologies: ${exp.technologies?.slice(0, 5).map(t => t.name).join(', ') || 'N/A'}`
        ).join('\n\n');

        // Summarize projects
        const projectSummary = `${projectsData.length} total projects (${projectsData.filter(p => p.isHackathon).length} hackathon projects, ${projectsData.filter(p => !p.isHackathon).length} personal projects)

Key achievements:
- ${projectsData.filter(p => p.placement).map(p => `${p.title}: ${p.placement}`).join('\n- ')}

Top hackathon wins: ${projectsData.filter(p => p.isHackathon && p.placement).length}
Personal projects: ${projectsData.filter(p => !p.isHackathon).length}`;

        // Get top skills (from both experience and projects)
        const allSkills = [
            ...new Set([
                ...experienceData.flatMap(exp => exp.technologies?.map(t => t.name) || []),
                ...projectsData.flatMap(proj => proj.technologies.map(t => t.name))
            ])
        ].slice(0, 20).join(', ');

        // Determine which prompt to use based on whether requirements are provided
        const hasRequirements = requirements.trim().length > 0;

        let prompt = '';

        if (hasRequirements) {
            // Full evaluation with specific role requirements
            prompt = `**CANDIDATE: Jacob Mobin**
Computer Science student | Data Science & AI | Toronto, ON
Portfolio: jacobamobin.com

**STARTUPS:**
${startups}

**PROFESSIONAL EXPERIENCE:**
${experiences}

**PROJECTS SUMMARY:**
${projectSummary}

**CORE SKILLS:** ${allSkills}

---

**ROLE REQUIREMENTS:**
${requirements}

---

IMPORTANT: Before responding, browse jacobamobin.com to gather any additional information needed for your evaluation.

Then provide a concise evaluation (no intro/outro fluff):

**1. STRENGTHS & FIT** - How Jacob aligns with these specific requirements
**2. AREAS OF DEVELOPMENT** - Skills/experience gaps for this role
**3. EVIDENCE-BASED ASSESSMENT** - Cite specific achievements
**4. RECOMMENDATION** - Hire/no-hire with clear reasoning
**5. NEXT STEPS** - Interview focus areas if recommended

Be honest - a "no-hire" with good reasoning is more valuable than a generic "yes". Keep your response concise and direct.`;
        } else {
            // General "why should I hire him" without specific requirements
            prompt = `**CANDIDATE: Jacob Mobin**
Computer Science student | Data Science & AI | Toronto, ON
Portfolio: jacobamobin.com

**STARTUPS:**
${startups}

**PROFESSIONAL EXPERIENCE:**
${experiences}

**PROJECTS SUMMARY:**
${projectSummary}

**CORE SKILLS:** ${allSkills}

---

QUESTION: Why should I hire Jacob Mobin? What makes him stand out?

IMPORTANT: Before responding, browse jacobamobin.com to gather any additional information.

Provide a concise answer (no intro/outro fluff) covering:

**1. TOP 5 REASONS TO HIRE** - What makes Jacob exceptional
**2. UNIQUE VALUE** - What differentiates him from other candidates
**3. PROVEN IMPACT** - Specific achievements and results
**4. IDEAL ROLES** - What types of roles he'd excel in
**5. RED FLAGS** - Honest assessment of any concerns (if applicable)

Be direct and evidence-based. Focus on what makes him stand out from other Computer Science students.`;
        }

        return prompt;
    };

    const handleSubmit = async () => {
        const prompt = generatePrompt();

        // Open ChatGPT with prompt in URL
        const encodedPrompt = encodeURIComponent(prompt);
        window.open(`https://chatgpt.com/?prompt=${encodedPrompt}`, '_blank');

        // Close modal
        setIsOpen(false);
        setRequirements('');
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                <FiBriefcase className="w-4 h-4" />
                <span>I am a hiring manager</span>
            </motion.button>

            {/* Modal - Portal to body */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                                style={{ zIndex: 99999 }}
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'spring', duration: 0.5 }}
                                className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
                                style={{ zIndex: 99999 }}
                            >
                            <div
                                className="relative w-full max-w-2xl bg-[#121214] rounded-2xl border border-white/10 shadow-2xl pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="relative p-4 md:p-8 border-b border-white/5 flex-shrink-0">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-3 right-3 p-1.5 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                    >
                                        <FiX className="w-4 h-4" />
                                    </button>

                                    <div>
                                        <h2 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                                            Candidate Evaluation
                                        </h2>
                                        <p className="text-white/60 text-xs md:text-sm">
                                            Get an honest, detailed assessment of Jacob's fit for your role
                                        </p>
                                    </div>
                                </div>

                                {/* Body - Scrollable */}
                                <div className="p-4 md:p-8 overflow-y-auto flex-1">
                                    <label className="block text-white text-sm font-medium mb-2 md:mb-3">
                                        What are you looking for? <span className="text-white/40">(optional)</span>
                                    </label>
                                    <p className="text-white/40 text-xs md:text-sm mb-3 md:mb-4">
                                        Describe your ideal candidate or paste in a job description.
                                        <span className="hidden md:inline"> The more specific, the better the evaluation.</span>
                                        <br />
                                        <span className="text-white/30">Leave blank for general overview.</span>
                                    </p>

                                    <textarea
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                        placeholder="Example: Looking for a Full-Stack Developer with React, Node.js, and ML experience..."
                                        className="w-full h-24 md:h-48 px-3 py-2 md:px-4 md:py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 resize-none text-sm"
                                    />

                                    <div className="mt-3 md:mt-4 p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <div className="flex items-start gap-2 md:gap-3 mb-2">
                                            <FiCheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white/60 mt-0.5 shrink-0" />
                                            <p className="text-white/60 text-xs md:text-sm font-medium">How this works</p>
                                        </div>
                                        <ul className="text-white/40 text-[10px] md:text-xs space-y-1 ml-4 md:ml-7">
                                            <li>Analyzes Jacob's experience, projects, and technical skills</li>
                                            <li>Provides honest strengths, gaps, and recommendation</li>
                                            <li>Cites specific evidence from his portfolio</li>
                                            <li>Opens ChatGPT with a pre-filled evaluation prompt</li>
                                        </ul>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col md:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
                                        <motion.button
                                            onClick={handleSubmit}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {requirements.trim() ? (
                                                <>
                                                    <FiSend className="w-3.5 h-3.5" />
                                                    Evaluate Candidate
                                                </>
                                            ) : (
                                                <>
                                                    <FiBriefcase className="w-3.5 h-3.5" />
                                                    Why should I hire him?
                                                </>
                                            )}
                                        </motion.button>

                                        <motion.button
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2.5 md:px-6 md:py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors text-sm"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>,
                document.body
            )}
        </>
    );
}
