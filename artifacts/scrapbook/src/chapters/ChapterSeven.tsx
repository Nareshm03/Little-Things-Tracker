import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterProps } from '../App';
import { CheckCircle2 } from 'lucide-react';

const milestones = [
  { id: 1, date: "First meeting", desc: "Awkward but perfect.", done: true },
  { id: 2, date: "First inside joke", desc: "The start of our own language.", done: true },
  { id: 3, date: "Realizing it's real", desc: "That moment of quiet certainty.", done: true },
  { id: 4, date: "Future plans", desc: "Places to go, things to build.", done: false },
];

export default function ChapterSeven({ onNext }: ChapterProps) {
  const [revealedNote, setRevealedNote] = useState<number | null>(null);

  return (
    <motion.div 
      className="absolute inset-0 bg-cream w-full h-full overflow-y-auto overflow-x-hidden paper-texture pb-20"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      <div className="max-w-3xl mx-auto p-8 md:p-16">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl text-navy mb-4">Growing Together</h2>
          <p className="font-sans tracking-widest text-brown/60 uppercase text-sm">Chapter Seven</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-brown/20 -translate-x-1/2 rounded-full"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "linear" }}
          />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={m.id} className={`relative flex items-center md:justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center Node */}
                <motion.div 
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cream border-4 border-golden z-10 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                >
                  {m.done && <div className="w-2 h-2 bg-golden rounded-full" />}
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  className="ml-16 md:ml-0 w-full md:w-[45%] bg-white p-6 shadow-sm border border-border/50 relative cursor-pointer group"
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.3 }}
                  onClick={() => setRevealedNote(m.id)}
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute -top-3 left-4 w-8 h-4 washi-tape" />
                  
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-sans font-bold text-navy text-sm uppercase tracking-wider">{m.date}</span>
                    {m.done && <CheckCircle2 size={16} className="text-golden" />}
                  </div>
                  <p className="font-quote text-xl text-charcoal">{m.desc}</p>

                  {/* Hidden Note */}
                  {revealedNote === m.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-dashed border-border text-brown font-handwriting text-xl"
                    >
                      {m.id === 1 && "I was so nervous I almost spilled my drink."}
                      {m.id === 2 && "I still laugh thinking about it."}
                      {m.id === 3 && "I looked at you and just... knew."}
                      {m.id === 4 && "I can't wait for all the tomorrows."}
                    </motion.div>
                  )}
                </motion.div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
