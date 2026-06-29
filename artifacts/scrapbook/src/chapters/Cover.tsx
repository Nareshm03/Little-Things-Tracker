import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterProps } from '../App';
import pressedFlower from '@assets/generated_images/pressed-flower.png';

export default function Cover({ onNext }: ChapterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Give the animation time to play before moving to next component
    setTimeout(() => {
      onNext();
    }, 3500);
  };

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-cream w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Sunlight beam effect */}
      <motion.div 
        className="absolute top-0 left-0 w-[200%] h-[200%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(232, 184, 109, 0.15) 0%, transparent 60%)',
        }}
        animate={{
          x: ["-5%", "0%", "-5%"],
          y: ["-5%", "0%", "-5%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Dust Particles */}
      {[...Array(28)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-golden/20 pointer-events-none blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* The Book */}
      <motion.div 
        className="relative cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Open the scrapbook"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        animate={isOpening ? {
          scale: 1.2,
          y: -50,
          rotateX: 10,
        } : {
          scale: 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: isOpening ? 3 : 0.8, ease: "easeInOut" }}
      >
        {/* Book shadow */}
        <motion.div 
          className="absolute -bottom-8 left-10 right-10 h-10 bg-black/10 blur-xl rounded-[100%]"
          animate={{
            opacity: isOpening ? 0 : (isHovered ? 0.3 : 0.15),
            scale: isOpening ? 1.5 : (isHovered ? 1.05 : 1)
          }}
          transition={{ duration: isOpening ? 3 : 0.8, ease: "easeInOut" }}
        />

        {/* Book Cover */}
        <div className="relative w-[320px] md:w-[480px] h-[450px] md:h-[650px] bg-coffee rounded-r-3xl rounded-l-md shadow-2xl overflow-hidden border-l-8 border-[#523A28] paper-texture">
          
          {/* Leather texture overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.015\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

          {/* Leather sheen highlight — slow drift */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              background: 'linear-gradient(130deg, rgba(255,255,255,0.09) 0%, transparent 38%, rgba(255,255,255,0.05) 68%, transparent 100%)',
            }}
            animate={{ x: ['-6%', '6%', '-6%'], y: ['-4%', '4%', '-4%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          {/* Secondary warm highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 40% at 70% 25%, rgba(232,184,109,0.08) 0%, transparent 70%)',
            }}
            animate={{ x: ['0%', '8%', '0%'], y: ['0%', '6%', '0%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            aria-hidden="true"
          />

          {/* Golden foil border — subtle breathing pulse */}
          <motion.div
            className="absolute inset-4 border border-golden/40 rounded-r-2xl pointer-events-none"
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-6 border border-golden/20 rounded-r-xl pointer-events-none"
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Cover content */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="font-display text-4xl md:text-6xl text-warm-white font-medium tracking-wide mb-6 leading-tight drop-shadow-sm"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              The Little<br/>Things We<br/>Never Want<br/>To Forget
            </motion.h1>

            {/* Pressed flower graphic */}
            <motion.div 
              className="relative my-8"
              animate={{ rotate: isHovered ? 2 : 0 }}
              transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
            >
              <img 
                src={pressedFlower} 
                alt="Pressed flower decoration" 
                className="w-24 h-24 object-contain opacity-80"
                onError={(e) => {
                  // Fallback if image not generated yet
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 14 4-4'/%3E%3Cpath d='M3.34 19a10 10 0 1 1 17.32 0'/%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-warm-white/10 to-transparent mix-blend-overlay" />
            </motion.div>

            {/* A small hand-written note on tape */}
            <motion.div 
              className="absolute bottom-12 right-12 bg-warm-white px-4 py-2 rotate-[-4deg] shadow-md origin-bottom-right"
              animate={{ 
                y: isHovered ? -4 : 0,
                rotate: isHovered ? -2 : -4 
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 washi-tape rotate-[3deg]" />
              <span className="font-handwriting text-2xl text-navy">for Meghana</span>
            </motion.div>
          </motion.div>

          {/* Book opening page animation layer */}
          <motion.div 
            className="absolute top-0 right-0 w-full h-full bg-cream rounded-r-3xl shadow-[-10px_0_20px_rgba(0,0,0,0.2)] origin-left"
            initial={{ rotateY: 0, opacity: 0 }}
            animate={isOpening ? { 
              rotateY: -160, 
              opacity: [0, 1, 1],
              zIndex: 50
            } : { 
              rotateY: 0, 
              opacity: 0 
            }}
            transition={{ duration: 3, ease: [0.645, 0.045, 0.355, 1] }}
          />

          {/* Ribbon bookmark sticking out bottom */}
          <motion.div 
            className="absolute -bottom-16 left-24 w-8 h-24 bg-golden shadow-md"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
            animate={{
              rotate: [0, 2, 0, -1, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
