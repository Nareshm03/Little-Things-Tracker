import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';

import polaroid2 from '@assets/generated_images/polaroid-2.jpg';
import polaroid3 from '@assets/generated_images/polaroid-3.jpg';
import polaroid4 from '@assets/generated_images/polaroid-4.jpg';

const photos = [
  { id: 1, src: polaroid2, caption: "Quiet reading afternoons", rotate: -4, x: -20, y: 0 },
  { id: 2, src: polaroid3, caption: "Peaceful steps", rotate: 2, x: 20, y: 30 },
  { id: 3, src: polaroid4, caption: "Wandering around", rotate: -2, x: 0, y: 60 },
];

export default function ChapterFour({ onNext }: ChapterProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const developVariants = {
    initial: { filter: "brightness(2) contrast(0.5) sepia(1)", opacity: 0 },
    animate: { filter: "brightness(1) contrast(1) sepia(0.2)", opacity: 1 },
  };

  return (
    <motion.div 
      className="absolute inset-0 bg-[#EFEBE4] w-full h-full overflow-hidden paper-texture"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute top-10 w-full text-center z-10">
        <h2 className="font-display text-4xl text-coffee">Little Moments We Captured</h2>
        <p className="font-sans text-sm tracking-widest uppercase text-brown/60 mt-2">Chapter Four</p>
      </div>

      <div className="relative w-full h-full flex items-center justify-center mt-10">
        
        {/* Scattered Polaroids */}
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${photo.caption}`}
            className={`absolute bg-white p-3 pb-12 shadow-md cursor-pointer transition-shadow hover:polaroid-shadow ${selectedId === photo.id ? 'z-50' : 'z-10'}`}
            initial={{ 
              x: photo.x + (Math.random() * 50 - 25), 
              y: photo.y + 100, 
              rotate: photo.rotate * 2,
              opacity: 0 
            }}
            animate={{ 
              x: selectedId === photo.id ? 0 : photo.x, 
              y: selectedId === photo.id ? -50 : photo.y, 
              rotate: selectedId === photo.id ? 0 : photo.rotate,
              opacity: 1,
              scale: selectedId === photo.id ? 1.5 : 1
            }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 100,
              delay: selectedId === null ? i * 0.4 : 0 
            }}
            onClick={() => setSelectedId(selectedId === photo.id ? null : photo.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(selectedId === photo.id ? null : photo.id); } }}
            whileHover={selectedId === null ? { scale: 1.05, zIndex: 30 } : {}}
          >
            {/* Tape for unselected */}
            {selectedId !== photo.id && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 washi-tape rotate-[3deg]" />
            )}

            <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] bg-gray-200 overflow-hidden relative">
              <motion.img 
                src={photo.src} 
                alt="" 
                className="w-full h-full object-cover"
                variants={developVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 3, delay: i * 0.5 }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              {/* Flash effect on load */}
              <motion.div 
                className="absolute inset-0 bg-white pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: i * 0.5 + 0.2, ease: "easeOut" }}
              />
            </div>
            <motion.p 
              className="font-handwriting text-xl text-center mt-4 text-navy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.5 + 2 }}
            >
              {photo.caption}
            </motion.p>
          </motion.div>
        ))}

        {/* Lightbox background when a photo is selected */}
        <AnimatePresence>
          {selectedId !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-cream/80 backdrop-blur-sm z-40"
              onClick={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
