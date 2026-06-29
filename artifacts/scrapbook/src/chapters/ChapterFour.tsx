import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Sunlight drift ──────────────────────────────────────────────────────────
function SunlightDrift() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 w-[55%] h-full"
        style={{ background: 'radial-gradient(ellipse at 15% 25%, rgba(232,184,109,0.16) 0%, transparent 60%)' }}
        animate={{ x: [0, 14, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[45%] h-full"
        style={{ background: 'radial-gradient(ellipse at 85% 65%, rgba(200,146,74,0.09) 0%, transparent 55%)' }}
        animate={{ x: [0, -10, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

// ─── Handwriting annotation ───────────────────────────────────────────────────
function Note({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className={`font-handwriting text-[9px] text-[#8B2020]/45 pointer-events-none select-none ${className}`}
    >
      {children}
    </motion.p>
  );
}

// ─── Temple Receipt ───────────────────────────────────────────────────────────
function TempleReceipt({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2 }}
      animate={{ opacity: 1, rotate: -2 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 148 }}
    >
      <Note delay={delay + 0.8} className="absolute -right-3 -top-5 rotate-[5deg]">kept this.</Note>
      <div className="bg-[#FFFEF8] border border-[#C9A84C]/30 shadow-sm overflow-hidden">
        <div className="bg-[#C9A84C]/12 px-3 py-1.5 border-b border-[#C9A84C]/18 text-center">
          <p className="font-sans text-[7px] tracking-[0.3em] uppercase text-[#8B6020]/55">Sri Anjaneya Temple</p>
          <p className="font-sans text-[6px] tracking-wide text-[#8B6020]/35">Hosakote</p>
        </div>
        <div className="px-3 py-2.5 space-y-1.5">
          <div className="flex justify-between items-baseline">
            <p className="font-sans text-[8px] text-charcoal/45">Prasad</p>
            <p className="font-sans text-[8px] text-charcoal/55">₹ 10</p>
          </div>
          <div className="flex justify-between items-baseline">
            <p className="font-sans text-[8px] text-charcoal/45">Archana</p>
            <p className="font-sans text-[8px] text-charcoal/55">₹ 25</p>
          </div>
          <div className="h-px border-t border-dashed border-[#C9A84C]/20 my-0.5" />
          <div className="flex justify-between items-baseline">
            <p className="font-sans text-[7px] text-charcoal/35 italic">Two</p>
            <p className="font-sans text-[8px] text-charcoal/50 font-medium">₹ 35</p>
          </div>
        </div>
        <div className="border-t border-dashed border-[#C9A84C]/15 mx-2 mb-1" />
        <p className="font-handwriting text-[8px] text-charcoal/22 text-center pb-1.5">5 April 2026</p>
      </div>
    </motion.div>
  );
}

// ─── Pressed Jasmine ──────────────────────────────────────────────────────────
function PressedJasmine({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 6 }}
      animate={{ opacity: 1, rotate: 6 }}
      transition={{ delay, duration: 1.3 }}
      className="relative"
      style={{ width: 80 }}
    >
      <Note delay={delay + 1} className="absolute -bottom-5 -right-8 -rotate-[4deg] whitespace-nowrap">still smells the same.</Note>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 washi-tape rotate-[2deg]" />
      <svg viewBox="0 0 80 88" width="80" height="88" aria-label="Pressed jasmine flower" role="img">
        <ellipse cx="40" cy="55" rx="26" ry="20" fill="#E8E0CC" opacity="0.6" />
        {[0,51,103,154,205,257,308].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 40 44)`}>
            <ellipse cx="40" cy="26" rx="6" ry="11" fill="#F5F0E4" opacity="0.85" />
          </g>
        ))}
        <circle cx="40" cy="44" r="6" fill="#E8D4A8" opacity="0.9" />
        <circle cx="40" cy="44" r="3" fill="#C9A84C" opacity="0.55" />
      </svg>
    </motion.div>
  );
}

// ─── Vibhuti / Kumkum Thumbprint ──────────────────────────────────────────────
function VibhutiPrint({ delay }: { delay: number }) {
  const [tapped, setTapped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
    >
      <motion.button
        className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2020]/40 focus-visible:ring-offset-2 rounded-full"
        onClick={() => setTapped(v => !v)}
        aria-label={tapped ? 'Hide date' : 'Tap the kumkum mark'}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
      >
        <svg viewBox="0 0 52 56" width="52" height="56" aria-hidden="true">
          <defs>
            <radialGradient id="kum" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#C8283C" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#A01828" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#A01828" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="26" cy="30" rx="18" ry="22" fill="url(#kum)" />
          <path d="M18 18 Q22 12 26 11 Q30 12 34 18 Q38 26 36 34 Q32 42 26 44 Q20 42 16 34 Q14 26 18 18Z" fill="#B01828" opacity="0.18" />
          {[...Array(8)].map((_, i) => (
            <ellipse key={i}
              cx={26 + Math.sin(i * 0.9) * 11}
              cy={30 + Math.cos(i * 0.9) * 14}
              rx="1.5" ry="3.5"
              transform={`rotate(${i * 45} ${26 + Math.sin(i * 0.9) * 11} ${30 + Math.cos(i * 0.9) * 14})`}
              fill="#A01828" opacity="0.12"
            />
          ))}
        </svg>
        <Note delay={delay + 0.6} className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap !text-[8px]">tap ↑</Note>
      </motion.button>

      <AnimatePresence>
        {tapped && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFFEF8] border border-[#C9A84C]/30 shadow-md px-3 py-1.5 text-center whitespace-nowrap z-20"
            style={{ borderRadius: 2 }}
          >
            <p className="font-handwriting text-[10px] text-[#8B2020]/65">12 April</p>
            <p className="font-sans text-[8px] tracking-widest uppercase text-charcoal/35">Halasuru Temple</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── INTERACTION 1: Temple Bell ────────────────────────────────────────────────
function TempleBell({ delay }: { delay: number }) {
  const [swinging, setSwinging] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleTap() {
    if (swinging) return;
    setSwinging(true);
    setTimeout(() => setSwinging(false), 1400);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative flex flex-col items-center"
      style={{ width: 64 }}
    >
      <Note delay={delay + 0.7} className="absolute -right-10 top-0 rotate-[3deg] whitespace-nowrap">ring once.</Note>
      <div className="w-px h-6 bg-[#C9A84C]/40" />
      <motion.button
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2 rounded-full"
        onClick={handleTap}
        aria-label="Ring the temple bell"
        animate={swinging && !shouldReduceMotion ? { rotate: [0, 18, -16, 12, -8, 4, 0] } : { rotate: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
      >
        <svg viewBox="0 0 48 56" width="48" height="56" aria-hidden="true">
          <defs>
            <radialGradient id="brass" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#E8C84A" />
              <stop offset="50%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#8B7020" />
            </radialGradient>
          </defs>
          <path d="M24 6 Q34 8 38 18 L40 40 Q40 44 24 44 Q8 44 8 40 L10 18 Q14 8 24 6Z" fill="url(#brass)" />
          <ellipse cx="24" cy="44" rx="16" ry="4" fill="#C9A84C" opacity="0.6" />
          <ellipse cx="24" cy="6" rx="4" ry="3" fill="#8B7020" />
          <ellipse cx="24" cy="4" rx="3" ry="2" fill="#6B5010" />
          <path d="M16 22 Q24 20 32 22" fill="none" stroke="#E8D48A" strokeWidth="1" opacity="0.5" />
          <path d="M14 30 Q24 28 34 30" fill="none" stroke="#E8D48A" strokeWidth="1" opacity="0.35" />
          <line x1="24" y1="40" x2="24" y2="50" stroke="#8B7020" strokeWidth="1.5" />
          <ellipse cx="24" cy="51" rx="4" ry="2.5" fill="#6B5010" opacity="0.7" />
        </svg>
      </motion.button>
      {swinging && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2 }}
          className="font-handwriting text-[8px] text-[#C9A84C]/55 mt-1 absolute -bottom-5"
          aria-live="polite"
        >
          🔔
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── INTERACTION 2: Folded Prayer ─────────────────────────────────────────────
function FoldedPrayer({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: 2 }}
      animate={{ opacity: 1, rotate: 2 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 160 }}
    >
      <div className="absolute -top-3 left-4 w-12 h-4 washi-tape -rotate-[2deg]" />
      <Note delay={delay + 0.8} className="absolute -right-2 -top-5 rotate-[4deg]">a real promise.</Note>

      <div
        className="bg-[#FFFEF8] border border-[#C9A84C]/30 shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-[#C9A84C]/30"
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Fold prayer note' : 'Open prayer note'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        <div className="px-4 pt-3 pb-2 border-b border-[#C9A84C]/15 flex items-center justify-between">
          <p className="font-sans text-[7px] tracking-[0.3em] uppercase text-[#8B6020]/40">Prayer Note</p>
          <motion.span animate={{ rotate: opened ? 90 : 0 }} transition={{ duration: 0.4 }}
            className="text-[10px] text-[#C9A84C]/40" aria-hidden="true">▷</motion.span>
        </div>

        <AnimatePresence initial={false}>
          {!opened && (
            <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} className="px-4 py-3">
              <div className="space-y-1.5">
                {[3.5, 2.5, 4].map((w, i) => (
                  <div key={i} className="h-px bg-[#C9A84C]/18" style={{ width: `${w / 4 * 100}%` }} />
                ))}
              </div>
              <p className="font-handwriting text-[8px] text-charcoal/22 text-right mt-3 italic">tap to open</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {opened && (
            <motion.div key="open" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden">
              <div className="px-5 py-4 space-y-1">
                {[
                  { text: 'We said we\'d go to Tirupati.', d: 0.1 },
                  { text: '', d: 0.3 },
                  { text: 'Deal is deal.', d: 0.5 },
                  { text: '', d: 0.7 },
                  { text: '— N', d: 1.1 },
                ].map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: line.d, duration: 1 }}
                    className="font-letter text-[13px] text-charcoal/68 leading-relaxed min-h-[18px]">
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Saree & Dhoti Card ───────────────────────────────────────────────────────
function SareeDhotiCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -3 }}
      animate={{ opacity: 1, rotate: -3 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 180 }}
    >
      <div className="absolute -top-3 right-5 w-14 h-4 washi-tape rotate-[1deg]" />
      <Note delay={delay + 0.7} className="absolute -left-3 -top-5 -rotate-[3deg]">12–13 April.</Note>
      <div className="bg-[#FDF6ED] border border-[#C9A84C]/25 shadow-sm px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-0.5 pt-0.5">
            <svg viewBox="0 0 20 32" width="20" height="32" aria-label="Saree" role="img">
              <rect x="4" y="0" width="12" height="32" rx="2" fill="#8B2020" opacity="0.55" />
              <path d="M4 8 Q10 12 16 8 Q10 4 4 8Z" fill="#C9A84C" opacity="0.6" />
              <path d="M4 16 Q10 20 16 16 Q10 12 4 16Z" fill="#C9A84C" opacity="0.45" />
              <path d="M4 24 Q10 28 16 24 Q10 20 4 24Z" fill="#C9A84C" opacity="0.35" />
            </svg>
            <p className="font-handwriting text-[7px] text-charcoal/35">saree</p>
          </div>
          <div className="flex flex-col items-center gap-0.5 pt-0.5">
            <svg viewBox="0 0 20 32" width="20" height="32" aria-label="Dhoti" role="img">
              <rect x="2" y="0" width="16" height="20" rx="1" fill="#F0E8D8" opacity="0.9" />
              <rect x="2" y="0" width="16" height="20" rx="1" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
              <path d="M2 20 L6 32 L14 32 L18 20Z" fill="#F0E8D8" opacity="0.9" />
              <path d="M2 20 L6 32 L14 32 L18 20Z" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.35" />
              <line x1="2" y1="10" x2="18" y2="10" stroke="#C9A84C" strokeWidth="0.7" opacity="0.4" />
            </svg>
            <p className="font-handwriting text-[7px] text-charcoal/35">dhoti</p>
          </div>
          <div className="flex-1 pl-1">
            <p className="font-letter text-[12px] text-charcoal/60 leading-relaxed">
              Both of us in temple clothes.
            </p>
            <p className="font-letter text-[12px] text-[#8B2020]/50 leading-relaxed mt-0.5">
              Vibhuti on both foreheads.
            </p>
            <p className="font-handwriting text-[9px] text-charcoal/28 mt-2 italic">Halasuru Temple</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Swayam Fest Note ─────────────────────────────────────────────────────────
function SwayamNote({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 1.5 }}
      animate={{ opacity: 1, rotate: 1.5 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 160 }}
    >
      <div className="absolute -top-2 left-3 w-10 h-4 washi-tape -rotate-[1deg]" />
      <Note delay={delay + 0.6} className="absolute -right-4 -top-4 rotate-[5deg]">end of April.</Note>
      <div className="bg-white border border-charcoal/8 shadow-sm px-4 py-3" style={{ borderLeft: '3px solid #E8924A' }}>
        <p className="font-sans text-[7px] tracking-[0.3em] uppercase text-[#E8924A]/55 mb-1.5">Swayam Fest</p>
        <p className="font-letter text-[12px] text-charcoal/60 leading-relaxed">Walking together.</p>
        <p className="font-letter text-[12px] text-charcoal/50 leading-relaxed">Talking about everything.</p>
        <p className="font-letter text-[12px] text-charcoal/40 leading-relaxed">Nothing in particular.</p>
        <p className="font-handwriting text-[9px] text-charcoal/25 mt-2 italic">28–29 April 2026</p>
      </div>
    </motion.div>
  );
}

// ─── Prayer Thread ────────────────────────────────────────────────────────────
function PrayerThread({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.5 }}
      className="pointer-events-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 8 120" width="8" height="120">
        <path d="M4 2 Q6 12 4 22 Q2 32 4 42 Q6 52 4 62 Q2 72 4 82 Q6 92 4 102 Q2 112 4 118"
          fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        {[18,36,54,72,90].map((y, i) => (
          <circle key={i} cx="4" cy={y} r="2.5" fill="#C9A84C" opacity="0.35" />
        ))}
      </svg>
    </motion.div>
  );
}

// ─── Chapter Four ─────────────────────────────────────────────────────────────
export default function ChapterFour({ onNext, onPrev }: ChapterProps) {
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#FDF6ED' }}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      aria-label="Chapter Four: Where We Found Peace"
    >
      {/* Paper grain */}
      <div className="absolute inset-0 pointer-events-none paper-texture" aria-hidden="true" />
      <SunlightDrift />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 py-8 z-10 relative flex flex-col gap-8">

          {/* Background accent */}
          <div className="absolute top-32 left-2 w-12 h-12 rounded-full border border-[#C9A84C]/10 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 3px rgba(201,168,76,0.05)' }} aria-hidden="true" />
          <div className="absolute bottom-32 left-0 text-sm opacity-8 pointer-events-none select-none" aria-hidden="true">🪔</div>

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#8B6020]/40 mb-1">Chapter Four</p>
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#8B2020]/30 mb-2">April 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#7C4A10] leading-tight">Where We Found<br />Peace</h2>
            <motion.svg className="w-48 h-4 mt-1.5" viewBox="0 0 200 12" aria-hidden="true">
              <motion.path d="M0 7 Q50 3 100 7 Q150 11 200 6"
                fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.7 }} />
            </motion.svg>
          </motion.div>

          {/* Handwriting quote */}
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1 }}>
            <div className="bg-[#FDF8F0] border border-[#C9A84C]/20 shadow-sm px-5 py-4" style={{ rotate: '-0.5deg' }}>
              <p className="font-letter text-base text-charcoal/62 leading-loose">
                Some places become special<br />
                <span className="ml-4">because of</span><br />
                <span className="ml-8">who stood beside you.</span>
              </p>
            </div>
          </motion.div>

          {/* Pressed jasmine + temple receipt side by side */}
          <div className="flex items-end gap-6 pl-2">
            <PressedJasmine delay={1.2} />
            <TempleReceipt delay={1.5} />
          </div>

          {/* Prayer thread decoration */}
          <div className="absolute right-14 top-56 opacity-60">
            <PrayerThread delay={2} />
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-auto pt-8">
            <button
              onClick={onPrev}
              className="font-handwriting text-xl text-[#8B6020]/55 hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2"
              aria-label="Previous chapter"
            >← back</button>
            <button
              onClick={onNext}
              className="font-handwriting text-xl text-[#E8924A] hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2 ml-auto"
              aria-label="Next chapter"
            >next chapter →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE ═══════════ */}
        <div className="flex-1 md:pl-12 py-8 z-10 relative">

          {/* Scattered layout — deliberate offsets */}
          <div className="relative min-h-full">

            {/* Temple bell — top right, floats alone */}
            <div className="absolute top-6 right-6">
              <TempleBell delay={0.6} />
            </div>

            {/* Vibhuti thumbprint — top left */}
            <div className="absolute top-4 left-8">
              <VibhutiPrint delay={0.9} />
            </div>

            {/* Saree & dhoti card — center */}
            <div className="absolute top-20 left-12">
              <SareeDhotiCard delay={1.2} />
            </div>

            {/* Folded prayer — mid right, slight overlap */}
            <div className="absolute top-48 right-4">
              <FoldedPrayer delay={1.6} />
            </div>

            {/* Swayam note — lower left */}
            <div className="absolute top-80 left-4">
              <SwayamNote delay={2} />
            </div>

            {/* Quiet ending sentence */}
            <motion.div
              className="absolute bottom-16 right-0 left-0 text-right pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
            >
              <p className="font-quote text-sm text-charcoal/35 italic">Some memories</p>
              <p className="font-quote text-sm text-charcoal/28 italic">never needed words.</p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
