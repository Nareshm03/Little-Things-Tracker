import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';

export default function BeforeWeBegin({ onNext }: ChapterProps) {
  const [linesRevealed, setLinesRevealed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lines = [
    "Before we begin...",
    "Take a deep breath.",
    "Forget the notifications. Forget the rush.",
    "This space is just for us.",
    "A place where little moments stayed forever."
  ];

  // "Take a deep breath" is index 1 — hold an extra second after it appears
  const BREATH_INDEX = 1;

  React.useEffect(() => {
    if (linesRevealed < lines.length) {
      // Extra 1 000 ms pause right after "Take a deep breath" is revealed
      const delay = linesRevealed === BREATH_INDEX ? 2800 : 1800;
      const timer = setTimeout(() => {
        setLinesRevealed(prev => prev + 1);
      }, delay);
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
      <div className="max-w-xl px-8 flex flex-col items-center">

        {/* Pressed flower — fades in first, pauses during breath moment */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.6, rotate: 0 }}
          transition={{ duration: 3 }}
          className="mb-12"
        >
          {/* Inline pressed flower SVG — same style as cover */}
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" aria-hidden="true">
            <defs>
              <radialGradient id="bwb-ga" cx="50%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#EDD08A"/>
                <stop offset="55%" stopColor="#C98D30"/>
                <stop offset="100%" stopColor="#7A5018" stopOpacity="0.85"/>
              </radialGradient>
              <radialGradient id="bwb-gb" cx="50%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#E0BC6A"/>
                <stop offset="55%" stopColor="#B87820"/>
                <stop offset="100%" stopColor="#6B4010" stopOpacity="0.8"/>
              </radialGradient>
              <radialGradient id="bwb-gc" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#4A2808"/>
                <stop offset="100%" stopColor="#1E0E02"/>
              </radialGradient>
            </defs>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
              <ellipse key={`op-${i}`} cx="60" cy="42" rx="8.5" ry="20"
                fill={i % 2 === 0 ? 'url(#bwb-ga)' : 'url(#bwb-gb)'}
                transform={`rotate(${deg} 60 60)`} opacity={0.82 + (i % 3) * 0.06}/>
            ))}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
              <line key={`vl-${i}`} x1="60" y1="57" x2="60" y2="37"
                stroke="#7A4A10" strokeWidth="0.5" opacity="0.3"
                transform={`rotate(${deg} 60 60)`}/>
            ))}
            {[15,45,75,105,135,165,195,225,255,285,315,345].map((deg, i) => (
              <ellipse key={`ip-${i}`} cx="60" cy="46" rx="6.5" ry="15"
                fill={i % 2 === 0 ? 'url(#bwb-gb)' : 'url(#bwb-ga)'}
                transform={`rotate(${deg} 60 60)`} opacity={0.7 + (i % 3) * 0.06}/>
            ))}
            <circle cx="60" cy="60" r="13.5" fill="url(#bwb-gc)" opacity="0.96"/>
            {[[60,52],[56,54],[64,54],[58,57],[62,57],[55,59],[65,59],[57,62],[63,62],[60,65]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="1.1" fill="#D4A040" opacity="0.55"/>
            ))}
          </svg>
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
                  className={`font-quote text-2xl text-charcoal/80 leading-[2.0] ${index === 0 ? 'text-4xl mb-6 font-display italic-none' : ''}`}
                >
                  {line}
                </motion.p>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* "I'm ready" note — appears after a longer pause once all lines are shown */}
        <AnimatePresence>
          {linesRevealed === lines.length && !isTransitioning && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              whileHover={{ y: -2 }}
              onClick={handleStart}
              className="mt-16 group relative"
            >
              {/* Tape strip — slightly wider so it peeks clearly above the note */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-10 h-5 washi-tape rotate-[1.5deg] z-10" />
              {/* Note card — 2° tilt, very soft shadow */}
              <div
                className="px-8 py-3 bg-white border border-border/40 transition-all duration-300 group-hover:rotate-0"
                style={{
                  rotate: '2deg',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.07), 0 0.5px 2px rgba(0,0,0,0.05)',
                }}
              >
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
