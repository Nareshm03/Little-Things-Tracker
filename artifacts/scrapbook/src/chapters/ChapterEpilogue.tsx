import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── The letter ───────────────────────────────────────────────────────────────
// Written from Naresh to Meghana. Not a summary of the scrapbook.
// Just honesty about why it was made.
const LETTER_PARAGRAPHS = [
  'Meghana,',

  "I don't usually write letters.\nI'm better at sending voice notes at 2am and forgetting to reply to texts.",

  "But I wanted to do something that would last longer than a conversation.\nSomething you could come back to on a random Tuesday when everything feels ordinary — and you've forgotten how extraordinary ordinary actually was.",

  "This scrapbook isn't about the big moments.\nYou already remember those.",

  "It's about the in-between.\nThe \"had breakfast?\" at 9am.\nThe \"ride safe\" before every journey.\nThe way a small photo sent at the wrong time\nwould somehow become the best part of the day.",

  "I made this because I kept thinking —\nwhat if we forget?\nNot each other.\nBut the small things.\nThe specific ones.\nThe ones that don't make it into any story\nbut somehow end up being the whole story.",

  "So I collected them.\nNot perfectly.\nNot completely.\nBut honestly.",

  "Every chapter in here is something I didn't want us to lose.\nEvery sticky note, every receipt, every sketch —\nit's just me saying: this mattered.\n\nYou mattered.",

  "Not because of what we did.\nBut because of how you made even the most ordinary days\nfeel like something worth keeping.",

  "Thank you, Meghana.\nFor the breakfast checks.\nFor the good luck messages before every exam.\nFor existing in the same city, the same college, the same story as me.",

  "I genuinely don't know what's next.\nBut I know I want to find out with you.",
];

// ─── Pressed flower (SVG) — same as before, no animation beyond fade ──────────
function PressedFlower() {
  return (
    <svg
      width="48"
      height="54"
      viewBox="0 0 52 52"
      aria-label="Pressed flower"
      role="img"
      className="opacity-52"
    >
      <line x1="26" y1="50" x2="26" y2="28" stroke="#6B7C3A" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
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
      <circle cx="26" cy="26" r="4.5" fill="#C9A84C" opacity="0.7" />
      <circle cx="26" cy="26" r="2.2" fill="#E8D598" opacity="0.8" />
      <ellipse cx="21" cy="38" rx="4" ry="2" transform="rotate(-30 21 38)" fill="#7B8C42" opacity="0.5" />
    </svg>
  );
}

// ─── Ink rule divider ─────────────────────────────────────────────────────────
function InkRule({ delay = 0 }: { delay?: number }) {
  return (
    <svg className="w-20 h-3" viewBox="0 0 100 10" aria-hidden="true">
      <motion.path
        d="M 2 6 C 25 3, 50 8, 75 5 S 92 7, 98 5"
        fill="none"
        stroke="#6F4E37"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity={0.28}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Chapter Epilogue ─────────────────────────────────────────────────────────
export default function ChapterEpilogue({ onNext, onPrev }: ChapterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    // Fade out the letter (1.6s) → half-second stillness → trigger closing sequence
    setTimeout(() => onNext(), shouldReduceMotion ? 400 : 2200);
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#F5F0E8' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.4, ease: 'easeInOut' }}
      aria-label="Epilogue — a letter"
    >
      {/* Very soft warm glow, bottom-centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 85%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* ── Letter content — fades out when closing ── */}
      <AnimatePresence>
        {!closing && (
          <motion.div
            key="letter"
            className="relative z-10 min-h-full flex flex-col items-center px-8 py-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <div className="w-full max-w-[22rem] flex flex-col gap-0">

              {/* Breathing space above */}
              <div className="h-12 md:h-20" aria-hidden="true" />

              {/* Pressed flower */}
              <motion.div
                className="mb-9 flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 2.4, ease: 'easeOut' }}
              >
                <PressedFlower />
              </motion.div>

              {/* Letter body */}
              <div className="space-y-6" role="article" aria-label="Letter from Naresh to Meghana">
                {LETTER_PARAGRAPHS.map((para, i) => {
                  const isGreeting  = i === 0;
                  const isFarewell  = i === LETTER_PARAGRAPHS.length - 1;
                  const delay = 1.4 + i * 0.52;

                  return (
                    <motion.p
                      key={i}
                      className={
                        isGreeting
                          ? 'font-handwriting text-[1.35rem] text-coffee/75 italic leading-snug'
                          : isFarewell
                          ? 'font-handwriting text-[1.15rem] text-charcoal/70 italic leading-relaxed whitespace-pre-line'
                          : 'font-letter text-[1.05rem] text-charcoal/62 leading-[1.75] whitespace-pre-line'
                      }
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 1.8, ease: 'easeOut' }}
                    >
                      {para}
                    </motion.p>
                  );
                })}
              </div>

              {/* Signature block */}
              <motion.div
                className="mt-11 flex flex-col gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + LETTER_PARAGRAPHS.length * 0.52, duration: 2.2, ease: 'easeOut' }}
              >
                <InkRule delay={1.4 + LETTER_PARAGRAPHS.length * 0.52 + 0.1} />
                <p className="font-handwriting text-[1.4rem] text-coffee/58 italic mt-2">
                  yours,
                </p>
                <p className="font-handwriting text-[1.55rem] text-coffee/70 italic">
                  Naresh
                </p>
                <p className="font-sans text-[0.6rem] tracking-[0.28em] text-coffee/28 uppercase mt-2">
                  June 2026
                </p>
              </motion.div>

              {/* Generous space before the close */}
              <div className="h-16 md:h-24" aria-hidden="true" />

              {/* "Whenever you miss us..." — before the close button */}
              <motion.div
                className="flex flex-col items-center gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.4 + LETTER_PARAGRAPHS.length * 0.52 + 2.0,
                  duration: 2.4,
                  ease: 'easeOut',
                }}
              >
                <p className="font-handwriting text-[1.1rem] text-coffee/32 italic text-center leading-relaxed">
                  Whenever you miss us...
                  <br />
                  open this again.
                </p>

                <button
                  onClick={handleClose}
                  className="font-sans text-[0.65rem] tracking-[0.28em] uppercase text-coffee/25 hover:text-coffee/55 transition-colors duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  aria-label="Close the scrapbook"
                >
                  Close the book
                </button>
              </motion.div>

              {/* Back — barely visible */}
              <motion.div
                className="flex justify-center mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.4 + LETTER_PARAGRAPHS.length * 0.52 + 2.4,
                  duration: 1.8,
                }}
              >
                <button
                  onClick={onPrev}
                  className="font-sans text-[0.55rem] tracking-widest uppercase text-coffee/14 hover:text-coffee/35 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-golden"
                  aria-label="Go back to Chapter Seven"
                >
                  ← back
                </button>
              </motion.div>

              {/* Space below */}
              <div className="h-16" aria-hidden="true" />

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Half-second stillness lives in the gap between exit (1.6s) and onNext (2.2s) */}
    </motion.div>
  );
}
