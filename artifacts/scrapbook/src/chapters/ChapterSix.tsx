import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChapterProps } from '../App';

export default function ChapterSix({ onNext }: ChapterProps) {
  const [moonClicked, setMoonClicked] = useState(false);
  const stars = Array.from({ length: 50 });
  const rainDrops = Array.from({ length: 30 });

  const letterVariants: Variants = {
    hidden: { opacity: 0, rotateX: 90, y: 50 },
    visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    // The App component adds the .dark class for this chapter
    <motion.div 
      className="absolute inset-0 bg-background w-full h-full overflow-hidden text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {/* Texture for dark mode */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Stars Background */}
      {stars.map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`, // Mostly in top half
            animationDelay: `${Math.random() * 4}s`,
            opacity: Math.random() * 0.8 + 0.2
          }}
        />
      ))}

      {/* Rain Particles (subtle) */}
      {moonClicked && rainDrops.map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-[1px] h-4 bg-blue-200/20"
          style={{ left: `${Math.random() * 100}%`, top: -20 }}
          animate={{
            y: ['0vh', '100vh'],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Interactive Moon */}
      <motion.div 
        className="absolute top-16 right-16 md:top-24 md:right-32 w-20 h-20 rounded-full bg-moonlight cursor-pointer shadow-[0_0_40px_rgba(240,238,228,0.3)] z-10"
        whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(240,238,228,0.5)" }}
        onClick={() => setMoonClicked(true)}
      >
        {/* Craters */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-black/10 rounded-full blur-[1px]" />
        <div className="absolute bottom-6 right-6 w-6 h-6 bg-black/10 rounded-full blur-[1px]" />
      </motion.div>

      <div className="relative z-20 max-w-4xl mx-auto h-full p-8 md:p-16 flex flex-col justify-center">
        
        <motion.h2 
          className="font-display text-5xl md:text-6xl text-moonlight mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          The Nights We Never Forgot
        </motion.h2>

        <div className="space-y-8">
          {/* Folded Letter 1 */}
          <motion.div 
            className="bg-[#2A3441] p-6 md:p-8 rounded-sm border border-white/10 shadow-lg max-w-xl"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="font-sans text-moonlight/80 leading-relaxed font-light">
              Do you remember that late night call? The one where we talked until 4 AM. We were so tired but neither of us wanted to hang up. It felt like the rest of the world was asleep, and it was just us.
            </p>
          </motion.div>

          {/* Folded Letter 2 */}
          <motion.div 
            className="bg-[#2A3441] p-6 md:p-8 rounded-sm border border-white/10 shadow-lg max-w-xl ml-auto md:ml-32"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <p className="font-sans text-moonlight/80 leading-relaxed font-light">
              Or the night we walked back in the slight drizzle. I remember how the streetlights reflected in the puddles, and how safe I felt just being next to you.
            </p>
          </motion.div>
        </div>

        {/* Secret Moon Message */}
        <AnimatePresence>
          {moonClicked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full"
            >
              <p className="font-handwriting text-3xl text-hope drop-shadow-md">
                You are my favorite kind of night.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
