import React from 'react';
import { motion } from 'framer-motion';

type NavigationBookmarksProps = {
  chapters: { id: string }[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

// We only show bookmarks for actual chapters, not cover/dedication/ending
const BOOKMARK_LABELS = [
  "Start", "To Meghana", "Before", "I. Care", "II. Places", "III. Laughs", 
  "IV. Moments", "V. Peace", "VI. Nights", "VII. Growth", "End"
];

export default function NavigationBookmarks({ chapters, currentIndex, onSelect }: NavigationBookmarksProps) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-4 pt-10">
      {chapters.map((chapter, index) => {
        // Skip first 3 and last one if we want a cleaner look, 
        // but for now let's just show minimal indicators for all.
        const isActive = index === currentIndex;
        const isDark = document.documentElement.classList.contains('dark');
        
        return (
          <motion.button
            key={chapter.id}
            onClick={() => onSelect(index)}
            className="relative group flex items-center justify-end w-32"
            whileHover={{ x: -4 }}
            animate={{ x: isActive ? -8 : 0 }}
          >
            {/* Label */}
            <span 
              className={`mr-3 text-xs font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'text-moonlight' : 'text-coffee'} ${isActive ? 'opacity-100 font-semibold' : ''}`}
            >
              {BOOKMARK_LABELS[index]}
            </span>
            
            {/* Ribbon */}
            <motion.div 
              className={`h-2 rounded-l-sm shadow-sm ${isActive ? 'w-10 bg-golden' : isDark ? 'w-4 bg-white/20' : 'w-4 bg-brown/20 group-hover:bg-brown/40'}`}
              layoutId={isActive ? undefined : `ribbon-${index}`}
              style={{
                transformOrigin: 'right center'
              }}
              animate={{
                rotate: isActive ? 0 : [0, 1, 0, -1, 0]
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 4 + index, ease: "easeInOut" }
              }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
