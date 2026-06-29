import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';
import { MapPin } from 'lucide-react';

const locations = [
  { id: 1, name: "College", x: 20, y: 30, memory: "Where our eyes first met." },
  { id: 2, name: "Hope Farm", x: 40, y: 60, memory: "That one evening we just walked and talked." },
  { id: 3, name: "The Temple", x: 70, y: 20, memory: "Peaceful mornings." },
  { id: 4, name: "Metro Station", x: 80, y: 70, memory: "Saying goodbye, dragging it out for 10 more minutes." }
];

export default function ChapterTwo({ onNext, onPrev }: ChapterProps) {
  const [activePin, setActivePin] = useState<number | null>(null);

  const pageFlipVariants = {
    initial: { rotateY: -90, transformOrigin: 'left', opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, transformOrigin: 'right', opacity: 0 }
  };

  return (
    <motion.div 
      className="absolute inset-0 bg-soft-beige w-full h-full overflow-hidden paper-texture"
      variants={pageFlipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Hand-drawn Map Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="pencil">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <path d="M 100 200 Q 300 100 500 300 T 900 200" fill="none" stroke="black" strokeWidth="2" filter="url(#pencil)" />
          <path d="M 200 500 Q 400 400 600 600 T 1000 500" fill="none" stroke="black" strokeWidth="1" strokeDasharray="5,5" filter="url(#pencil)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto h-full p-8 flex flex-col">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 mb-8"
        >
          <h2 className="font-display text-5xl md:text-6xl text-navy">Where We Kept Meeting</h2>
          <p className="font-quote text-xl mt-4 text-brown italic">"Every place is a memory now."</p>
        </motion.div>

        {/* Map Area */}
        <div className="flex-1 relative w-full max-w-4xl mx-auto bg-[#FDFBF7] rounded-xl shadow-inner border-2 border-[#E5D5C5] overflow-hidden p-8">
          
          {/* SVG Route Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <motion.path
              d="M 20% 30% C 30% 45%, 35% 55%, 40% 60% S 60% 40%, 70% 20% S 75% 45%, 80% 70%"
              fill="none"
              stroke="#D4844A"
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeLinecap="round"
              className="path-draw"
            />
          </svg>

          {/* Pins */}
          {locations.map((loc, i) => (
            <motion.div
              key={loc.id}
              className="absolute group cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`View memory: ${loc.name}`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + (i * 0.5), type: "spring", bounce: 0.5 }}
              onClick={() => setActivePin(loc.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePin(loc.id); } }}
            >
              <div className="relative -translate-x-1/2 -translate-y-full">
                <MapPin 
                  size={32} 
                  className={`text-marigold drop-shadow-md transition-transform duration-300 ${activePin === loc.id ? 'scale-125' : 'group-hover:scale-110'}`} 
                  fill={activePin === loc.id ? "#FF8C00" : "none"}
                />
                
                {/* Location Name Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {loc.name}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Memory Card Popup */}
          <AnimatePresence>
            {activePin !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white p-6 rounded-lg shadow-xl border border-border max-w-sm w-[90%]"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 washi-tape" />
                <button 
                  onClick={() => setActivePin(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
                <h3 className="font-handwriting text-3xl text-coffee mb-2">{locations.find(l => l.id === activePin)?.name}</h3>
                <p className="font-letter text-xl text-charcoal leading-snug">
                  {locations.find(l => l.id === activePin)?.memory}
                </p>
                {/* Stamp animation on open */}
                <motion.div 
                  initial={{ opacity: 0, scale: 2, rotate: -20 }}
                  animate={{ opacity: 0.5, scale: 1, rotate: -10 }}
                  className="absolute bottom-2 right-2 border-2 border-red-800 text-red-800 text-xs font-bold px-2 py-1 uppercase rounded-sm mix-blend-multiply pointer-events-none"
                  style={{ transformOrigin: 'center' }}
                >
                  VISITED
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}
