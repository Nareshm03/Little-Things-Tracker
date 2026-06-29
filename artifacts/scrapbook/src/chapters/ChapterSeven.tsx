import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import { chapter7Data, FutureCard } from '../data/chapters/chapter7';

// ─── Page variants ────────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, filter: 'blur(5px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit:    { opacity: 0, filter: 'blur(8px)' },
};

// ─── Seeded random ────────────────────────────────────────────────────────────
function sr(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Sunrise glow background ──────────────────────────────────────────────────
function SunriseGlow() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Warm sunrise radial from bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full"
        style={{
          height: '70%',
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(232,184,109,0.18) 0%, rgba(212,132,74,0.08) 45%, transparent 80%)',
        }}
        animate={
          shouldReduceMotion
            ? {}
            : { opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Soft amber top corner warmth */}
      <div
        className="absolute top-0 right-0 w-72 h-72"
        style={{
          background:
            'radial-gradient(ellipse at 80% 10%, rgba(232,184,109,0.12) 0%, transparent 65%)',
        }}
      />
      {/* Left edge light bleed */}
      <div
        className="absolute top-1/4 left-0 w-40 h-64"
        style={{
          background:
            'radial-gradient(ellipse at 0% 50%, rgba(212,132,74,0.09) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ─── Floating dust motes ──────────────────────────────────────────────────────
function DustMotes({ count = 18 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: sr(i * 7) * 100,
        y: sr(i * 11) * 100,
        size: 1.5 + sr(i * 3) * 2.5,
        opacity: 0.06 + sr(i * 5) * 0.14,
        dur: 14 + sr(i * 9) * 18,
        delay: sr(i * 13) * 10,
        driftX: (sr(i * 17) - 0.5) * 60,
        driftY: -(20 + sr(i * 19) * 40),
      })),
    [count]
  );

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {motes.map((m) => (
        <motion.div
          key={m.id}
          className="absolute rounded-full bg-golden"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size, opacity: m.opacity }}
          animate={{ x: [0, m.driftX, 0], y: [0, m.driftY, 0], opacity: [m.opacity, m.opacity * 1.6, m.opacity] }}
          transition={{ duration: m.dur, repeat: Infinity, delay: m.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── Ink-drawn rule line ──────────────────────────────────────────────────────
function InkLine({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  return (
    <svg className={`w-full h-4 ${className}`} viewBox="0 0 300 12" aria-hidden="true">
      <motion.path
        d="M 4 8 Q 75 4 150 8 Q 225 12 296 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="text-golden/35"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Washi tape ───────────────────────────────────────────────────────────────
function WashiTape({ color, angle }: { color: string; angle: number }) {
  return (
    <div
      className="absolute -top-3 left-5 w-10 h-4 z-10"
      style={{ background: color, transform: `rotate(${angle}deg)` }}
      aria-hidden="true"
    />
  );
}

// ─── Passport stamp ───────────────────────────────────────────────────────────
function PassportStamp({ text }: { text: string }) {
  return (
    <div
      className="absolute top-3 right-3 border-2 border-coffee/25 rounded px-2 py-1 rotate-12 opacity-50"
      aria-hidden="true"
    >
      <p className="font-sans text-[9px] font-bold tracking-widest uppercase text-coffee/70">{text}</p>
    </div>
  );
}

// ─── Milestone list ───────────────────────────────────────────────────────────
function MilestoneList() {
  const { milestones } = chapter7Data;
  return (
    <div className="space-y-4" role="list" aria-label="Milestones">
      {milestones.map((m, i) => (
        <motion.div
          key={m.id}
          className="flex gap-4 items-start"
          role="listitem"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * i, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Small flower/leaf marker */}
          <motion.span
            className="flex-shrink-0 mt-1 text-base leading-none select-none"
            aria-hidden="true"
            animate={{ rotate: [0, 5, -3, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          >
            {['🌸', '🌿', '✦', '🌼', '🌱'][i % 5]}
          </motion.span>

          <div className="min-w-0">
            <p className="font-sans text-xs tracking-widest uppercase text-coffee/40 mb-0.5">{m.label}</p>
            <p className="font-letter text-xl text-charcoal/80 leading-snug italic">"{m.note}"</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Handwritten character-reveal animation ───────────────────────────────────
function HandwrittenReveal({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const chars = text.split('');
  return (
    <span aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: startDelay + i * 0.052, duration: 0.125 }}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Hidden blank journal page ────────────────────────────────────────────────
function HiddenPage({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="relative w-full border border-dashed border-coffee/15 bg-cream/50 py-5 px-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2 group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
      aria-label="Open blank journal page"
      style={{ minHeight: 72 }}
    >
      <motion.span
        className="font-handwriting text-xl italic"
        animate={{ opacity: hovered ? 0.55 : 0.12 }}
        transition={{ duration: 0.5 }}
      >
        ✎ &nbsp;blank page…
      </motion.span>
    </motion.button>
  );
}

// ─── Blank page modal ─────────────────────────────────────────────────────────
function BlankPageModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { hiddenPageText } = chapter7Data;

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
      transition={{ duration: 0.6 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Blank journal page"
    >
      <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm" />

      <motion.div
        className="relative bg-[#FDFAF4] max-w-sm w-full overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `repeating-linear-gradient(
            transparent, transparent 27px,
            rgba(111,78,55,0.07) 28px
          )`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 24, rotate: -1.5 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red margin line */}
        <div className="absolute top-0 bottom-0 left-14 w-px bg-red-300/40" aria-hidden="true" />

        {/* Corner dog-ear */}
        <div
          className="absolute top-0 right-0 w-0 h-0 pointer-events-none"
          style={{
            borderStyle: 'solid',
            borderWidth: '0 32px 32px 0',
            borderColor: 'transparent rgba(209,175,137,0.3) transparent transparent',
          }}
          aria-hidden="true"
        />

        <div className="pl-16 pr-8 pt-8 pb-10">
          {/* Pencil sketch line */}
          <motion.svg className="w-full h-5 mb-5" viewBox="0 0 280 14" aria-hidden="true">
            <motion.path
              d="M 4 9 C 60 6, 120 11, 180 8 S 240 10, 276 7"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="3 4"
              opacity={0.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </motion.svg>

          <motion.div
            className="font-handwriting text-2xl text-charcoal leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <HandwrittenReveal text={hiddenPageText} startDelay={0.5} />
          </motion.div>

          {/* Trailing ink line */}
          <motion.svg className="w-1/2 h-4 mt-6" viewBox="0 0 140 10" aria-hidden="true">
            <motion.path
              d="M 2 6 C 35 3, 70 8, 105 5 S 130 7, 138 5"
              fill="none"
              stroke="#6F4E37"
              strokeWidth="1"
              strokeLinecap="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: hiddenPageText.length * 0.05 + 0.8, ease: 'easeOut' }}
            />
          </motion.svg>
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full border border-coffee/20 text-coffee/40 flex items-center justify-center text-xs hover:text-charcoal hover:border-coffee/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
          aria-label="Close journal page"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Future journal card ──────────────────────────────────────────────────────
function JournalCard({ card, onClick }: { card: FutureCard; onClick: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      className="relative text-left border border-coffee/10 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2 group w-full"
      style={{ backgroundColor: card.bgColor }}
      onClick={onClick}
      whileHover={shouldReduceMotion ? {} : { y: -3, boxShadow: '0 8px 28px rgba(111,78,55,0.12)' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      aria-label={`Open journal card: ${card.title}`}
    >
      <WashiTape color={card.tapeColor} angle={card.tapeAngle} />
      {card.passportStamp && <PassportStamp text={card.passportStamp} />}

      <div className="p-5 pt-7">
        <p className="text-2xl mb-2 leading-none" aria-hidden="true">{card.icon}</p>
        <p className="font-sans text-xs tracking-widest uppercase text-coffee/45 mb-1">{card.title}</p>
        <p className="font-letter text-lg text-charcoal/70 italic leading-snug">{card.teaser}</p>

        {/* Open hint */}
        <motion.p
          className="font-sans text-[9px] tracking-widest uppercase text-coffee/25 mt-3"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          open →
        </motion.p>
      </div>
    </motion.button>
  );
}

// ─── Journal card modal / open page ──────────────────────────────────────────
function JournalPage({ card, onClose }: { card: FutureCard; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

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
      transition={{ duration: 0.5 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Journal page: ${card.title}`}
    >
      <div className="absolute inset-0 bg-charcoal/25 backdrop-blur-sm" />

      <motion.div
        className="relative max-w-md w-full overflow-hidden shadow-2xl"
        style={{
          backgroundColor: card.bgColor,
          backgroundImage: `repeating-linear-gradient(
            transparent, transparent 29px,
            rgba(111,78,55,0.06) 30px
          )`,
          rotate: -1,
        }}
        initial={{ opacity: 0, scale: 0.88, y: 28, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: -1 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red margin */}
        <div className="absolute top-0 bottom-0 left-14 w-px bg-red-300/35" aria-hidden="true" />
        {/* Washi tape on open page */}
        <WashiTape color={card.tapeColor} angle={-card.tapeAngle} />
        {card.passportStamp && <PassportStamp text={card.passportStamp} />}

        <div className="pl-16 pr-8 pt-10 pb-10">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl" aria-hidden="true">{card.icon}</span>
            <div>
              <p className="font-sans text-xs tracking-widest uppercase text-coffee/40">{card.title}</p>
              <p className="font-display text-2xl text-coffee font-light">{card.title}</p>
            </div>
          </div>

          <InkLine delay={0.2} className="mb-5" />

          <motion.p
            className="font-letter text-xl text-charcoal/80 italic leading-relaxed mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            {card.pageContent}
          </motion.p>

          <InkLine delay={0.6} className="mb-3" />

          <motion.p
            className="font-handwriting text-xl text-coffee/60 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {card.handwrittenDetail}
          </motion.p>
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full border border-coffee/20 text-coffee/40 flex items-center justify-center text-xs hover:text-charcoal hover:border-coffee/50 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden"
          aria-label="Close journal page"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Fresh flowers decoration ─────────────────────────────────────────────────
function FlowerAccent({ className = '' }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`select-none pointer-events-none ${className}`}
      animate={shouldReduceMotion ? {} : { rotate: [0, 4, -2, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <span className="text-3xl leading-none">🌸</span>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChapterSeven({ onNext, onPrev }: ChapterProps) {
  const [openCard, setOpenCard] = useState<FutureCard | null>(null);
  const [showBlankPage, setShowBlankPage] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { futureCards, pullQuote, attribution, closingNote } = chapter7Data;

  return (
    <>
      <motion.div
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-cream text-charcoal paper-texture"
        variants={shouldReduceMotion ? {} : pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1.6, ease: 'easeInOut' }}
        aria-label="Chapter Seven: Growing Together"
      >
        {/* Atmosphere */}
        <SunriseGlow />
        <DustMotes count={20} />

        {/* Ink texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-0 min-h-full">

          {/* ═══════════ LEFT PAGE ═══════════ */}
          <div className="flex-1 lg:border-r lg:border-coffee/8 lg:pr-10 flex flex-col gap-6 pb-8 lg:pb-0">

            {/* Chapter header */}
            <motion.div
              className="pt-6 relative"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.4, ease: 'easeOut' }}
            >
              <FlowerAccent className="absolute -top-2 right-0" />
              <p className="font-sans text-xs tracking-[0.38em] uppercase text-coffee/35 mb-1">
                {chapter7Data.chapterNumber}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-coffee leading-tight font-light">
                {chapter7Data.title}
              </h2>
              <InkLine delay={0.8} className="mt-1 max-w-[200px]" />
            </motion.div>

            {/* Introduction */}
            <motion.p
              className="font-quote text-xl text-charcoal/65 leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.4 }}
            >
              {chapter7Data.intro}
            </motion.p>

            {/* Annotation */}
            <motion.p
              className="font-handwriting text-xl text-coffee/40 italic -mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 1 }}
            >
              {chapter7Data.annotation}
            </motion.p>

            {/* ─── Milestone list ─── */}
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-coffee/30 mb-4">
                How we got here
              </p>
              <MilestoneList />
            </div>

            {/* Handwritten encouragement card */}
            <motion.div
              className="relative border border-coffee/10 bg-[#FEF9F0] p-5 max-w-sm"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotate: -0.5 }}
            >
              {/* Paper pin */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-golden/70 border border-golden/40 shadow-sm z-10"
                aria-hidden="true"
              />

              <InkLine delay={0.3} className="mb-3" />
              <p className="font-handwriting text-xl text-coffee/75 italic leading-relaxed">
                {chapter7Data.handwrittenEncouragement}
              </p>
              <InkLine delay={0.5} className="mt-3" />
            </motion.div>

            {/* ─── Hidden blank page ─── */}
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-coffee/25 mb-2">
                one more page
              </p>
              <HiddenPage onOpen={() => setShowBlankPage(true)} />
            </div>

            {/* Pull quote */}
            <motion.blockquote
              className="mt-auto border-l-2 border-golden/30 pl-5 py-1 max-w-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.4 }}
            >
              <p className="font-quote text-base text-charcoal/50 italic leading-relaxed">
                {pullQuote}
              </p>
              <footer className="font-handwriting text-sm text-coffee/40 mt-2">{attribution}</footer>
            </motion.blockquote>

            {/* Navigation */}
            <div className="flex gap-4 pt-2 pb-2">
              <button
                onClick={onPrev}
                className="font-handwriting text-xl text-coffee/40 hover:text-coffee transition-colors duration-500 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2"
                aria-label="Previous chapter"
              >
                ← back
              </button>
              <button
                onClick={onNext}
                className="font-handwriting text-xl text-coffee/70 hover:text-coffee transition-colors duration-500 underline underline-offset-4 ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden focus-visible:ring-offset-2"
                aria-label="Next chapter"
              >
                next chapter →
              </button>
            </div>
          </div>

          {/* Gutter */}
          <div className="hidden lg:flex flex-col items-center px-3 py-8 gap-1.5" aria-hidden="true">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="w-px h-3 bg-coffee/6" />
            ))}
          </div>

          {/* ═══════════ RIGHT PAGE — Future Journal ═══════════ */}
          <div className="flex-1 lg:pl-8 flex flex-col gap-6 pb-8">

            {/* Page header */}
            <motion.div
              className="pt-6 flex items-end justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-coffee/30 mb-0.5">
                  Future Journal
                </p>
                <p className="font-handwriting text-2xl text-coffee/55 italic">
                  the chapters still to come
                </p>
              </div>
              <FlowerAccent className="-mb-1" />
            </motion.div>

            <InkLine delay={0.6} />

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {futureCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <JournalCard card={card} onClick={() => setOpenCard(card)} />
                </motion.div>
              ))}
            </div>

            {/* Closing note */}
            <motion.div
              className="mt-auto pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1.4 }}
            >
              <InkLine delay={0} className="mb-4" />
              <div className="flex items-center justify-between">
                <p className="font-handwriting text-xl text-coffee/40 italic">
                  {closingNote}
                </p>
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 8, -4, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  🌻
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ─── Journal page modal ─── */}
      <AnimatePresence>
        {openCard && (
          <JournalPage card={openCard} onClose={() => setOpenCard(null)} />
        )}
      </AnimatePresence>

      {/* ─── Blank page reveal modal ─── */}
      <AnimatePresence>
        {showBlankPage && (
          <BlankPageModal onClose={() => setShowBlankPage(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
