import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiBriefcase, FiCheckCircle } from 'react-icons/fi';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';

export default function HiringManagerButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [requirements, setRequirements] = useState('');

    const generatePrompt = () => {
        // Compile all Jacob's info
        const experiences = experienceData.map(exp =>
            `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n${exp.description?.join('\n') || ''}`
        ).join('\n\n');

        const projects = projectsData.slice(0, 8).map(proj =>
            `${proj.title} - ${proj.type}\n${proj.description}\nTechnologies: ${proj.technologies.map(t => t.name).join(', ')}\n${proj.placement ? `Achievement: ${proj.placement}` : ''}`
        ).join('\n\n');

        const allSkills = [...new Set([
            ...experienceData.flatMap(exp => exp.technologies?.map(t => t.name) || []),
            ...projectsData.flatMap(proj => proj.technologies.map(t => t.name))
        ])].join(', ');

        const prompt = `**CANDIDATE: Jacob Mobin**

Computer Science student specializing in Data Science and AI
Location: Toronto, ON, Canada
Portfolio: jacobamobin.com

**PROFESSIONAL EXPERIENCE:**
${experiences}

**KEY PROJECTS:**
${projects}

**TECHNICAL SKILLS:**
${allSkills}

---

**ROLE REQUIREMENTS:**
${requirements || 'General evaluation - what roles would Jacob excel in?'}

---

Provide a comprehensive, honest evaluation:

**1. STRENGTHS & FIT**
- Where Jacob's experience aligns with these requirements
- Standout projects or achievements relevant to this role
- Unique value he brings

**2. AREAS OF DEVELOPMENT**
- Skills or experience gaps for this role
- What Jacob needs to learn or develop
- Be honest - this helps both parties

**3. EVIDENCE-BASED ASSESSMENT**
- Cite specific projects, achievements, or experiences
- Reference concrete technologies and skills demonstrated

**4. RECOMMENDATION**
- Clear hire/no-hire with reasoning
- If hire: What role/level is best fit?
- If no-hire: What roles should Jacob pursue instead?

**5. NEXT STEPS** (if hire recommended)
- Interview focus areas
- Questions to validate fit
- Projects to discuss in depth

Be analytical and honest. A "no-hire" with good reasoning is more valuable than a generic "yes."`;

        return prompt;
    };

    const handleSubmit = () => {
        const prompt = generatePrompt();
        const encodedPrompt = encodeURIComponent(prompt);

        // Open ChatGPT with pre-filled prompt
        window.open(`https://chat.openai.com/?q=${encodedPrompt}`, '_blank');

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

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div
                                className="relative w-full max-w-2xl bg-[#121214] rounded-2xl border border-white/10 shadow-2xl pointer-events-auto overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="relative p-8 border-b border-white/5">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>

                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">
                                            Candidate Evaluation
                                        </h2>
                                        <p className="text-white/60 text-sm">
                                            Get an honest, detailed assessment of Jacob's fit for your role
                                        </p>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-8">
                                    <label className="block text-white font-medium mb-3">
                                        What are you looking for?
                                    </label>
                                    <p className="text-white/40 text-sm mb-4">
                                        Describe your ideal candidate or paste in a job description. The more specific, the better the evaluation.
                                    </p>

                                    <textarea
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                        placeholder="Example: Looking for a Full-Stack Developer with experience in React, Node.js, and ML. Must have worked on production systems at scale."
                                        className="w-full h-48 px-4 py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 resize-none"
                                    />

                                    <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <div className="flex items-start gap-3 mb-2">
                                            <FiCheckCircle className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
                                            <p className="text-white/60 text-sm font-medium">How this works</p>
                                        </div>
                                        <ul className="text-white/40 text-xs space-y-1 ml-7">
                                            <li>Analyzes Jacob's experience, projects, and technical skills</li>
                                            <li>Provides honest strengths, gaps, and recommendation</li>
                                            <li>Cites specific evidence from his portfolio</li>
                                            <li>Opens ChatGPT with a pre-filled evaluation prompt</li>
                                        </ul>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <motion.button
                                            onClick={handleSubmit}
                                            disabled={!requirements.trim()}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all"
                                            whileHover={requirements.trim() ? { scale: 1.02 } : {}}
                                            whileTap={requirements.trim() ? { scale: 0.98 } : {}}
                                        >
                                            <FiSend className="w-4 h-4" />
                                            Evaluate Candidate
                                        </motion.button>

                                        <motion.button
                                            onClick={() => setIsOpen(false)}
                                            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
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
            </AnimatePresence>
        </>
    );
}
