import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import { epilogueData } from '../data/chapters/epilogue';

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit:    { opacity: 0, filter: 'blur(6px)' },
};

// ─── Pressed flower (SVG) ─────────────────────────────────────────────────────
function PressedFlower() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      aria-label="Pressed flower"
      role="img"
      className="opacity-55"
    >
      {/* Stem */}
      <line x1="26" y1="50" x2="26" y2="28" stroke="#6B7C3A" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      {/* Petals — 6 petals, each a soft ellipse rotated around center */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse
          key={i}
          cx={26 + Math.cos((deg * Math.PI) / 180) * 10}
          cy={26 + Math.sin((deg * Math.PI) / 180) * 10}
          rx="6"
          ry="3.5"
          transform={`rotate(${deg}, ${26 + Math.cos((deg * Math.PI) / 180) * 10}, ${26 + Math.sin((deg * Math.PI) / 180) * 10})`}
          fill={i % 2 === 0 ? '#D4A8B0' : '#C89AA2'}
          opacity="0.65"
        />
      ))}
      {/* Centre */}
      <circle cx="26" cy="26" r="4.5" fill="#C9A84C" opacity="0.7" />
      <circle cx="26" cy="26" r="2.2" fill="#E8D598" opacity="0.8" />
      {/* Tiny leaf */}
      <ellipse cx="21" cy="38" rx="4" ry="2" transform="rotate(-30 21 38)" fill="#7B8C42" opacity="0.5" />
    </svg>
  );
}

// ─── Ink divider ──────────────────────────────────────────────────────────────
function InkRule({ delay = 0 }: { delay?: number }) {
  return (
    <svg className="w-24 h-3" viewBox="0 0 100 10" aria-hidden="true">
      <motion.path
        d="M 2 6 C 25 3, 50 8, 75 5 S 92 7, 98 5"
        fill="none"
        stroke="#6F4E37"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity={0.35}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function ChapterEpilogue({ onNext, onPrev }: ChapterProps) {
  const shouldReduceMotion = useReducedMotion();
  const { letter, signature, date, finishLabel } = epilogueData;

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-cream paper-texture overflow-y-auto overflow-x-hidden"
      variants={shouldReduceMotion ? {} : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 2.2, ease: 'easeInOut' }}
      aria-label="Epilogue"
    >
      {/* Very subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Paper texture noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Page content — single centred column, generous empty space */}
      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-8 py-20">
        <div className="w-full max-w-sm flex flex-col gap-0">

          {/* Large empty space above — breathing room */}
          <div className="h-16 md:h-24" aria-hidden="true" />

          {/* Pressed flower — top of letter */}
          <motion.div
            className="mb-8 flex justify-start"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 2, ease: 'easeOut' }}
          >
            <PressedFlower />
          </motion.div>

          {/* Letter body */}
          <div className="space-y-7" role="article" aria-label="Closing letter">
            {letter.map((paragraph, i) => (
              <motion.p
                key={i}
                className={
                  i === 0
                    ? 'font-handwriting text-2xl text-coffee/80 italic leading-relaxed'
                    : i === letter.length - 1
                    ? 'font-handwriting text-2xl text-charcoal/85 italic leading-relaxed'
                    : 'font-letter text-xl text-charcoal/65 leading-relaxed'
                }
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.55, duration: 1.6, ease: 'easeOut' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Signature block */}
          <motion.div
            className="mt-12 flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 2, ease: 'easeOut' }}
          >
            <InkRule delay={3.9} />
            <p className="font-handwriting text-2xl text-coffee/60 italic mt-1">
              {signature}
            </p>
            <p className="font-sans text-xs tracking-widest text-coffee/30 uppercase mt-1">
              {date}
            </p>
          </motion.div>

          {/* Large empty space below */}
          <div className="h-20 md:h-32" aria-hidden="true" />

          {/* Finish — close the book */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 2, ease: 'easeOut' }}
          >
            <button
              onClick={onNext}
              className="font-handwriting text-xl text-coffee/30 hover:text-coffee/60 transition-colors duration-700 underline underline-offset-4 tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              aria-label="Close the scrapbook"
            >
              {finishLabel}
            </button>
          </motion.div>

          {/* Back option — very subtle */}
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 1.5 }}
          >
            <button
              onClick={onPrev}
              className="font-sans text-[10px] tracking-widest uppercase text-coffee/18 hover:text-coffee/40 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              aria-label="Go back to previous chapter"
            >
              ← back
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
