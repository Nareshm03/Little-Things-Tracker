import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterProps } from '../App';

export default function Dedication({ onNext }: ChapterProps) {
  const [isWritten, setIsWritten] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWritten(true);
    }, 4000); // Trigger signature after main text
    return () => clearTimeout(timer);
  }, []);

  const signaturePath = "M 10 50 C 20 20, 40 20, 50 50 C 60 80, 80 80, 90 50 C 100 20, 120 20, 130 50"; // Simplified signature-like path

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-cream w-full h-full paper-texture"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      onClick={isWritten ? onNext : undefined}
    >
      <div className="max-w-2xl px-8 md:px-16 text-center cursor-pointer">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="font-quote text-2xl md:text-4xl text-charcoal leading-relaxed space-y-6"
        >
          <p>
            "For Meghana — every little thing we've shared, pressed between these pages, kept forever."
          </p>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <svg className="w-48 h-24" viewBox="0 0 150 100" fill="none">
            <motion.path
              d={signaturePath}
              stroke="var(--color-navy)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isWritten ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isWritten ? 0.4 : 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 text-sm font-sans tracking-widest uppercase text-brown/60"
        >
          Click anywhere to turn the page
        </motion.div>
      </div>
    </motion.div>
  );
}
