import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';
import pressedFlower from '@assets/generated_images/pressed-flower.png';

export default function BeforeWeBegin({ onNext }: ChapterProps) {
  const [linesRevealed, setLinesRevealed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lines = [
    "Before we begin...",
    "Take a deep breath.",
    "Forget the notifications. Forget the rush.",
    "This space is just for us.",
    "A museum of ordinary moments that meant everything."
  ];

  // Auto-reveal lines
  React.useEffect(() => {
    if (linesRevealed < lines.length) {
      const timer = setTimeout(() => {
        setLinesRevealed(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [linesRevealed]);

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-cream w-full h-full paper-texture"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="max-w-2xl px-8 flex flex-col items-center">
        
        {/* Pressed flower fading in first */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.6, rotate: 0 }}
          transition={{ duration: 3 }}
          className="mb-12"
        >
          <img 
            src={pressedFlower} 
            alt="" 
            className="w-16 h-16 object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </motion.div>

        <div className="flex flex-col items-center space-y-6 text-center min-h-[300px]">
          <AnimatePresence>
            {lines.map((line, index) => (
              index < linesRevealed && (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className={`font-quote text-2xl text-charcoal/80 leading-relaxed ${index === 0 ? 'text-3xl mb-4 font-display italic-none' : ''}`}
                >
                  {line}
                </motion.p>
              )
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {linesRevealed === lines.length && !isTransitioning && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 1 }}
              whileHover={{ y: -2 }}
              onClick={handleStart}
              className="mt-16 group relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 washi-tape rotate-[-2deg] z-10" />
              <div className="px-8 py-3 bg-white shadow-sm border border-border/50 rotate-1 group-hover:rotate-0 group-hover:shadow-md transition-all duration-300">
                <span className="font-handwriting text-2xl text-brown">I'm ready</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

      </div>

      {/* Transition ink line reveal */}
      {isTransitioning && (
        <motion.div 
          className="absolute inset-0 bg-white z-50 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        />
      )}
    </motion.div>
  );
}
