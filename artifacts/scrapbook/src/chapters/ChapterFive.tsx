import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterProps } from '../App';

export default function ChapterFive({ onNext }: ChapterProps) {
  const [rotated, setRotated] = useState<number | null>(null);

  const particles = Array.from({ length: 30 });

  return (
    <motion.div 
      className="absolute inset-0 bg-sandstone/20 w-full h-full overflow-hidden paper-texture"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(5px)" }}
      transition={{ duration: 2 }}
    >
      {/* Light Rays */}
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-white/30 to-transparent transform -skew-x-12 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-b from-white/20 to-transparent transform -skew-x-12 pointer-events-none mix-blend-overlay" />

      {/* Floating Particles (Pollen/Dust) */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-saffron/40 blur-[1px] pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center max-w-3xl mx-auto">
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <h2 className="font-display text-5xl md:text-7xl text-[#8C5E35] mb-8 font-light tracking-wide">Days That Felt Peaceful</h2>
          
          <p className="font-quote text-2xl md:text-3xl text-[#5C4028] leading-relaxed">
            "We didn't need to fill the silence. Just sitting there, hearing the faint temple bells in the distance, knowing you were right next to me... that was enough."
          </p>
        </motion.div>

        {/* Minimal interactive elements - Lotus shapes */}
        <div className="mt-20 flex gap-8">
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              className="w-12 h-12 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Reveal memory ${id}`}
              onClick={() => setRotated(id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRotated(id); } }}
              animate={{ rotate: rotated === id ? 180 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                <path 
                  d="M50 0 C60 40, 100 50, 50 100 C0 50, 40 40, 50 0 Z" 
                  fill={rotated === id ? "#FF8C00" : "transparent"} 
                  stroke="#8C5E35" 
                  strokeWidth="2"
                  className="transition-colors duration-1000"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Hidden Memory Text */}
        <motion.p
          className="mt-8 font-handwriting text-2xl text-[#8C5E35]"
          initial={{ opacity: 0 }}
          animate={{ opacity: rotated ? 1 : 0 }}
        >
          {rotated === 1 && "The scent of sandalwood..."}
          {rotated === 2 && "The way the light caught your hair..."}
          {rotated === 3 && "A quiet promise without words."}
        </motion.p>

      </div>
    </motion.div>
  );
}
