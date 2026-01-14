import { motion } from 'framer-motion';
import { FiAward, FiStar } from 'react-icons/fi';
import { GiTrophy, GiPodiumWinner, GiLaurelsTrophy } from 'react-icons/gi';
import { HiOutlineTrophy } from 'react-icons/hi2';
import achievementsData from '../data/achievements.json';

// Medal component with different colors and styles
const Medal = ({ achievement, index }: { achievement: any; index: number }) => {
    // Determine medal color and icon based on type
    const getMedalStyle = (type: string) => {
        switch (type) {
            case 'gold':
                return {
                    bgColor: 'bg-yellow-500/20',
                    borderColor: 'border-yellow-500/40',
                    textColor: 'text-yellow-400',
                    glowColor: 'hover:shadow-yellow-500/20',
                    Icon: GiTrophy
                };
            case 'bronze':
                return {
                    bgColor: 'bg-orange-700/20',
                    borderColor: 'border-orange-600/40',
                    textColor: 'text-orange-400',
                    glowColor: 'hover:shadow-orange-500/20',
                    Icon: GiPodiumWinner
                };
            case 'trophy':
                return {
                    bgColor: 'bg-purple-500/20',
                    borderColor: 'border-purple-500/40',
                    textColor: 'text-purple-400',
                    glowColor: 'hover:shadow-purple-500/20',
                    Icon: HiOutlineTrophy
                };
            case 'fourth':
                return {
                    bgColor: 'bg-blue-500/20',
                    borderColor: 'border-blue-500/40',
                    textColor: 'text-blue-400',
                    glowColor: 'hover:shadow-blue-500/20',
                    Icon: FiStar
                };
            case 'participant':
                return {
                    bgColor: 'bg-gray-500/20',
                    borderColor: 'border-gray-500/40',
                    textColor: 'text-gray-400',
                    glowColor: 'hover:shadow-gray-500/20',
                    Icon: GiLaurelsTrophy
                };
            default:
                return {
                    bgColor: 'bg-white/10',
                    borderColor: 'border-white/20',
                    textColor: 'text-white',
                    glowColor: 'hover:shadow-white/20',
                    Icon: FiAward
                };
        }
    };

    const style = getMedalStyle(achievement.type);
    const IconComponent = style.Icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group relative z-[100]"
        >
            {/* Medal Icon */}
            <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${style.bgColor} ${style.borderColor} border-2 flex items-center justify-center transition-all duration-300 ${style.glowColor} hover:scale-110 cursor-pointer shadow-lg ${style.textColor}`}
            >
                <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-[200]">
                <div className="bg-[#1a1a1d] border border-white/10 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                    <p className={`text-sm font-bold ${style.textColor} mb-0.5`}>
                        {achievement.project}
                    </p>
                    <p className="text-xs text-white/60 mb-1">{achievement.placement}</p>
                    <p className="text-xs text-white/40">{achievement.hackathon}</p>
                    {achievement.prize > 0 && (
                        <p className="text-xs text-emerald-400 mt-1 font-semibold">
                            ${achievement.prize.toLocaleString()}
                        </p>
                    )}
                </div>
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/10" />
            </div>
        </motion.div>
    );
};

export default function Awards() {
    return (
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            {achievementsData.map((achievement, index) => (
                <Medal key={achievement.id} achievement={achievement} index={index} />
            ))}
        </div>
    );
}
