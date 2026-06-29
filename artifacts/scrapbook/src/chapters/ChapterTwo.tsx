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

// ─── 1. Envelope — First Kiss ─────────────────────────────────────────────────

function EnvelopeCard({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ delay, duration: 0.9 }}
      className="relative inline-block"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 washi-tape" />

      {/* Envelope shell */}
      <div
        className="relative w-60 bg-[#FDF6E8] border border-[#D4C4A8]/60 shadow-md overflow-hidden cursor-pointer"
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Close envelope' : 'Open envelope — First Kiss'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        {/* Flap */}
        <motion.div
          className="w-full origin-top pointer-events-none"
          animate={{ scaleY: opened ? 0 : 1, opacity: opened ? 0 : 1 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg viewBox="0 0 240 56" width="100%" className="block">
            <polygon points="0,0 120,50 240,0" fill="#F0E6CC" />
            <line x1="0" y1="0" x2="120" y2="50" stroke="#D4C4A8" strokeWidth="0.8" opacity="0.6" />
            <line x1="240" y1="0" x2="120" y2="50" stroke="#D4C4A8" strokeWidth="0.8" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="px-5 py-4 min-h-[72px] relative">
          {/* V-fold lines on sides */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 80">
            <line x1="0" y1="80" x2="120" y2="0" stroke="#D4C4A8" strokeWidth="0.6" opacity="0.4" />
            <line x1="240" y1="80" x2="120" y2="0" stroke="#D4C4A8" strokeWidth="0.6" opacity="0.4" />
          </svg>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.p
                key="hint"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-handwriting text-sm text-charcoal/35 text-center pt-2"
              >
                tap to open ↑
              </motion.p>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative text-center"
              >
                {/* Lipstick mark */}
                <span className="absolute -top-1 right-0 text-xl" style={{ transform: 'rotate(15deg)' }} aria-hidden="true">💋</span>
                <p className="font-handwriting text-xs text-charcoal/40 mb-1">14 February 2026</p>
                <p className="font-quote text-sm text-charcoal/70 italic leading-snug">
                  The first one.
                </p>
                <p className="font-handwriting text-xs text-charcoal/38 mt-2 italic">
                  ...and the memory of it lasted for days.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── 2. Chocolate Wrapper ─────────────────────────────────────────────────────

function ChocolateWrapper({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ delay, duration: 0.9 }}
      className="relative inline-block"
    >
      <div className="absolute -top-3 right-4 w-12 h-5 washi-tape -rotate-[3deg]" />

      <motion.div
        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.14)' }}
        className="w-52 cursor-pointer"
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Close chocolate wrapper' : 'Open chocolate wrapper'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        {/* Wrapper */}
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="wrapper"
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#4A2C0A] px-4 py-3 rounded-sm shadow-md"
              style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.12), 0 3px 10px rgba(0,0,0,0.18)' }}
            >
              <div className="border border-[#C8924A]/40 px-3 py-2.5">
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#C8924A]/80 text-center mb-0.5">Dark</p>
                <p className="font-display text-base text-[#F0D08A] text-center">Chocolate</p>
                <p className="font-handwriting text-[10px] text-[#C8924A]/50 text-center mt-1">15 February 2026</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#F9F6F0] border border-charcoal/10 px-4 py-4 shadow-sm"
            >
              <p className="font-handwriting text-xs text-charcoal/38 mb-2 text-center">15 Feb — real conversation</p>
              <p className="font-quote text-sm text-charcoal/75 italic leading-relaxed text-center">
                "I think dark chocolate... you?"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── 3. Recipe Card (flip) ────────────────────────────────────────────────────

function RecipeCard({ delay }: { delay: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ delay, duration: 0.9 }}
      className="relative"
      style={{ perspective: 700 }}
    >
      <div className="absolute -top-3 left-4 w-12 h-5 washi-tape rotate-[2deg]" />

      <motion.div
        className="relative w-52 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        onClick={() => setFlipped(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Flip recipe card back' : 'Flip recipe card'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(v => !v); } }}
      >
        {/* Front */}
        <div
          className="bg-[#FEFCE8] border border-[#D4C89A]/50 px-5 py-5 shadow-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="font-handwriting text-base text-coffee/70 text-center mb-3 border-b border-charcoal/10 pb-2">
            Recipe for Us
          </p>
          <ul className="space-y-1.5">
            {['Love', 'Giggles', 'Cooking', 'Cuddles'].map(i => (
              <li key={i} className="font-letter text-sm text-charcoal/70 flex items-center gap-2">
                <span className="text-golden/60">✦</span> {i}
              </li>
            ))}
          </ul>
          <p className="font-handwriting text-[10px] text-charcoal/30 text-right mt-3 italic">flip →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-[#FEFCE8] border border-[#D4C89A]/50 px-5 py-5 shadow-sm flex flex-col justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="font-quote text-sm text-charcoal/75 italic leading-relaxed text-center">
            "We both in kitchen cuddling giggling and cooking..."
          </p>
          <p className="font-handwriting text-[10px] text-charcoal/35 text-right mt-3">— her message</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── 4. Campus Map — Canteen Entrance ─────────────────────────────────────────

function CampusMap({ delay }: { delay: number }) {
  const [markerClicked, setMarkerClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 1 }}
      transition={{ delay, duration: 0.9 }}
      className="relative"
    >
      <div className="absolute -top-3 left-3 w-14 h-5 washi-tape -rotate-[1deg]" />

      <div className="bg-[#F5F0E8] border border-charcoal/12 p-3 shadow-sm w-52">
        <p className="font-handwriting text-[10px] text-charcoal/35 mb-2 text-center tracking-wide">16 February 2026</p>

        {/* Hand-drawn map SVG */}
        <svg viewBox="0 0 200 130" width="100%" className="block">
          {/* Grid lines — faint pencil look */}
          {[30, 60, 90, 120].map(y => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#B8A88A" strokeWidth="0.4" opacity="0.4" strokeDasharray="4 6" />
          ))}
          {[40, 80, 120, 160].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="130" stroke="#B8A88A" strokeWidth="0.4" opacity="0.4" strokeDasharray="4 6" />
          ))}

          {/* Buildings */}
          <rect x="10" y="15" width="50" height="35" rx="2" fill="#E8DDD0" stroke="#B8A88A" strokeWidth="1" />
          <text x="35" y="37" textAnchor="middle" fontSize="7" fill="#7C6A4F" fontFamily="Georgia, serif">College</text>

          <rect x="130" y="70" width="55" height="40" rx="2" fill="#E8DDD0" stroke="#B8A88A" strokeWidth="1" />
          <text x="157" y="94" textAnchor="middle" fontSize="7" fill="#7C6A4F" fontFamily="Georgia, serif">Canteen</text>

          {/* Dashed path */}
          <motion.path
            d="M 35 50 Q 60 80 100 85 Q 120 88 140 85"
            fill="none"
            stroke="#D4844A"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.5, duration: 1.5, ease: 'easeOut' }}
          />

          {/* Canteen Entrance marker */}
          <motion.g
            style={{ cursor: 'pointer' }}
            whileHover={{ scale: 1.15 }}
            onClick={() => setMarkerClicked(v => !v)}
            role="button"
            aria-label="Open canteen entrance memory"
          >
            <circle cx="140" cy="80" r="7" fill="#D4844A" opacity="0.85" />
            <circle cx="140" cy="80" r="3" fill="white" />
            <text x="140" y="102" textAnchor="middle" fontSize="6" fill="#7C6A4F" fontFamily="Georgia, serif">Entrance</text>
          </motion.g>
        </svg>

        {/* Revealed conversation */}
        <AnimatePresence>
          {markerClicked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-2 pt-2 border-t border-charcoal/10 overflow-hidden"
            >
              <p className="font-handwriting text-xs text-charcoal/35 mb-1">4:30 PM</p>
              <p className="font-quote text-xs text-charcoal/65 italic leading-snug">
                "Come to canteen entrance."
              </p>
              <p className="font-handwriting text-[10px] text-charcoal/30 mt-1 italic">
                And you came.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── 5. Brain Sticky Note ─────────────────────────────────────────────────────

function BrainStickyNote({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -3, y: 8 }}
      animate={{ opacity: 1, rotate: -3, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="inline-block"
    >
      <div className="bg-[#FEF08A] px-5 py-4 shadow-md max-w-[220px]">
        <p className="font-handwriting text-[10px] text-charcoal/35 mb-2">20 February 2026</p>
        <p className="font-letter text-sm text-charcoal/85 leading-snug">
          "I think I'll stop using my brain when I'm with you 😂"
        </p>
        <p className="font-handwriting text-xs text-charcoal/38 mt-2 text-right italic">
          — Meghana
        </p>
      </div>
    </motion.div>
  );
}

// ─── 6. Sikkina Unde + Bangara ────────────────────────────────────────────────

function SikkinaUnde({ delay }: { delay: number }) {
  const [unwrapped, setUnwrapped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ delay, duration: 0.9 }}
      className="relative"
    >
      <div className="absolute -top-3 left-6 w-14 h-5 washi-tape rotate-[1deg]" />

      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm p-4 w-52">
        <p className="font-handwriting text-[10px] text-charcoal/35 mb-3 text-center">23 February 2026</p>

        {/* Candy wrapper */}
        <div
          className="flex justify-center mb-3 cursor-pointer"
          onClick={() => setUnwrapped(v => !v)}
          role="button"
          tabIndex={0}
          aria-label={unwrapped ? 'Wrap sweet' : 'Unwrap Sikkina Unde'}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setUnwrapped(v => !v); } }}
        >
          <AnimatePresence mode="wait">
            {!unwrapped ? (
              <motion.div
                key="wrapped"
                initial={{ scale: 1 }}
                exit={{ scale: 0, rotate: 20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Sweet SVG */}
                <svg viewBox="0 0 80 50" width="80" height="50">
                  {/* Twist ends */}
                  <ellipse cx="8" cy="25" rx="8" ry="5" fill="#C8924A" opacity="0.7" />
                  <ellipse cx="72" cy="25" rx="8" ry="5" fill="#C8924A" opacity="0.7" />
                  {/* Body */}
                  <rect x="14" y="10" width="52" height="30" rx="8" fill="#E8A84A" />
                  <rect x="18" y="14" width="44" height="22" rx="6" fill="#F0B84A" />
                  {/* Shine */}
                  <ellipse cx="32" cy="18" rx="8" ry="3" fill="white" opacity="0.25" />
                  {/* Label */}
                  <text x="40" y="28" textAnchor="middle" fontSize="6.5" fill="#7C4A0A" fontFamily="Georgia, serif">tap ↑</text>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="unwrapped"
                initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <svg viewBox="0 0 60 60" width="60" height="60">
                  {/* Sweet ball */}
                  <circle cx="30" cy="30" r="26" fill="#E8A84A" />
                  <circle cx="30" cy="30" r="20" fill="#F0B84A" />
                  <ellipse cx="22" cy="22" rx="8" ry="5" fill="white" opacity="0.2" />
                  <text x="30" y="34" textAnchor="middle" fontSize="16">🍬</text>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {unwrapped && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-center"
            >
              <p className="font-sans text-[10px] tracking-widest uppercase text-charcoal/30 mb-1">Sikkina Unde</p>
              <p className="font-quote text-xs text-charcoal/60 italic leading-snug mb-2">
                A small sweet. A big nickname.
              </p>
              <p className="font-handwriting text-sm text-coffee/70 leading-snug">
                "From that day...<br />you became Bangara."
              </p>
            </motion.div>
          )}
          {!unwrapped && (
            <motion.p
              key="label"
              exit={{ opacity: 0 }}
              className="font-handwriting text-xs text-charcoal/35 text-center italic"
            >
              Sikkina Unde
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── 7. Forgot the Hug ────────────────────────────────────────────────────────

function ForgotHug({ delay }: { delay: number }) {
  const [textVisible, setTextVisible] = useState(false);
  const [hugVisible, setHugVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setTextVisible(true), shouldReduceMotion ? 100 : 2000);
    return () => clearTimeout(t);
  }, [isInView, shouldReduceMotion]);

  return (
    <div ref={ref} className="w-full">
      {/* Empty space — silence does the work */}
      <div className="h-8" />

      <AnimatePresence>
        {textVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
            className="text-center"
          >
            <button
              onClick={() => setHugVisible(v => !v)}
              className="font-handwriting text-base text-charcoal/40 hover:text-charcoal/60 transition-colors cursor-pointer bg-transparent border-none p-0"
              aria-label="Reveal the forgot hug memory"
            >
              "You forgot something..."
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hugVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-5 text-center"
          >
            {/* Hug illustration */}
            <svg viewBox="0 0 120 70" width="120" height="70" className="mx-auto mb-3" aria-label="Two figures hugging">
              {/* Figure 1 (her) */}
              <circle cx="40" cy="18" r="9" fill="none" stroke="#7C6A4F" strokeWidth="1.5" />
              <path d="M40 27 L40 50" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M40 38 Q30 34 26 38" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M40 38 Q52 32 60 38" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M32 50 Q40 60 48 50" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Figure 2 (him) */}
              <circle cx="80" cy="18" r="9" fill="none" stroke="#7C6A4F" strokeWidth="1.5" />
              <path d="M80 27 L80 50" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M80 38 Q68 32 60 38" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M80 38 Q90 34 94 38" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M72 50 Q80 60 88 50" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Heart between them */}
              <text x="60" y="43" textAnchor="middle" fontSize="10" fill="#C87070" opacity="0.7">♥</text>
            </svg>

            <p className="font-quote text-sm text-charcoal/65 italic leading-snug">
              "You missed something while going."
            </p>
            <p className="font-handwriting text-xs text-charcoal/35 mt-1 italic">
              — 27 February 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Background Decorations ───────────────────────────────────────────────────

function BackgroundDecorations() {
  return (
    <>
      {/* Coffee stain ring */}
      <div
        className="absolute top-28 left-4 w-14 h-14 rounded-full border-2 border-[#C8924A]/14 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 4px rgba(200,146,74,0.06)' }}
        aria-hidden="true"
      />
      {/* Paper clip */}
      <svg className="absolute top-52 left-2 opacity-20 pointer-events-none" width="16" height="40" viewBox="0 0 16 40" aria-hidden="true">
        <path d="M8 2 Q14 2 14 8 L14 32 Q14 38 8 38 Q2 38 2 32 L2 10 Q2 6 5 6 Q8 6 8 10 L8 30 Q8 34 6 34" fill="none" stroke="#7C6A4F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* Tiny flower */}
      <div className="absolute bottom-40 left-3 text-lg opacity-20 pointer-events-none" aria-hidden="true">🌸</div>
      {/* Bus ticket */}
      <div
        className="absolute bottom-20 left-1 w-8 h-16 bg-[#E8DDD0] border border-[#C8B8A8]/30 opacity-15 pointer-events-none"
        style={{ rotate: '4deg' }}
        aria-hidden="true"
      >
        <div className="w-full h-3 bg-[#C8924A]/20 mt-2" />
        <div className="w-3/4 h-px bg-charcoal/10 mt-1 mx-auto" />
        <div className="w-3/4 h-px bg-charcoal/10 mt-1 mx-auto" />
      </div>
    </>
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
      {/* Ambient warm light */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FFF6EC]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 flex flex-col py-8 z-10 relative">
          <BackgroundDecorations />

          {/* Chapter header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-8"
          >
            <p className="font-sans text-xs tracking-[0.38em] uppercase text-brown/38 mb-2">Chapter Two</p>
            <p className="font-handwriting text-xl text-coffee/50 mb-1">February 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-coffee font-light leading-snug">
              The Days We Couldn't<br />Stop Smiling
            </h2>
            <motion.svg className="w-44 h-4 mt-2" viewBox="0 0 180 12" aria-hidden="true">
              <motion.path
                d="M 0 8 C 40 3, 90 11, 130 6 S 165 9, 180 7"
                fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }}
              />
            </motion.svg>
          </motion.div>

          {/* Timeline — dates with tiny notes */}
          <div className="space-y-1 flex-1">

            <DateDivider date="14 February 2026" delay={0.8} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/45 pl-2 mb-2">
              The first one.
            </motion.p>

            <DateDivider date="15 February 2026" delay={1.4} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 1 }}
              className="pl-2 mb-2 space-y-0.5">
              <p className="font-handwriting text-sm text-charcoal/40">She said dark chocolate.</p>
              <p className="font-handwriting text-sm text-charcoal/35 italic">Then she dreamed of a kitchen.</p>
            </motion.div>

            <DateDivider date="16 February 2026" delay={2.0} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/40 pl-2 mb-2">
              4:30 PM at the canteen entrance.
            </motion.p>

            <DateDivider date="20 February 2026" delay={2.6} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/38 pl-2 mb-2 italic">
              She stopped using her brain. It's fine. Same.
            </motion.p>

            <DateDivider date="23 February 2026" delay={3.2} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}
              className="pl-2 mb-2 space-y-0.5">
              <p className="font-handwriting text-sm text-charcoal/40">Sikkina Unde.</p>
              <p className="font-handwriting text-sm text-coffee/55">Bangara.</p>
            </motion.div>

            <DateDivider date="26 February 2026" delay={3.8} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.1, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/38 pl-2 mb-2 italic">
              "...so good good good good good."
            </motion.p>

            <DateDivider date="27 February 2026" delay={4.4} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.7, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/35 pl-2 italic">
              Something was forgotten.
            </motion.p>
          </div>

          {/* Closing line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 2 }}
            className="mt-10 border-t border-charcoal/10 pt-6"
          >
            <p className="font-quote text-base text-charcoal/55 leading-loose italic">
              February was over.<br />
              Somehow,<br />
              it already felt like home.
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-4">
            <button onClick={onPrev} className="font-sans text-xs text-charcoal/35 hover:text-coffee transition-colors tracking-widest uppercase">
              ← Chapter One
            </button>
            <button onClick={onNext} className="font-sans text-xs text-charcoal/45 hover:text-coffee transition-colors tracking-widest uppercase">
              Next →
            </button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE ═══════════ */}
        <div className="flex-1 md:pl-12 flex flex-col py-8 gap-7">

          {/* Row 1 */}
          <div className="flex flex-wrap gap-5 items-start">
            <EnvelopeCard delay={1.0} />
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap gap-5 items-start">
            <ChocolateWrapper delay={1.6} />
            <RecipeCard delay={2.0} />
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap gap-5 items-start">
            <CampusMap delay={2.4} />
            <BrainStickyNote delay={2.8} />
          </div>

          {/* Row 4 */}
          <div className="flex flex-wrap gap-5 items-start">
            <SikkinaUnde delay={3.4} />

            {/* 26 Feb quote card */}
            <motion.div
              initial={{ opacity: 0, rotate: 1.5, y: 8 }}
              animate={{ opacity: 1, rotate: 1.5, y: 0 }}
              transition={{ delay: 3.8, duration: 0.9 }}
              className="relative max-w-[200px]"
            >
              <div className="absolute -top-3 left-4 w-12 h-5 washi-tape -rotate-[2deg]" />
              <div className="bg-[#F9F6F0] border border-charcoal/10 px-4 py-4 shadow-sm">
                <p className="font-handwriting text-[10px] text-charcoal/35 mb-2">26 Feb</p>
                <p className="font-quote text-sm text-charcoal/70 italic leading-relaxed">
                  "The kiss was so good good good good good"
                </p>
              </div>
            </motion.div>
          </div>

          {/* Row 5 — Forgot the Hug */}
          <div className="border-t border-charcoal/8 pt-6">
            <ForgotHug delay={4.5} />
          </div>

        </div>
      </div>
    </motion.div>
  );
}
