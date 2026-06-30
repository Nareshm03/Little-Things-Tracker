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
            animate={{ x: isActive ? -6 : 0 }}
          >
            {/* Label — only on hover of active */}
            <span
              className={`mr-2 text-[10px] font-handwriting italic transition-opacity duration-500 ${isDark ? 'text-moonlight/60' : 'text-coffee/50'} ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
            >
              {BOOKMARK_LABELS[index]}
            </span>

            {/* Ribbon — barely-there unless active */}
            <motion.div
              className={`h-[5px] rounded-l-sm ${
                isActive
                  ? 'w-8 bg-golden/55 shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : isDark
                    ? 'w-3 bg-white/8 group-hover:bg-white/14'
                    : 'w-3 bg-brown/10 group-hover:bg-brown/20'
              }`}
              style={{ transformOrigin: 'right center' }}
              animate={{ rotate: isActive ? 0 : [0, 0.6, 0, -0.6, 0] }}
              transition={{ rotate: { repeat: Infinity, duration: 5 + index, ease: 'easeInOut' } }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
