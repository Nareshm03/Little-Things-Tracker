import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';
import { Heart } from 'lucide-react';

export default function Ending({ onNext }: ChapterProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [bookClosed, setBookClosed] = useState(false);

  useEffect(() => {
    if (bookClosed) {
      // Final state reached
    }
  }, [bookClosed]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-cream w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <AnimatePresence>
        {!bookClosed ? (
          <motion.div 
            className="w-full max-w-2xl px-8 flex flex-col items-center z-10"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
          >
            <h2 className="font-display text-4xl text-coffee mb-12">And for all the pages yet to be written...</h2>
            
            {/* The Envelope */}
            <div 
              className="relative w-64 h-40 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Open the envelope"
              onClick={() => setEnvelopeOpen(true)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEnvelopeOpen(true); } }}
            >
              {/* Back of envelope */}
              <div className="absolute inset-0 bg-[#E5D5C5] rounded-sm shadow-md" />
              
              {/* Letter coming out */}
              <motion.div 
                className="absolute left-4 right-4 bg-white p-4 shadow-sm font-handwriting text-xl text-navy text-center"
                initial={{ top: 10, bottom: 10 }}
                animate={envelopeOpen ? { top: -80, bottom: 60 } : { top: 10, bottom: 10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ zIndex: 10 }}
              >
                I love you, Meghana.
              </motion.div>

              {/* Envelope Flaps */}
              <div className="absolute inset-0 overflow-hidden rounded-sm" style={{ zIndex: 20, pointerEvents: 'none' }}>
                {/* Bottom flap */}
                <div className="absolute bottom-0 w-full h-full bg-[#F0E6D8]" style={{ clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)' }} />
                {/* Side flaps */}
                <div className="absolute inset-0 bg-[#EFE8DC]" style={{ clipPath: 'polygon(0 0, 45% 50%, 0 100%)' }} />
                <div className="absolute inset-0 bg-[#EFE8DC]" style={{ clipPath: 'polygon(100% 0, 55% 50%, 100% 100%)' }} />
                
                {/* Top flap (animates open) */}
                <motion.div 
                  className="absolute top-0 w-full h-full bg-[#DCCBB6] origin-top"
                  initial={{ rotateX: 0 }}
                  animate={envelopeOpen ? { rotateX: 180, opacity: 0 } : { rotateX: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 60%)' }}
                />
              </div>

              {/* Wax Seal */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-800 z-30"
                animate={envelopeOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              >
                <Heart fill="currentColor" size={24} />
              </motion.div>
            </div>

            {envelopeOpen && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setBookClosed(true)}
                className="mt-24 text-sm font-sans tracking-widest uppercase text-brown/60 hover:text-coffee transition-colors"
              >
                Close Book
              </motion.button>
            )}

          </motion.div>
        ) : (
          <motion.div 
            className="absolute inset-0 bg-navy flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <motion.p 
              className="font-display text-2xl text-moonlight/60 italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 2 }}
            >
              To be continued...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Closing Animation Overlays */}
      <AnimatePresence>
        {bookClosed && (
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-coffee shadow-[10px_0_20px_rgba(0,0,0,0.5)] origin-right z-40"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 2.5, ease: [0.645, 0.045, 0.355, 1] }}
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
}
