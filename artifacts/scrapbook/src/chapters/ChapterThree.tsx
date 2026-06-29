import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';
import stampImg from '@assets/generated_images/stamp.png';

export default function ChapterThree({ onNext }: ChapterProps) {
  const [laughs, setLaughs] = useState(0);

  const slideUpVariants = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 }
  };

  const popIn = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div 
      className="absolute inset-0 bg-warm-white w-full h-full overflow-y-auto overflow-x-hidden paper-texture pb-20"
      variants={slideUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="max-w-4xl mx-auto p-8 md:p-12">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-orange mb-4">The Way We Made Each Other Laugh</h2>
          <p className="font-quote text-2xl text-brown">"The best sound in the world."</p>
        </motion.div>

        {/* Comic Book Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Panel 1 */}
          <motion.div 
            className="bg-white border-2 border-dashed border-border/60 p-6 relative group"
            variants={popIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            whileHover={{ rotate: -1 }}
            onClick={() => setLaughs(l => l + 1)}
          >
            <div className="absolute -top-3 -left-3 bg-yellow-200 rounded-full w-12 h-12 flex items-center justify-center font-handwriting text-2xl rotate-[-10deg] shadow-sm">
              haha
            </div>
            <p className="font-sans text-charcoal italic mb-4">You: "I think I burnt the toast."</p>
            <p className="font-sans text-charcoal italic">Me: "It's not burnt, it's just aggressively toasted."</p>
            
            {/* Doodle stroke */}
            <svg className="absolute bottom-2 right-2 w-16 h-16 pointer-events-none" viewBox="0 0 100 100">
              <motion.path 
                d="M 20 80 Q 50 20 80 80" 
                fill="none" 
                stroke="#D4844A" 
                strokeWidth="4" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Panel 2 */}
          <motion.div 
            className="bg-[#Fdf8f5] border-2 border-border/40 p-6 relative md:mt-12 shadow-sm"
            variants={popIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => setLaughs(l => l + 1)}
          >
            <img src={stampImg} alt="" className="absolute top-2 right-2 w-12 h-12 opacity-50 rotate-[15deg]" />
            <p className="font-letter text-2xl text-navy leading-relaxed mt-4">
              I love how we can communicate across a crowded room with just one look. We both know exactly what the other is thinking, and it's usually hilarious.
            </p>
          </motion.div>

          {/* Panel 3: Full width */}
          <motion.div 
            className="md:col-span-2 bg-cream p-8 border-l-4 border-orange relative overflow-hidden"
            variants={popIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="font-display text-2xl text-coffee mb-4">The inside jokes no one else understands:</h3>
            <ul className="space-y-3 font-handwriting text-2xl text-charcoal/80 list-disc list-inside">
              <li>That one time at the metro...</li>
              <li>The "secret" coffee order</li>
              <li>Why we can't look at pigeons the same way</li>
            </ul>
          </motion.div>

        </div>

        {/* Hidden Interaction Counter */}
        <AnimatePresence>
          {laughs > 0 && (
            <motion.div 
              className="fixed bottom-10 right-10 bg-white px-4 py-2 rounded-full shadow-lg border border-orange/20 flex items-center gap-2"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={laughs} // forces re-render/animation on change
            >
              <span className="font-display text-orange">Laughs shared:</span>
              <span className="font-sans font-bold text-navy">{laughs}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
