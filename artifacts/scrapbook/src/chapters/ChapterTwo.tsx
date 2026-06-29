import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Date Divider ─────────────────────────────────────────────────────────────

function DateDivider({ date, delay = 0 }: { date: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className="flex items-center gap-3 my-4"
    >
      <div className="flex-1 h-px bg-charcoal/12" />
      <p className="font-handwriting text-xs text-charcoal/38 whitespace-nowrap tracking-wide">{date}</p>
      <div className="flex-1 h-px bg-charcoal/12" />
    </motion.div>
  );
}

// ─── INTERACTIVE 1: Envelope — First Kiss ─────────────────────────────────────
// Only the date. Trust the memory.

function EnvelopeCard({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2 }}
      animate={{ opacity: 1, rotate: -2 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 220 }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 washi-tape" />

      <div
        className="bg-[#FDF6E8] border border-[#D4C4A8]/60 shadow-md overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-coffee/30"
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Close envelope' : 'Open envelope'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        {/* Flap */}
        <motion.div
          className="w-full origin-top pointer-events-none"
          animate={{ scaleY: opened ? 0 : 1, opacity: opened ? 0 : 1 } as any}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg viewBox="0 0 220 52" width="100%" className="block">
            <polygon points="0,0 110,47 220,0" fill="#F0E6CC" />
            <line x1="0" y1="0" x2="110" y2="47" stroke="#D4C4A8" strokeWidth="0.7" opacity="0.5" />
            <line x1="220" y1="0" x2="110" y2="47" stroke="#D4C4A8" strokeWidth="0.7" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="px-5 py-4 min-h-[80px] flex items-center justify-center">
          {/* V-fold lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="100%" x2="50%" y2="52" stroke="#D4C4A8" strokeWidth="0.5" opacity="0.35" />
            <line x1="100%" y1="100%" x2="50%" y2="52" stroke="#D4C4A8" strokeWidth="0.5" opacity="0.35" />
          </svg>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.p key="hint" exit={{ opacity: 0 }}
                className="font-handwriting text-xs text-charcoal/30 text-center">
                tap to open
              </motion.p>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="w-full flex flex-col items-center gap-3"
              >
                {/* Polaroid — just the frame, no image needed */}
                <div className="bg-white p-2 pb-7 shadow-sm border border-gray-100/80 relative"
                  style={{ width: 110, transform: 'rotate(1deg)' }}>
                  <div className="w-full bg-[#EDE3D8]" style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-2xl opacity-30" aria-hidden="true">💋</span>
                  </div>
                </div>
                <p className="font-handwriting text-xs text-charcoal/45">14 February 2026</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Chocolate with Chat Beneath ──────────────────────────────────────
// The wrapper is already half-open. The conversation is already visible under it.
// No click needed. Just discovery.

function ChocolateArtifact({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 3 }}
      animate={{ opacity: 1, rotate: 3 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 200 }}
    >
      <div className="absolute -top-3 right-3 w-12 h-5 washi-tape -rotate-[3deg]" />

      {/* Chat printed on paper — shows below the wrapper */}
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm">
        {/* Wrapper — takes up top portion, leaves bottom open */}
        <div className="bg-[#4A2C0A] px-4 py-3" style={{ borderRadius: '2px 2px 0 0' }}>
          <div className="border border-[#C8924A]/35 px-3 py-2">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C8924A]/70 text-center leading-none mb-0.5">Dark</p>
            <p className="font-display text-sm text-[#F0D08A] text-center">Chocolate</p>
          </div>
          {/* Lifted corner effect */}
          <div className="flex justify-end mt-1">
            <div className="w-8 h-px bg-[#C8924A]/20" />
          </div>
        </div>

        {/* Chat showing beneath */}
        <div className="px-3 py-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
          <p className="text-[9px] tracking-widest uppercase text-charcoal/28 mb-2 font-sans">15 February 2026</p>
          <div className="flex justify-end">
            <div className="bg-[#DCF8C6] px-2 py-1 rounded-lg rounded-tr-sm text-[11px] text-[#111] max-w-[80%]">
              I think dark chocolate... you?
              <span className="ml-1 text-[8px] text-green-600/50">✓✓</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Recipe Card ──────────────────────────────────────────────────────
