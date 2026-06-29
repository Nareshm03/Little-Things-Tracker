import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// ─── Phase machine ────────────────────────────────────────────────────────────
type Phase =
  | 'pages'     // page slices fan open, then compress
  | 'ribbon'    // ribbon settles
  | 'closing'   // front cover slides shut
  | 'settled'   // book closed, light fades
  | 'final'     // title appears
  | 'gratitude' // "thank you" appears
  | 'reopen'    // "you can always open…" appears
  | 'readagain';// "Read Again" appears

type Props = {
  onReadAgain: () => void;
};

// ─── Seeded random ────────────────────────────────────────────────────────────
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Settling dust ────────────────────────────────────────────────────────────
function SettlingDust({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: 15 + sr(i * 7) * 70,
        y: sr(i * 11) * 60,
        size: 1.5 + sr(i * 3) * 2,
        opacity: 0.07 + sr(i * 5) * 0.12,
        dur: active ? 5 + sr(i * 9) * 5 : 18 + sr(i * 9) * 14,
        delay: sr(i * 13) * 3,
        driftX: (sr(i * 17) - 0.5) * 30,
        // settling: moves downward when active
        driftY: active ? 40 + sr(i * 19) * 60 : -(20 + sr(i * 19) * 35),
      })),
    [active]
  );

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {motes.map((m) => (
        <motion.div
          key={m.id}
          className="absolute rounded-full bg-golden"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size }}
          animate={{
            x: [0, m.driftX, 0],
            y: [0, m.driftY],
            opacity: active ? [m.opacity * 1.4, m.opacity * 0.3] : [m.opacity, m.opacity * 1.5, m.opacity],
          }}
          transition={{
            duration: m.dur,
            repeat: active ? 0 : Infinity,
            delay: m.delay,
            ease: active ? 'easeIn' : 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Book visual ──────────────────────────────────────────────────────────────
function Book({ phase }: { phase: Phase }) {
  const shouldReduceMotion = useReducedMotion();

  const pagesCompressed = phase === 'closing' || phase === 'settled';
  const coverClosed     = phase === 'settled';
  const showShadow      = phase === 'settled' || phase === 'final' || phase === 'gratitude' || phase === 'reopen' || phase === 'readagain';

  // 5 page slices
  const pageSlices = [0, 1, 2, 3, 4];

  return (
    <div className="relative flex items-center justify-center" style={{ width: 260, height: 200 }}>

      {/* Shadow beneath book */}
      <AnimatePresence>
        {showShadow && (
          <motion.div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              width: 200,
              height: 24,
              background: 'radial-gradient(ellipse, rgba(111,78,55,0.22) 0%, transparent 75%)',
              filter: 'blur(4px)',
            }}
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Spine */}
      <div
        className="absolute left-0 top-2 bottom-2 rounded-l"
        style={{ width: 14, background: 'linear-gradient(90deg, #5A3825 0%, #7A5035 100%)' }}
        aria-hidden="true"
      />

      {/* Back cover (always visible behind everything) */}
      <div
        className="absolute top-2 bottom-2"
        style={{
          left: 14,
          right: 0,
          backgroundColor: '#6B4230',
          borderRadius: '0 3px 3px 0',
        }}
        aria-hidden="true"
      />

      {/* Page slices — fan out then compress */}
      <div
        className="absolute top-4 bottom-4 overflow-hidden"
        style={{ left: 16, right: 4 }}
        aria-hidden="true"
      >
        {pageSlices.map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-coffee/10"
            style={{
              backgroundColor: i % 2 === 0 ? '#FAF6EE' : '#F3EDE0',
              borderRadius: '0 2px 2px 0',
            }}
            animate={
              shouldReduceMotion
                ? { x: 0 }
                : {
                    x: pagesCompressed ? 0 : (pageSlices.length - 1 - i) * 3,
                    scaleX: pagesCompressed ? 1 : 0.97 + i * 0.006,
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 1.4,
              delay: pagesCompressed ? i * 0.07 : (pageSlices.length - 1 - i) * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Lined paper texture on topmost page */}
        <div
          className="absolute inset-0 rounded-r"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 14px, rgba(111,78,55,0.06) 15px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Ribbon bookmark — hangs from spine top */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{ left: 8, top: 0, width: 6, height: 90, originX: 0.5, originY: 0 }}
        animate={
          shouldReduceMotion
            ? {}
            : phase === 'ribbon' || phase === 'closing' || phase === 'settled'
            ? {
                rotate: [0, -12, 6, -4, 2, 0],
                y: [0, 12, 4, 8, 6, 8],
              }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 2.8, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #8B2020 0%, #A83232 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)',
          }}
        />
      </motion.div>

      {/* Front cover — slides/rotates shut */}
      <motion.div
        className="absolute top-0 bottom-0 z-20 rounded-r"
        style={{
          left: 14,
          right: 0,
          perspective: 800,
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          background: 'linear-gradient(135deg, #7A4A2A 0%, #5A3215 60%, #6B3D1E 100%)',
          boxShadow: '2px 0 12px rgba(0,0,0,0.25)',
        }}
        animate={
          shouldReduceMotion
            ? { rotateY: 0, opacity: coverClosed ? 1 : 0 }
            : {
                rotateY: coverClosed ? 0 : -38,
                opacity: coverClosed ? 1 : 0,
              }
        }
        transition={{
          duration: shouldReduceMotion ? 0.3 : 2.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        aria-hidden="true"
      >
        {/* Cover texture lines */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.06) 23px)',
          }}
        />

        {/* Embossed title on cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4">
          <div className="w-12 h-px bg-[#C9A84C]/40" />
          <p className="font-display text-[10px] tracking-widest uppercase text-[#C9A84C]/45 text-center leading-tight mt-1">
            The Little Things
          </p>
          <p className="font-display text-[8px] tracking-widest uppercase text-[#C9A84C]/30 text-center">
            We Never Want
          </p>
          <p className="font-display text-[8px] tracking-widest uppercase text-[#C9A84C]/30 text-center">
            To Forget
          </p>
          <div className="w-12 h-px bg-[#C9A84C]/40 mt-1" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Sunlight veil — fades out ────────────────────────────────────────────────
function Sunlight({ fading }: { fading: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 85%, rgba(232,184,109,0.20) 0%, rgba(212,132,74,0.07) 50%, transparent 80%)',
      }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 3.5, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  );
}

// ─── Final text screen ────────────────────────────────────────────────────────
function FinalText({
  phase,
  onReadAgain,
}: {
  phase: Phase;
  onReadAgain: () => void;
}) {
  const showTitle     = ['final','gratitude','reopen','readagain'].includes(phase);
  const showGratitude = ['gratitude','reopen','readagain'].includes(phase);
  const showReopen    = ['reopen','readagain'].includes(phase);
  const showReadAgain = phase === 'readagain';

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none"
      aria-live="polite"
    >
      {/* Title */}
      <AnimatePresence>
        {showTitle && (
          <motion.p
            key="title"
            className="font-display text-2xl md:text-3xl text-coffee/80 text-center leading-snug tracking-wide max-w-xs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
          >
            The Little Things We Never Want To Forget
          </motion.p>
        )}
      </AnimatePresence>

      {/* Gratitude */}
      <AnimatePresence>
        {showGratitude && (
          <motion.p
            key="gratitude"
            className="font-quote text-lg text-charcoal/50 italic text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            Thank you for reading our story.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Reopen message */}
      <AnimatePresence>
        {showReopen && (
          <motion.p
            key="reopen"
            className="font-handwriting text-xl text-coffee/35 italic text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            You can always open this book again.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Read Again — subtle, pointer-events re-enabled */}
      <AnimatePresence>
        {showReadAgain && (
          <motion.button
            key="readagain"
            className="pointer-events-auto font-sans text-xs tracking-widest uppercase text-coffee/25 hover:text-coffee/55 transition-colors duration-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            onClick={onReadAgain}
            aria-label="Read the scrapbook again from the beginning"
          >
            Read Again
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ClosingSequence({ onReadAgain }: Props) {
  const [phase, setPhase] = useState<Phase>('pages');
  const shouldReduceMotion = useReducedMotion();

  // Phase timing — slowed for reduced motion
  useEffect(() => {
    const t = shouldReduceMotion ? 0.25 : 1;

    const timers = [
      setTimeout(() => setPhase('ribbon'),    1800 * t),
      setTimeout(() => setPhase('closing'),   3500 * t),
      setTimeout(() => setPhase('settled'),   6200 * t),
      setTimeout(() => setPhase('final'),     8800 * t),
      setTimeout(() => setPhase('gratitude'), 12000 * t),
      setTimeout(() => setPhase('reopen'),    16000 * t),
      setTimeout(() => setPhase('readagain'), 20000 * t),
    ];

    return () => timers.forEach(clearTimeout);
  }, [shouldReduceMotion]);

  const lightFading = phase === 'settled' || phase === 'final' || phase === 'gratitude' || phase === 'reopen' || phase === 'readagain';
  const dustSettling = phase === 'settled' || phase === 'final';
  const bookVisible = !['final','gratitude','reopen','readagain'].includes(phase);
  const showFinalText = ['final','gratitude','reopen','readagain'].includes(phase);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#F5F0E8' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: 'easeInOut' }}
      aria-label="Scrapbook closing"
      role="region"
    >
      {/* Background sunlight */}
      <Sunlight fading={lightFading} />

      {/* Settling dust */}
      <SettlingDust active={dustSettling} />

      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Book */}
      <AnimatePresence>
        {bookVisible && (
          <motion.div
            key="book"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.88,
              transition: { duration: 1.8, ease: 'easeInOut' },
            }}
          >
            <Book phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final text */}
      {showFinalText && (
        <FinalText phase={phase} onReadAgain={onReadAgain} />
      )}
    </motion.div>
  );
}
