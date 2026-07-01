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

  // 7 page slices for realistic paper thickness
  const pageSlices = [0, 1, 2, 3, 4, 5, 6];

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

// ─── Pressed flower — remains on the final page like a keepsake ───────────────
// Appears after the book closes. A dried marigold, the same one from the cover,
// now resting alone on the cream page. It never leaves.
function FinalPressedFlower({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="final-flower"
          className="absolute pointer-events-none"
          style={{ bottom: '14%', right: '12%' }}
          initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="88" height="88">
            <defs>
              <radialGradient id="fpg-a" cx="50%" cy="28%" r="72%">
                <stop offset="0%"   stopColor="#EDD08A" />
                <stop offset="55%"  stopColor="#C98D30" />
                <stop offset="100%" stopColor="#7A5018" stopOpacity="0.8" />
              </radialGradient>
              <radialGradient id="fpg-b" cx="50%" cy="28%" r="72%">
                <stop offset="0%"   stopColor="#E0BC6A" />
                <stop offset="55%"  stopColor="#B87820" />
                <stop offset="100%" stopColor="#6B4010" stopOpacity="0.75" />
              </radialGradient>
              <radialGradient id="fpg-c" cx="38%" cy="32%" r="65%">
                <stop offset="0%"   stopColor="#4A2808" />
                <stop offset="100%" stopColor="#1E0E02" />
              </radialGradient>
            </defs>
            {/* Outer petals */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
              <ellipse key={`op-${i}`} cx="60" cy="42" rx="8" ry="19"
                fill={i % 2 === 0 ? 'url(#fpg-a)' : 'url(#fpg-b)'}
                transform={`rotate(${deg} 60 60)`} opacity={0.72 + (i % 3) * 0.05} />
            ))}
            {/* Vein lines */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
              <line key={`vl-${i}`} x1="60" y1="57" x2="60" y2="37"
                stroke="#7A4A10" strokeWidth="0.5" opacity="0.25"
                transform={`rotate(${deg} 60 60)`} />
            ))}
            {/* Inner petals */}
            {[15,45,75,105,135,165,195,225,255,285,315,345].map((deg, i) => (
              <ellipse key={`ip-${i}`} cx="60" cy="46" rx="6" ry="14"
                fill={i % 2 === 0 ? 'url(#fpg-b)' : 'url(#fpg-a)'}
                transform={`rotate(${deg} 60 60)`} opacity={0.62 + (i % 3) * 0.05} />
            ))}
            {/* Centre disc */}
            <circle cx="60" cy="60" r="13" fill="url(#fpg-c)" opacity="0.9" />
            {[[60,52],[56,54],[64,54],[58,57],[62,57],[55,59],[65,59],[57,62],[63,62],[60,65]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="1" fill="#D4A040" opacity="0.45" />
            ))}
            <ellipse cx="56" cy="54" rx="4" ry="2.5" fill="rgba(255,230,150,0.12)" transform="rotate(-25 56 54)" />
          </svg>
          {/* Tiny stem / shadow to ground it on the page */}
          <motion.div
            style={{
              position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
              width: 1.5, height: 18,
              background: 'linear-gradient(to bottom, rgba(107,124,58,0.55), rgba(107,124,58,0.08))',
              borderRadius: 2,
              transformOrigin: 'top',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 1.2, ease: 'easeOut' }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
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
  const showFlower    = ['final','gratitude','reopen','readagain'].includes(phase);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none"
      aria-live="polite"
    >
      {/* Pressed flower — placed like a keepsake, stays forever */}
      <FinalPressedFlower visible={showFlower} />

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
            Whenever you miss us... open this again.
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
      setTimeout(() => setPhase('readagain'), 18500 * t),
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