// Just sits there. No flip. You read it and feel it.

function RecipeArtifact({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -1.5 }}
      animate={{ opacity: 1, rotate: -1.5 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 172 }}
    >
      <div className="absolute -top-3 left-4 w-12 h-5 washi-tape rotate-[2deg]" />
      <div className="bg-[#FEFCE8] border border-[#D4C89A]/50 px-5 py-4 shadow-sm">
        <p className="font-handwriting text-sm text-coffee/65 text-center mb-2 border-b border-charcoal/10 pb-2">
          Recipe for Us
        </p>
        <ul className="space-y-1">
          {['Love', 'Giggles', 'Cooking', 'Cuddles'].map(i => (
            <li key={i} className="font-letter text-xs text-charcoal/65 flex items-center gap-1.5">
              <span className="text-golden/50 text-xs">✦</span> {i}
            </li>
          ))}
        </ul>
        <p className="font-quote text-[10px] text-charcoal/45 italic mt-3 leading-snug">
          "We both in kitchen cuddling giggling and cooking..."
        </p>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Sticky Note ──────────────────────────────────────────────────────

function StickyArtifact({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 4 }}
      animate={{ opacity: 1, rotate: 4 }}
      transition={{ delay, duration: 0.9 }}
      style={{ width: 176 }}
    >
      <div className="bg-[#FEF08A] px-4 py-4 shadow-md">
        <p className="font-handwriting text-[10px] text-charcoal/35 mb-1.5">20 February 2026</p>
        <p className="font-letter text-xs text-charcoal/80 leading-snug">
          "I think I'll stop using my brain when I'm with you 😂"
        </p>
        <p className="font-handwriting text-[10px] text-charcoal/38 mt-2 text-right">— Meghana</p>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Campus Doodle ────────────────────────────────────────────────────

function CampusDoodle({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 1 }}
      animate={{ opacity: 1, rotate: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 160 }}
    >
      <div className="absolute -top-3 left-3 w-12 h-5 washi-tape -rotate-[1deg]" />
      <div className="bg-[#F5F0E8] border border-charcoal/12 p-2 shadow-sm">
        <p className="font-handwriting text-[9px] text-charcoal/35 text-center mb-1">16 February 2026</p>
        <svg viewBox="0 0 150 90" width="100%" className="block">
          {/* faint grid */}
          {[20, 45, 70].map(y => (
            <line key={y} x1="0" y1={y} x2="150" y2={y} stroke="#B8A88A" strokeWidth="0.4" opacity="0.35" strokeDasharray="3 5" />
          ))}
          {/* Buildings */}
          <rect x="5" y="10" width="38" height="28" rx="2" fill="#E8DDD0" stroke="#B8A88A" strokeWidth="1" />
          <text x="24" y="28" textAnchor="middle" fontSize="6" fill="#7C6A4F" fontFamily="Georgia,serif">College</text>
          <rect x="95" y="50" width="48" height="32" rx="2" fill="#E8DDD0" stroke="#B8A88A" strokeWidth="1" />
          <text x="119" y="70" textAnchor="middle" fontSize="6" fill="#7C6A4F" fontFamily="Georgia,serif">Canteen</text>
          {/* Path */}
          <motion.path
            d="M 24 38 Q 55 60 80 68 Q 90 72 100 66"
            fill="none" stroke="#D4844A" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.6, duration: 1.4, ease: 'easeOut' }}
          />
          {/* Marker */}
          <circle cx="100" cy="66" r="4.5" fill="#D4844A" opacity="0.8" />
          <circle cx="100" cy="66" r="2" fill="white" />
          <text x="100" y="84" textAnchor="middle" fontSize="5.5" fill="#7C6A4F" fontFamily="Georgia,serif">Entrance</text>
        </svg>
        <p className="font-handwriting text-[9px] text-charcoal/38 text-center mt-1 italic">
          "Come to canteen entrance."
        </p>
      </div>
    </motion.div>
  );
}

