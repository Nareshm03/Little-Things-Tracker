import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';
import polaroid1 from '@assets/generated_images/polaroid-1.jpg';

export default function ChapterOne({ onNext, onPrev }: ChapterProps) {
  const [secretRevealed, setSecretRevealed] = useState(false);

  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  };

  return (
    <motion.div 
      className="absolute inset-0 bg-cream w-full h-full overflow-hidden paper-texture"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
    >
      {/* Morning lighting effect */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-warm-white/40 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto h-full p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left side: Text & Story */}
        <div className="flex-1 space-y-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="font-display text-5xl md:text-7xl text-coffee mb-4">Language of Care</h2>
            <p className="font-sans text-sm tracking-widest uppercase text-brown/60">Chapter One</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-quote text-lg md:text-xl text-charcoal leading-relaxed max-w-sm"
          >
            "It wasn't always grand gestures. It was the little texts, the shared playlists, the way you remembered things I casually mentioned weeks ago."
          </motion.div>

          {/* Chat bubbles */}
          <div className="space-y-3 pt-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-border/40 inline-block max-w-[75%]"
            >
              <p className="font-sans text-sm text-charcoal">Did you reach safely? 🥺</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="bg-blue-50 px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-sm border border-blue-100/40 inline-block max-w-[75%] ml-auto block"
            >
              <p className="font-sans text-sm text-charcoal">Just got in. Thinking of you ❤️</p>
            </motion.div>
          </div>
        </div>

        {/* Right side: Visuals (Coffee, Polaroid, Sticky notes) */}
        <div className="flex-1 relative w-full h-[50vh] md:h-[80vh]">
          
          {/* Coffee cup illustration (CSS art) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute top-10 right-10 md:top-20 md:right-20 cursor-pointer group"
            onClick={() => setSecretRevealed(true)}
          >
            {/* Steam */}
            <div className="absolute -top-12 left-6 w-1 h-8 bg-white/40 blur-[2px] rounded-full animate-steam" />
            <div className="absolute -top-16 left-10 w-1.5 h-10 bg-white/40 blur-[3px] rounded-full animate-steam" style={{ animationDelay: '0.5s' }} />
            
            {/* Cup */}
            <div className="relative w-24 h-20 bg-[#F0F0F0] rounded-b-3xl rounded-t-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="absolute top-0 w-full h-4 bg-[#E0E0E0] rounded-[50%]" />
              {/* Coffee inside */}
              <div className="absolute top-1 left-1 right-1 h-3 bg-[#4A3219] rounded-[50%]" />
            </div>
            {/* Handle */}
            <div className="absolute top-3 -right-4 w-6 h-10 border-4 border-[#F0F0F0] rounded-r-2xl z-[-1]" />
            
            {/* Secret note reveal */}
            <AnimatePresence>
              {secretRevealed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, rotate: -10 }}
                  animate={{ opacity: 1, y: -40, rotate: 5 }}
                  className="absolute -top-10 -right-10 bg-yellow-100 px-3 py-2 shadow-md"
                >
                  <p className="font-handwriting text-brown">I love how you drink your tea</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Polaroid */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ delay: 1.2, duration: 1 }}
            whileHover={{ scale: 1.05, rotate: 5, zIndex: 20 }}
            className="absolute top-[30%] left-0 md:left-10 bg-white p-3 pb-12 rounded-sm polaroid-shadow cursor-pointer transition-transform duration-300"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 washi-tape rotate-[2deg]" />
            <div className="w-[200px] h-[200px] bg-gray-200 overflow-hidden">
              <img 
                src={polaroid1} 
                alt="Chai tea" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-[#D4C4B7] flex items-center justify-center font-handwriting text-brown/50">waiting for film to develop...</div>';
                }}
              />
            </div>
            <p className="font-handwriting text-xl text-center mt-4 text-navy">our usual spot</p>
          </motion.div>

          {/* Sticky note */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-[20%] right-0 md:right-10 bg-[#FEF08A] w-48 h-48 p-4 shadow-md flex flex-col justify-center transform-origin-top-left"
          >
            <p className="font-letter text-2xl text-charcoal/90 leading-tight">
              You make even the mundane days feel like an adventure.
            </p>
            <p className="font-letter text-right text-xl mt-4">- M.</p>
          </motion.div>

        </div>
      </div>
      
    </motion.div>
  );
}
