import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import { chapter6Data, SealedLetter } from '../data/chapters/chapter6';

// ─── Stable seeded random ────────────────────────────────────────────────────
function sr(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Page variants ───────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, filter: 'blur(6px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit:    { opacity: 0, filter: 'blur(8px)' },
};

// ─── Star field ──────────────────────────────────────────────────────────────
function StarField({
  count,
  specialIndex,
  onSpecialClick,
  shotFired,
}: {
  count: number;
  specialIndex: number;
  onSpecialClick: () => void;
  shotFired: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: sr(i * 7) * 100,
        y: sr(i * 11) * 75,
        size: sr(i * 3) < 0.7 ? 1.5 : sr(i * 3) < 0.9 ? 2.5 : 3.5,
        opacity: 0.3 + sr(i * 5) * 0.7,
        delay: sr(i * 13) * 4,
        dur: 2.5 + sr(i * 17) * 3,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden={!shotFired}>
      {stars.map((s, i) => {
        const isSpecial = i === specialIndex;
        return (
          <motion.div
            key={s.id}
            className={`absolute rounded-full ${isSpecial ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: isSpecial ? 7 : s.size,
              height: isSpecial ? 7 : s.size,
              backgroundColor: isSpecial ? '#FFD700' : 'white',
              boxShadow: isSpecial ? '0 0 8px 3px rgba(255,215,0,0.5)' : 'none',
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [s.opacity, s.opacity * 0.25, s.opacity],
                    scale: [1, 0.7, 1],
                  }
            }
            transition={{
              duration: s.dur,
              repeat: Infinity,
              delay: s.delay,
              ease: 'easeInOut',
            }}
            onClick={isSpecial ? onSpecialClick : undefined}
            role={isSpecial ? 'button' : undefined}
            tabIndex={isSpecial ? 0 : undefined}
            aria-label={isSpecial ? 'A special star — click it' : undefined}
            onKeyDown={
              isSpecial
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSpecialClick();
                    }
                  }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}

// ─── Shooting-star animation ─────────────────────────────────────────────────
function ShootingStar({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{ top: '18%', left: '55%' }}
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{ x: 260, y: 140, opacity: 0 }}
      transition={{ duration: 1.1, ease: 'easeIn' }}
      onAnimationComplete={onDone}
      aria-hidden="true"
    >
      <div
        className="h-px bg-gradient-to-r from-transparent via-yellow-200 to-white"
        style={{ width: 120, transform: 'rotate(30deg)', filter: 'blur(0.5px)' }}
      />
    </motion.div>
  );
}

// ─── Moon ────────────────────────────────────────────────────────────────────
function Moon() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute top-8 right-12 md:top-14 md:right-20 w-24 h-24 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at 35% 35%, #F8F5E8 0%, #D4CC9A 60%, #B8B070 100%)',
        boxShadow: '0 0 60px 20px rgba(240,238,228,0.15), 0 0 120px 40px rgba(240,238,228,0.07)',
      }}
      animate={shouldReduceMotion ? {} : { boxShadow: [
        '0 0 60px 20px rgba(240,238,228,0.15), 0 0 120px 40px rgba(240,238,228,0.07)',
        '0 0 80px 28px rgba(240,238,228,0.22), 0 0 160px 60px rgba(240,238,228,0.10)',
        '0 0 60px 20px rgba(240,238,228,0.15), 0 0 120px 40px rgba(240,238,228,0.07)',
      ]}}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {/* Craters */}
      <div className="absolute top-5 left-5 w-5 h-5 rounded-full bg-black/8 blur-sm" />
      <div className="absolute bottom-7 right-7 w-7 h-7 rounded-full bg-black/6 blur-sm" />
      <div className="absolute top-12 right-5 w-3 h-3 rounded-full bg-black/5 blur-[2px]" />
    </motion.div>
  );
}

// ─── Drifting clouds ─────────────────────────────────────────────────────────
function DriftingClouds() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;
  const clouds = [
    { y: '8%', w: 180, opacity: 0.055, dur: 90, delay: 0, start: '-20%' },
    { y: '22%', w: 260, opacity: 0.04, dur: 120, delay: 20, start: '-30%' },
    { y: '38%', w: 140, opacity: 0.045, dur: 80, delay: 40, start: '-15%' },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl bg-hope"
          style={{ top: c.y, width: c.w, height: c.w * 0.4, opacity: c.opacity, left: c.start }}
          animate={{ x: ['0%', '130vw'] }}
          transition={{ duration: c.dur, repeat: Infinity, delay: c.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

// ─── Rain ────────────────────────────────────────────────────────────────────
function Rain({ count = 28 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: sr(i * 9) * 100,
        dur: 1.6 + sr(i * 3) * 1.2,
        delay: sr(i * 7) * 3,
        opacity: 0.06 + sr(i * 11) * 0.10,
        height: 12 + sr(i * 5) * 14,
      })),
    [count]
  );

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute w-px bg-hope/30"
          style={{ left: `${d.left}%`, top: -20, height: d.height, opacity: d.opacity }}
          animate={{ y: ['0vh', '105vh'] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

// ─── Floating paper notes ────────────────────────────────────────────────────
function FloatingNotes() {
  const shouldReduceMotion = useReducedMotion();
  const { floatingNotes } = chapter6Data;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {floatingNotes.map((note) => (
        <motion.div
          key={note.id}
          className="absolute bg-[#1E2D44] border border-hope/10 px-2 py-1 shadow-sm"
          style={{ left: `${note.x}%`, top: `${note.y}%`, rotate: note.rotate }}
          animate={
            shouldReduceMotion
              ? {}
              : { y: [0, note.driftY, 0], opacity: [0.35, 0.6, 0.35] }
          }
          transition={{ duration: note.duration, repeat: Infinity, delay: note.delay, ease: 'easeInOut' }}
        >
          <p className="font-letter text-sm text-moonlight/50 whitespace-nowrap">{note.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Paper clip SVG ──────────────────────────────────────────────────────────
function PaperClip({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="48" viewBox="0 0 16 48" className={`opacity-50 ${className}`} aria-hidden="true">
      <path
        d="M 8 4 C 3 4 2 8 2 12 L 2 38 C 2 44 6 46 8 46 C 10 46 14 44 14 38 L 14 14 C 14 10 12 8 8 8 C 5 8 4 10 4 14 L 4 36 C 4 39 6 40 8 40 C 10 40 12 39 12 36 L 12 16"
        fill="none"
        stroke="#B8C9E1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Wax seal ────────────────────────────────────────────────────────────────
function WaxSeal({ color, glyph, broken, onClick }: {
  color: string;
  glyph: string;
  broken: boolean;
  onClick: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.button
      className="relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      style={{ backgroundColor: color, boxShadow: `0 0 0 3px ${color}44, 0 4px 12px rgba(0,0,0,0.4)` }}
      onClick={onClick}
      aria-label={broken ? 'Seal broken — letter open' : 'Click to break seal and open letter'}
      whileHover={shouldReduceMotion || broken ? {} : { scale: 1.08 }}
      transition={{ duration: 0.3 }}
      disabled={broken}
    >
      {/* Seal texture rings */}
      <div className="absolute inset-1 rounded-full border border-white/15" />
      <div className="absolute inset-2.5 rounded-full border border-white/10" />

      <AnimatePresence mode="wait">
        {!broken ? (
          <motion.span
            key="sealed"
            className="font-display text-xl text-white/90 font-bold select-none"
            exit={
              shouldReduceMotion
                ? {}
                : { scale: 1.6, opacity: 0, rotate: 20, transition: { duration: 0.35 } }
            }
          >
            {glyph}
          </motion.span>
        ) : (
          <motion.span
            key="broken"
            className="text-xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            ✦
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Sealed letter ───────────────────────────────────────────────────────────
function LetterCard({
  letter,
  index,
}: {
  letter: SealedLetter;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const delay = 0.4 + index * 0.25;

  return (
    <motion.div
      className="relative"
      style={{ marginLeft: letter.offset > 0 ? `${Math.min(letter.offset, 48)}px` : 0 }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Paper clip at top corner */}
      <PaperClip className="absolute -top-3 left-6 z-10" />

      {/* Letter envelope / card */}
      <div
        className="relative border border-hope/12 overflow-hidden"
        style={{ backgroundColor: '#1B2D42' }}
      >
        {/* Ink texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* Sealed state header */}
        <div className="flex items-center gap-4 p-5 pb-4">
          <WaxSeal
            color={letter.sealColor}
            glyph={letter.sealGlyph}
            broken={open}
            onClick={() => setOpen(true)}
          />
          <div className="flex-1 min-w-0">
            <p className="font-sans text-[10px] tracking-widest uppercase text-hope/35 mb-1">
              {open ? 'letter opened' : 'sealed letter'}
            </p>
            {!open && (
              <p className="font-letter text-lg text-moonlight/50 italic truncate">
                {letter.previewLine}
              </p>
            )}
            {open && (
              <motion.p
                className="font-sans text-[10px] text-hope/40 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                press Escape or click ✕ to fold
              </motion.p>
            )}
          </div>
          {open && (
            <button
              className="w-6 h-6 rounded-full border border-hope/20 text-hope/40 flex items-center justify-center text-xs hover:text-moonlight hover:border-hope/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope"
              onClick={() => setOpen(false)}
              aria-label="Close letter"
            >
              ✕
            </button>
          )}
        </div>

        {/* Unfolding letter body */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scaleY: 0.08, opacity: 0 }
              }
              animate={{ scaleY: 1, opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { scaleY: 0.08, opacity: 0 }
              }
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
            >
              {/* Fold crease line */}
              <div className="mx-5 border-t border-hope/10 mb-4" aria-hidden="true" />

              {/* Chat snippet */}
              <div className="px-5 pb-3 space-y-2" role="log" aria-label="Letter chat snippet">
                {letter.chatSnippet.map((line, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${line.speaker === 'me' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, x: line.speaker === 'me' ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  >
                    <div
                      className={`px-3 py-1.5 max-w-[80%] ${
                        line.speaker === 'me'
                          ? 'bg-hope/10 border border-hope/15 rounded-2xl rounded-tr-sm'
                          : 'bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm'
                      }`}
                    >
                      <p className="font-letter text-lg text-moonlight/80 leading-snug">{line.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Handwritten memory */}
              <motion.div
                className="mx-5 mb-5 pt-3 border-t border-hope/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.8 }}
              >
                {/* Ink line */}
                <svg className="w-full h-4 mb-2" viewBox="0 0 300 12" aria-hidden="true">
                  <motion.path
                    d="M 4 8 Q 75 3 150 8 Q 225 13 296 6"
                    fill="none"
                    stroke="#B8C9E1"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity={0.35}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  />
                </svg>
                <p className="font-letter text-lg text-moonlight/65 italic leading-relaxed">
                  "{letter.memory}"
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Secret letter modal ─────────────────────────────────────────────────────
function SecretLetterModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { secretLetter } = chapter6Data;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Secret letter"
    >
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-md" />

      <motion.div
        className="relative max-w-sm w-full border border-hope/15 overflow-hidden"
        style={{ backgroundColor: '#1B2D42', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Moon glow top accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(240,238,228,0.35), transparent)' }}
          aria-hidden="true"
        />

        <div className="p-8">
          {/* Star icon */}
          <motion.div
            className="text-2xl mb-4"
            animate={{ rotate: [0, 15, -10, 5, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, delay: 0.4 }}
            aria-hidden="true"
          >
            ✦
          </motion.div>

          <motion.p
            className="font-handwriting text-2xl text-moonlight mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
          >
            {secretLetter.title}
          </motion.p>

          {/* Ink divider */}
          <svg className="w-full h-4 mb-4" viewBox="0 0 280 12" aria-hidden="true">
            <motion.path
              d="M 4 8 Q 70 3 140 8 Q 210 13 276 6"
              fill="none"
              stroke="#B8C9E1"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>

          <motion.p
            className="font-letter text-xl text-moonlight/75 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 1 }}
          >
            {secretLetter.body}
          </motion.p>

          {/* Second ink line */}
          <svg className="w-full h-4 mb-3" viewBox="0 0 280 12" aria-hidden="true">
            <motion.path
              d="M 4 8 C 60 5, 120 10, 180 7 S 240 9, 276 6"
              fill="none"
              stroke="#B8C9E1"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity={0.25}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.9, ease: 'easeOut' }}
            />
          </svg>

          <motion.p
            className="font-handwriting text-xl text-hope/70 italic text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {secretLetter.signOff}
          </motion.p>
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 border border-hope/20 text-hope/40 flex items-center justify-center rounded-full text-sm hover:text-moonlight hover:border-hope/50 transition-colors duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          aria-label="Close letter"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ChapterSix({ onNext, onPrev }: ChapterProps) {
  const [shotFired, setShotFired] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [starFound, setStarFound] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { letters, pullQuote, attribution, moonMessage } = chapter6Data;

  const SPECIAL_STAR_INDEX = 23;

  const handleSpecialStar = () => {
    if (shotFired) return;
    setShotFired(true);
    setStarFound(true);
  };

  return (
    <>
      <motion.div
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-background text-foreground"
        variants={shouldReduceMotion ? {} : pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        aria-label="Chapter Six: The Nights We Never Forgot"
      >
        {/* Background atmosphere layers */}
        <Moon />
        <StarField
          count={55}
          specialIndex={SPECIAL_STAR_INDEX}
          onSpecialClick={handleSpecialStar}
          shotFired={shotFired}
        />
        <DriftingClouds />
        <Rain count={32} />
        <FloatingNotes />

        {/* Ink texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-0 min-h-full">

          {/* ═══════════ LEFT PAGE ═══════════ */}
          <div className="flex-1 lg:border-r lg:border-hope/8 lg:pr-10 flex flex-col gap-6 pb-8 lg:pb-0">

            {/* Chapter header */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.4, ease: 'easeOut' }}
            >
              <p className="font-sans text-xs tracking-[0.38em] uppercase text-hope/30 mb-1">
                {chapter6Data.chapterNumber}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-moonlight leading-tight font-light">
                {chapter6Data.title}
              </h2>
              {/* Moonlit drawn line */}
              <motion.svg className="w-56 h-5 mt-1" viewBox="0 0 230 14" aria-hidden="true">
                <motion.path
                  d="M 0 9 C 46 4, 92 13, 138 7 S 200 11, 230 8"
                  fill="none"
                  stroke="#B8C9E1"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity={0.4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.9, ease: 'easeOut' }}
                />
              </motion.svg>
            </motion.div>

            {/* Introduction */}
            <motion.p
              className="font-quote text-xl text-moonlight/60 leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1.5 }}
            >
              {chapter6Data.intro}
            </motion.p>

            {/* Annotation */}
            <motion.p
              className="font-handwriting text-lg text-hope/40 italic -mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              {chapter6Data.annotation}
            </motion.p>

            {/* ── Letters ── */}
            <div className="flex flex-col gap-5">
              {letters.map((letter, i) => (
                <LetterCard key={letter.id} letter={letter} index={i} />
              ))}
            </div>

            {/* Star found message */}
            <AnimatePresence>
              {starFound && (
                <motion.p
                  className="font-handwriting text-xl text-hope/60 italic"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {moonMessage}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Pull quote */}
            <motion.blockquote
              className="mt-auto border-l-2 border-hope/20 pl-5 py-1 max-w-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.4 }}
            >
              <p className="font-quote text-base text-moonlight/45 italic leading-relaxed">
                {pullQuote}
              </p>
              <footer className="font-handwriting text-sm text-hope/35 mt-2">{attribution}</footer>
            </motion.blockquote>

            {/* Navigation */}
            <div className="flex gap-4 pt-2 pb-2">
              <button
                onClick={onPrev}
                className="font-handwriting text-xl text-hope/45 hover:text-moonlight transition-colors duration-500 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                aria-label="Previous chapter"
              >
                ← back
              </button>
              <button
                onClick={onNext}
                className="font-handwriting text-xl text-hope/70 hover:text-moonlight transition-colors duration-500 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hope focus-visible:ring-offset-2 focus-visible:ring-offset-navy ml-auto"
                aria-label="Next chapter"
              >
                next chapter →
              </button>
            </div>
          </div>

          {/* Gutter */}
          <div className="hidden lg:flex flex-col items-center px-3 py-8 gap-1.5" aria-hidden="true">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="w-px h-3 bg-hope/6" />
            ))}
          </div>

          {/* ═══════════ RIGHT PAGE — Moonlit scene ═══════════ */}
          <div className="flex-1 lg:pl-8 flex flex-col pb-8">

            <motion.div
              className="pt-6 mb-4 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              <p className="font-handwriting text-2xl text-hope/40 italic">the night watch</p>
              <p className="font-sans text-[10px] tracking-widest text-hope/22 uppercase">
                {starFound ? 'you found the star ✦' : 'find the golden star'}
              </p>
            </motion.div>

            {/* Night sky panel */}
            <motion.div
              className="relative flex-1 min-h-[320px] md:min-h-[420px] border border-hope/8 overflow-hidden"
              style={{ backgroundColor: '#111A27' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.8 }}
            >
              {/* Horizon gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(26,39,68,0.9) 0%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Moon glow reflection */}
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 80% 10%, rgba(240,238,228,0.08) 0%, transparent 65%)',
                }}
                aria-hidden="true"
              />

              {/* Scene label */}
              <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3 z-10">
                <motion.p
                  className="font-handwriting text-xl text-moonlight/30 italic"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  somewhere past midnight
                </motion.p>

                {/* Ink-drawn ground line */}
                <svg className="w-3/4 h-4" viewBox="0 0 300 12" aria-hidden="true">
                  <motion.path
                    d="M 4 8 Q 75 5 150 9 Q 225 12 296 7"
                    fill="none"
                    stroke="#B8C9E1"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity={0.18}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              {/* Silhouette cityline */}
              <svg
                className="absolute bottom-8 left-0 right-0 w-full pointer-events-none"
                height="80"
                viewBox="0 0 600 80"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,80 L0,50 L30,50 L30,30 L40,30 L40,50 L60,50 L60,20 L75,20 L75,50 L100,50 L100,40 L115,40 L115,50 L140,50 L140,35 L150,35 L150,50 L180,50 L180,45 L200,45 L200,50 L230,50 L230,25 L245,25 L245,50 L270,50 L270,42 L285,42 L285,50 L310,50 L310,30 L325,30 L325,50 L360,50 L360,38 L375,38 L375,50 L400,50 L400,22 L415,22 L415,50 L440,50 L440,48 L470,48 L470,35 L485,35 L485,50 L510,50 L510,40 L525,40 L525,50 L560,50 L560,28 L575,28 L575,50 L600,50 L600,80 Z"
                  fill="rgba(17,26,39,0.9)"
                />
                {/* Windows */}
                {[45, 105, 160, 235, 295, 370, 420, 490, 565].map((x, i) => (
                  <rect
                    key={i}
                    x={x}
                    y={sr(i * 7) < 0.5 ? 36 : 26}
                    width="4"
                    height="5"
                    fill="rgba(184,201,225,0.12)"
                  />
                ))}
              </svg>
            </motion.div>

            {/* Bottom annotation */}
            <motion.p
              className="font-letter text-base text-hope/25 italic text-center mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.2 }}
            >
              the golden star is somewhere in the sky ↑
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* ── Shooting star ── */}
      <AnimatePresence>
        {shotFired && !showSecret && (
          <ShootingStar onDone={() => setShowSecret(true)} />
        )}
      </AnimatePresence>

      {/* ── Secret letter modal ── */}
      <AnimatePresence>
        {showSecret && (
          <SecretLetterModal onClose={() => setShowSecret(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