// ─── INTERACTIVE 2: Sikkina Unde ─────────────────────────────────────────────
// Already slightly opened. Tap to pull the paper back.

function SikkinaUnde({ delay }: { delay: number }) {
  const [pulled, setPulled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2 }}
      animate={{ opacity: 1, rotate: -2 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 192 }}
    >
      <div className="absolute -top-3 left-5 w-14 h-5 washi-tape rotate-[1deg]" />
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm overflow-hidden">
        <p className="font-handwriting text-[9px] text-charcoal/32 text-center pt-3 pb-1">23 February 2026</p>

        {/* The slightly-open candy wrapper */}
        <div
          className="relative mx-auto my-2 cursor-pointer"
          style={{ width: 120, height: 80 }}
          onClick={() => setPulled(v => !v)}
          role="button"
          tabIndex={0}
          aria-label={pulled ? 'Close sweet wrapper' : 'Pull open sweet wrapper'}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPulled(v => !v); } }}
        >
          {/* Note beneath (always visible, partially covered) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FEFCE8] border border-[#D4C89A]/40 px-3 py-2">
            <AnimatePresence>
              {pulled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-center"
                >
                  <p className="font-handwriting text-xs text-coffee/70 leading-snug">
                    "From this day...<br />you became Bangara."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wrapper on top — peels back */}
          <motion.div
            className="absolute inset-0 origin-bottom"
            animate={{ scaleY: pulled ? 0.08 : 0.72 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg viewBox="0 0 120 80" width="120" height="80">
              {/* Twist ends */}
              <ellipse cx="7" cy="40" rx="7" ry="14" fill="#C8924A" opacity="0.6" />
              <ellipse cx="113" cy="40" rx="7" ry="14" fill="#C8924A" opacity="0.6" />
              {/* Body */}
              <rect x="12" y="12" width="96" height="56" rx="12" fill="#E8A84A" />
              <rect x="18" y="18" width="84" height="44" rx="10" fill="#F0B84A" />
              {/* Shine */}
              <ellipse cx="50" cy="26" rx="18" ry="6" fill="white" opacity="0.2" />
              {/* Label */}
              <text x="60" y="44" textAnchor="middle" fontSize="10" fill="#7C4A0A" fontFamily="Georgia,serif">Sikkina Unde</text>
              {/* Hint text — visible only when not pulled */}
              <text x="60" y="58" textAnchor="middle" fontSize="7" fill="#7C4A0A" fontFamily="Georgia,serif" opacity="0.5">pull ↑</text>
            </svg>
          </motion.div>
        </div>

        <AnimatePresence>
          {pulled && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-sans text-[9px] tracking-widest uppercase text-charcoal/28 text-center pb-3"
            >
              A small sweet. A big nickname.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── STATIC: 26 Feb Note ─────────────────────────────────────────────────────

function FebQuoteNote({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 3.5 }}
      animate={{ opacity: 1, rotate: 3.5 }}
      transition={{ delay, duration: 0.9 }}
      style={{ width: 168 }}
    >
      <div className="absolute -top-3 right-3 w-12 h-5 washi-tape -rotate-[2deg]" />
      <div className="bg-[#F9F6F0] border border-charcoal/10 px-4 py-3 shadow-sm">
        <p className="font-handwriting text-[9px] text-charcoal/32 mb-2">26 February 2026</p>
        <p className="font-quote text-xs text-charcoal/65 italic leading-relaxed">
          "The kiss was so good good good good good"
        </p>
      </div>
    </motion.div>
  );
}

// ─── INTERACTIVE 3: Forgot the Hug ───────────────────────────────────────────
// Empty. Silence. Then a whisper. Then the hug.

function ForgotHug() {
  const [phase, setPhase] = useState<'empty' | 'whisper' | 'hug'>('empty');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setPhase('whisper'), shouldReduceMotion ? 100 : 2000);
    return () => clearTimeout(t);
  }, [isInView, shouldReduceMotion]);

  return (
    <div ref={ref} className="text-center py-6">
      {/* Silent space */}
      <div className="h-6" />

      <AnimatePresence>
        {(phase === 'whisper' || phase === 'hug') && (
          <motion.div
            key="whisper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <button
              onClick={() => setPhase('hug')}
              disabled={phase === 'hug'}
              className="font-handwriting text-sm text-charcoal/38 hover:text-charcoal/55 transition-colors cursor-pointer bg-transparent border-none p-0 disabled:cursor-default"
              aria-label="Reveal the forgotten hug"
            >
              "You forgot something..."
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'hug' && (
          <motion.div
            key="hug"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="mt-5"
          >
            {/* Hug illustration */}
            <svg viewBox="0 0 130 75" width="130" height="75" className="mx-auto mb-3"
              aria-label="Two figures hugging">
              {/* Her */}
              <circle cx="42" cy="17" r="9" fill="none" stroke="#7C6A4F" strokeWidth="1.4" />
              <path d="M42 26 L42 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M42 37 Q32 33 28 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M42 37 Q55 31 65 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M34 50 Q42 62 50 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              {/* Him */}
              <circle cx="88" cy="17" r="9" fill="none" stroke="#7C6A4F" strokeWidth="1.4" />
              <path d="M88 26 L88 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M88 37 Q75 31 65 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M88 37 Q98 33 102 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M80 50 Q88 62 96 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              {/* Heart */}
              <text x="65" y="42" textAnchor="middle" fontSize="11" fill="#C87070" opacity="0.6">♥</text>
            </svg>

            <p className="font-quote text-sm text-charcoal/60 italic">
              "You missed something while going."
            </p>
            <p className="font-handwriting text-xs text-charcoal/32 mt-1">— 27 February 2026</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Chapter Two ──────────────────────────────────────────────────────────────

export default function ChapterTwo({ onNext, onPrev }: ChapterProps) {
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 bg-soft-beige w-full h-full overflow-y-auto overflow-x-hidden paper-texture"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FFF6EC]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 flex flex-col py-8 z-10 relative">

          {/* Background: coffee stain */}
          <div
            className="absolute top-24 left-2 w-16 h-16 rounded-full border-2 border-[#C8924A]/12 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 5px rgba(200,146,74,0.05)' }}
            aria-hidden="true"
          />
          {/* Paper clip */}
          <svg className="absolute top-56 left-1 opacity-18 pointer-events-none" width="14" height="38" viewBox="0 0 14 38" aria-hidden="true">
            <path d="M7 2 Q13 2 13 8 L13 30 Q13 36 7 36 Q1 36 1 30 L1 10 Q1 6 4 6 Q7 6 7 10 L7 28 Q7 32 5 32" fill="none" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {/* Flower */}
          <div className="absolute bottom-44 left-2 text-base opacity-18 pointer-events-none" aria-hidden="true">🌸</div>
          {/* Bus ticket stub */}
          <div className="absolute bottom-24 left-0 w-7 h-14 bg-[#E8DDD0] border border-[#C8B8A8]/25 opacity-14 pointer-events-none"
            style={{ rotate: '5deg' }} aria-hidden="true">
            <div className="w-full h-2.5 bg-[#C8924A]/20 mt-2" />
          </div>

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="mb-8">
            <p className="font-sans text-xs tracking-[0.38em] uppercase text-brown/38 mb-2">Chapter Two</p>
            <p className="font-handwriting text-xl text-coffee/48 mb-1">February 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-coffee font-light leading-snug">
              The Days We Couldn't<br />Stop Smiling
            </h2>
            <motion.svg className="w-40 h-4 mt-2" viewBox="0 0 160 12" aria-hidden="true">
              <motion.path d="M 0 8 C 35 3, 80 11, 120 6 S 150 9, 160 7"
                fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }} />
            </motion.svg>
          </motion.div>

          {/* Date timeline — minimal */}
          <div className="space-y-0.5 flex-1">
            <DateDivider date="14 February 2026" delay={0.8} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/42 pl-2 pb-3">The first one.</motion.p>

            <DateDivider date="15 February 2026" delay={1.4} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 1 }}
              className="pl-2 pb-3 space-y-0.5">
              <p className="font-handwriting text-sm text-charcoal/38">She said dark chocolate.</p>
              <p className="font-handwriting text-sm text-charcoal/32 italic">Then she dreamed of a kitchen.</p>
            </motion.div>

            <DateDivider date="16 February 2026" delay={2.0} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/38 pl-2 pb-3">4:30 PM at the canteen entrance.</motion.p>

            <DateDivider date="20 February 2026" delay={2.6} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/35 pl-2 pb-3 italic">She stopped using her brain.<br />It's fine. Same.</motion.p>

            <DateDivider date="23 February 2026" delay={3.2} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}
              className="pl-2 pb-3">
              <p className="font-handwriting text-sm text-charcoal/38">Sikkina Unde.</p>
              <p className="font-handwriting text-sm text-coffee/55">Bangara.</p>
            </motion.div>

            <DateDivider date="26 February 2026" delay={3.8} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.1, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/35 pl-2 pb-3 italic">"...so good good good good good."</motion.p>

            <DateDivider date="27 February 2026" delay={4.4} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.7, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/30 pl-2 italic">Something was forgotten.</motion.p>
          </div>

          {/* Closing */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5, duration: 2 }}
            className="mt-10 border-t border-charcoal/10 pt-6">
            <p className="font-quote text-base text-charcoal/52 leading-loose italic">
              February was over.<br />Somehow,<br />it already felt like home.
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-4">
            <button onClick={onPrev} className="font-sans text-xs text-charcoal/35 hover:text-coffee transition-colors tracking-widest uppercase">← Chapter One</button>
            <button onClick={onNext} className="font-sans text-xs text-charcoal/45 hover:text-coffee transition-colors tracking-widest uppercase">Next →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE — organic scrapbook spread ════════════ */}
        <div className="flex-1 md:pl-12 py-8">

          {/* Desktop: organic scatter layout */}
          <div className="hidden md:block relative" style={{ minHeight: 740 }}>
            {/* Envelope — top left */}
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
              <EnvelopeCard delay={0.9} />
            </div>
            {/* Chocolate — top right, overlapping slightly */}
            <div style={{ position: 'absolute', top: 12, left: 230 }}>
              <ChocolateArtifact delay={1.3} />
            </div>
            {/* Recipe card — left, mid */}
            <div style={{ position: 'absolute', top: 200, left: 10 }}>
              <RecipeArtifact delay={1.8} />
            </div>
            {/* Sticky note — right, mid-high */}
            <div style={{ position: 'absolute', top: 160, left: 230 }}>
              <StickyArtifact delay={2.2} />
            </div>
            {/* Campus doodle — left lower */}
            <div style={{ position: 'absolute', top: 390, left: 20 }}>
              <CampusDoodle delay={2.6} />
            </div>
            {/* Sikkina Unde — right lower */}
            <div style={{ position: 'absolute', top: 350, left: 200 }}>
              <SikkinaUnde delay={3.0} />
            </div>
            {/* 26 Feb quote — overlapping lower right */}
            <div style={{ position: 'absolute', top: 555, left: 190 }} className="relative">
              <FebQuoteNote delay={3.6} />
            </div>
            {/* Forgot Hug — bottom center */}
            <div style={{ position: 'absolute', top: 560, left: 0, right: 0 }}>
              <ForgotHug />
            </div>
          </div>

          {/* Mobile: natural flow */}
          <div className="flex flex-col gap-7 md:hidden">
            <EnvelopeCard delay={0.9} />
            <ChocolateArtifact delay={1.2} />
            <RecipeArtifact delay={1.5} />
            <StickyArtifact delay={1.8} />
            <CampusDoodle delay={2.1} />
            <SikkinaUnde delay={2.4} />
            <FebQuoteNote delay={2.7} />
            <ForgotHug />
          </div>

        </div>
      </div>
    </motion.div>
  );
}
