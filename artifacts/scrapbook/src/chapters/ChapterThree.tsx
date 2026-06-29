import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import { chapter3Data, ComicPanel } from '../data/chapters/chapter3';

// ─── Motion variants ────────────────────────────────────────────────────────

const pageVariants = {
  initial: { scale: 0.94, opacity: 0, rotate: -1 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  exit: { scale: 1.04, opacity: 0, rotate: 1 },
};

const panelVariants = {
  hidden: { y: 60, opacity: 0, rotate: -2 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: i % 2 === 0 ? -0.5 : 0.5,
    transition: { delay: 0.3 + i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const popVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.4 + i * 0.12, type: 'spring', bounce: 0.5 },
  }),
};

const chatVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.6 + i * 0.22, duration: 0.45, ease: 'easeOut' },
  }),
};

const modalVariants = {
  hidden: { scale: 0.85, opacity: 0, y: 30 },
  visible: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.28, duration: 0.5 } },
  exit: { scale: 0.9, opacity: 0, y: 20, transition: { duration: 0.25 } },
};

// ─── Ben-Day dots SVG background (comic book texture) ───────────────────────

function BenDayDots({ color = '#D4844A', opacity = 0.06 }: { color?: string; opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2" fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

// ─── Comic panel component ───────────────────────────────────────────────────

function Panel({
  panel,
  index,
  onClick,
}: {
  panel: ComicPanel;
  index: number;
  onClick: (panel: ComicPanel) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative bg-white border-[3px] border-charcoal cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
      style={{ boxShadow: '4px 4px 0 #2D2D2D' }}
      custom={index}
      variants={panelVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={
        shouldReduceMotion
          ? {}
          : { y: -4, rotate: index % 2 === 0 ? -2 : 2, boxShadow: '6px 8px 0 #2D2D2D', transition: { duration: 0.2 } }
      }
      onClick={() => onClick(panel)}
      role="button"
      tabIndex={0}
      aria-label={`Open panel: ${panel.caption}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(panel);
        }
      }}
    >
      {/* Ben-Day dots in corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
        <svg width="64" height="64" aria-hidden="true">
          <defs>
            <pattern id={`dots-${panel.id}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill={panel.doodleColor} opacity="0.25" />
            </pattern>
          </defs>
          <rect width="64" height="64" fill={`url(#dots-${panel.id})`} />
        </svg>
      </div>

      {/* Badge */}
      <motion.div
        className="absolute -top-4 -left-2 z-10 font-display text-sm font-black px-3 py-1 border-2 border-charcoal"
        style={{ backgroundColor: panel.badgeColor, boxShadow: '2px 2px 0 #2D2D2D', color: '#2D2D2D', rotate: '-6deg' }}
        custom={index}
        variants={popVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {panel.badge}
      </motion.div>

      {/* Dialogue */}
      <div className="p-4 pt-6 space-y-3 min-h-[110px]">
        {panel.lines.map((line, li) => (
          <p
            key={li}
            className="font-letter text-xl leading-snug text-charcoal"
            style={{ textAlign: line.speaker === 'me' ? 'right' : 'left' }}
          >
            {line.text}
          </p>
        ))}
      </div>

      {/* Caption band */}
      <div className="border-t-[3px] border-charcoal bg-soft-beige px-3 py-1.5">
        <p className="font-handwriting text-base text-coffee/80 italic">{panel.caption}</p>
      </div>

      {/* Doodle squiggle */}
      <svg
        className="absolute bottom-8 right-2 w-10 h-10 pointer-events-none opacity-40"
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <motion.path
          d="M 5 20 Q 15 5 20 20 Q 25 35 35 20"
          fill="none"
          stroke={panel.doodleColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
        />
      </svg>

      {/* Expand hint */}
      <div className="absolute bottom-1 right-2 text-[10px] font-sans text-charcoal/30 group-hover:text-charcoal/60 transition-colors select-none">
        tap to expand
      </div>
    </motion.div>
  );
}

// ─── Sticker component ───────────────────────────────────────────────────────

function Sticker({
  sticker,
  index,
}: {
  sticker: { id: number; emoji: string; label: string; rotate: number; color: string };
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex flex-col items-center gap-1 cursor-default select-none"
      custom={index}
      variants={popVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              rotate: [sticker.rotate, sticker.rotate - 4, sticker.rotate + 6, sticker.rotate],
              y: -5,
              transition: { duration: 0.4 },
            }
      }
      style={{ rotate: `${sticker.rotate}deg` }}
      aria-label={sticker.label}
    >
      <div
        className="w-14 h-14 rounded-xl border-2 border-charcoal/20 flex items-center justify-center text-3xl shadow-md"
        style={{ backgroundColor: sticker.color, boxShadow: '3px 3px 0 rgba(45,45,45,0.15)' }}
      >
        {sticker.emoji}
      </div>
      <p className="font-handwriting text-sm text-coffee/70 text-center max-w-[70px] leading-tight">
        {sticker.label}
      </p>
    </motion.div>
  );
}

// ─── Panel modal ─────────────────────────────────────────────────────────────

function PanelModal({
  panel,
  onClose,
}: {
  panel: ComicPanel;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Memory: ${panel.caption}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative bg-warm-white border-[3px] border-charcoal max-w-md w-full rounded-sm overflow-hidden"
        style={{ boxShadow: '8px 8px 0 #2D2D2D' }}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Washi tape top */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape z-10"
          style={{ backgroundColor: panel.badgeColor + 'AA' }}
          aria-hidden="true"
        />

        {/* Header badge */}
        <div
          className="px-6 pt-8 pb-3 border-b-[3px] border-charcoal flex items-center gap-3"
          style={{ backgroundColor: panel.badgeColor + '33' }}
        >
          <span
            className="font-display text-xl font-black px-3 py-0.5 border-2 border-charcoal"
            style={{ backgroundColor: panel.badgeColor, boxShadow: '2px 2px 0 #2D2D2D' }}
          >
            {panel.badge}
          </span>
          <p className="font-handwriting text-xl text-coffee italic">{panel.caption}</p>
        </div>

        {/* Photo placeholder */}
        <div className="mx-6 mt-4 h-28 bg-soft-beige border-2 border-charcoal/20 flex items-center justify-center rounded-sm relative overflow-hidden">
          <BenDayDots color={panel.doodleColor} opacity={0.12} />
          <div className="flex flex-col items-center gap-1 z-10">
            <span className="text-3xl opacity-40">📷</span>
            <p className="font-handwriting text-sm text-coffee/40">{panel.photoAlt}</p>
          </div>
          {/* Polaroid bottom strip */}
          <div className="absolute bottom-0 left-0 right-0 h-7 bg-white border-t border-charcoal/10 flex items-center justify-center">
            <p className="font-handwriting text-base text-navy/60 italic">{panel.handwrittenCaption}</p>
          </div>
        </div>

        {/* Full chat conversation */}
        <div className="px-6 py-4 space-y-2 max-h-48 overflow-y-auto">
          {panel.fullConversation.map((line, i) => (
            <motion.div
              key={i}
              className={`flex ${line.speaker === 'me' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, x: line.speaker === 'me' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
            >
              <div
                className={`px-3 py-2 max-w-[80%] border border-charcoal/20 ${
                  line.speaker === 'me'
                    ? 'bg-orange/10 rounded-2xl rounded-tr-sm'
                    : 'bg-white rounded-2xl rounded-tl-sm'
                }`}
              >
                <p className="font-letter text-lg text-charcoal">{line.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Handwritten annotation */}
        <div className="mx-6 mb-2">
          <motion.svg
            className="w-full h-6"
            viewBox="0 0 300 20"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.path
              d="M 10 10 Q 80 5 150 10 Q 220 15 290 8"
              fill="none"
              stroke={panel.doodleColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.svg>
          <p className="font-handwriting text-lg text-coffee/60 italic text-center -mt-1">
            {panel.handwrittenCaption}
          </p>
        </div>

        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-charcoal text-warm-white flex items-center justify-center text-sm font-bold hover:bg-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          style={{ boxShadow: '2px 2px 0 #2D2D2D' }}
          aria-label="Close panel"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Secret memory card ──────────────────────────────────────────────────────

function SecretCard({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { secretMemory } = chapter3Data;

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Secret memory"
    >
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" />

      <motion.div
        className="relative bg-[#FFFDE7] border-[3px] border-charcoal max-w-sm w-full p-8 rounded-sm"
        style={{ boxShadow: '10px 10px 0 #2D2D2D', rotate: '-1deg' }}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Star burst decoration */}
        <div
          className="absolute -top-5 -left-5 text-3xl animate-slow-spin pointer-events-none"
          aria-hidden="true"
        >
          ✨
        </div>
        <div
          className="absolute -top-3 -right-4 text-2xl pointer-events-none"
          style={{ rotate: '20deg', display: 'inline-block' }}
          aria-hidden="true"
        >
          🌟
        </div>

        <p className="font-handwriting text-2xl text-orange mb-1">{secretMemory.title}</p>
        <p className="font-letter text-sm text-coffee/60 uppercase tracking-widest mb-4">
          {secretMemory.caption}
        </p>

        <div className="border-t-2 border-charcoal/10 pt-4">
          <p className="font-quote text-xl text-charcoal leading-relaxed">{secretMemory.content}</p>
        </div>

        <motion.div
          className="mt-5 bg-orange/10 border border-orange/30 px-4 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-handwriting text-2xl text-coffee italic">
            "{secretMemory.handwrittenNote}"
          </p>
        </motion.div>

        {/* Drawn underline */}
        <motion.svg className="w-full h-4 mt-2" viewBox="0 0 280 12" aria-hidden="true">
          <motion.path
            d="M 5 8 Q 70 2 140 8 Q 210 14 275 6"
            fill="none"
            stroke="#D4844A"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.svg>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-charcoal text-warm-white flex items-center justify-center text-sm font-bold hover:bg-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          style={{ boxShadow: '2px 2px 0 #2D2D2D' }}
          aria-label="Close secret memory"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ChapterThree({ onNext, onPrev }: ChapterProps) {
  const [openPanel, setOpenPanel] = useState<ComicPanel | null>(null);
  const [secretFound, setSecretFound] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { comicPanels, chatBubbles, stickers, reactionCards, insideJokes, quote, attribution } =
    chapter3Data;

  const handleSecretClick = () => {
    setSecretFound(true);
    setShowSecret(true);
  };

  return (
    <>
      <motion.div
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
        style={{ backgroundColor: '#FBF8F2' }}
        variants={shouldReduceMotion ? {} : pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
        aria-label="Chapter Three: The Way We Made Each Other Laugh"
      >
        {/* Global comic texture */}
        <BenDayDots color="#D4844A" opacity={0.04} />

        {/* Comic border frame */}
        <div
          className="absolute inset-3 pointer-events-none border-[3px] border-charcoal/8 rounded-sm"
          aria-hidden="true"
        />

        {/* ── Two-page spread container ───────────────────────────── */}
        <div className="min-h-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-0 lg:gap-0">

          {/* ══════════ LEFT PAGE ══════════ */}
          <div className="flex-1 lg:border-r-[3px] lg:border-charcoal/20 lg:pr-8 pb-8 lg:pb-0 flex flex-col gap-6">

            {/* Chapter header */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-coffee/50 mb-1">
                {chapter3Data.chapterNumber}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
                {chapter3Data.title}
              </h2>
              {/* Drawn underline */}
              <motion.svg
                className="w-48 h-5 mt-1"
                viewBox="0 0 200 16"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.path
                  d="M 0 10 C 40 4, 80 14, 120 8 S 180 12, 200 8"
                  fill="none"
                  stroke="#D4844A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                />
              </motion.svg>
            </motion.div>

            {/* Intro text with handwritten annotation */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="font-quote text-xl text-charcoal/80 leading-relaxed max-w-md">
                {chapter3Data.intro}
              </p>

              {/* Handwritten annotation arrow */}
              <div className="absolute -right-4 top-0 hidden md:block" aria-hidden="true">
                <svg width="80" height="60" viewBox="0 0 80 60">
                  <motion.path
                    d="M 10 10 C 30 5, 50 30, 65 50"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                  />
                  <motion.path
                    d="M 58 46 L 65 50 L 61 42"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 2 }}
                  />
                </svg>
                <p
                  className="font-handwriting text-base text-golden/80"
                  style={{ rotate: '10deg', marginTop: '-8px' }}
                >
                  yes, really
                </p>
              </div>
            </motion.div>

            {/* ── Comic strip ──────────────────────────────────────── */}
            <div className="flex flex-col gap-0">
              {/* Comic strip label */}
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div
                  className="font-display text-sm font-black px-3 py-1 text-warm-white"
                  style={{ backgroundColor: '#2D2D2D', letterSpacing: '0.1em' }}
                >
                  THE STRIP
                </div>
                <div className="h-px flex-1 bg-charcoal/15" />
              </motion.div>

              {/* Panels grid — 2×2 with the bottom spanning full */}
              <div className="grid grid-cols-2 gap-[3px] bg-charcoal/20">
                {comicPanels.slice(0, 2).map((panel, i) => (
                  <Panel key={panel.id} panel={panel} index={i} onClick={setOpenPanel} />
                ))}
                {comicPanels.slice(2, 4).map((panel, i) => (
                  <Panel key={panel.id} panel={panel} index={i + 2} onClick={setOpenPanel} />
                ))}
              </div>

              {/* Annotation below strip */}
              <motion.div
                className="mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <svg width="24" height="20" viewBox="0 0 24 20" aria-hidden="true">
                  <motion.path
                    d="M 2 2 C 10 8, 14 12, 22 18"
                    fill="none"
                    stroke="#D4844A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                  />
                </svg>
                <p className="font-handwriting text-lg text-coffee/60 italic">
                  tap any panel to read the full story
                </p>
              </motion.div>
            </div>

            {/* Inside jokes list */}
            <motion.div
              className="mt-2 border-l-4 border-orange pl-4 py-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-display text-base text-coffee mb-2">The canon inside jokes:</p>
              <ul className="space-y-1" aria-label="Inside jokes">
                {insideJokes.map((joke, i) => (
                  <motion.li
                    key={i}
                    className="font-handwriting text-xl text-charcoal/75 flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <span className="text-orange mt-0.5 flex-shrink-0">•</span>
                    {joke}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              className="mt-auto pt-4 border-t border-charcoal/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="font-quote text-lg text-charcoal/60 italic leading-relaxed">
                {quote}
              </p>
              <footer className="font-handwriting text-base text-coffee/50 mt-1">{attribution}</footer>
            </motion.blockquote>

            {/* Page navigation */}
            <div className="flex gap-4 pt-4 pb-2">
              <button
                onClick={onPrev}
                className="font-handwriting text-xl text-coffee/60 hover:text-coffee transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
                aria-label="Previous chapter"
              >
                ← back
              </button>
              <button
                onClick={onNext}
                className="font-handwriting text-xl text-orange hover:text-coffee transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 ml-auto"
                aria-label="Next chapter"
              >
                next chapter →
              </button>
            </div>
          </div>

          {/* Gutter line decoration */}
          <div className="hidden lg:flex flex-col items-center px-3 py-8 gap-2" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-px h-4 bg-charcoal/10" />
            ))}
          </div>

          {/* ══════════ RIGHT PAGE ══════════ */}
          <div className="flex-1 lg:pl-8 flex flex-col gap-6 pb-8">

            {/* Right page header */}
            <motion.div
              className="pt-6 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-handwriting text-2xl text-coffee/60 italic">...and then we laughed</p>
              {/* Hidden smiley easter egg */}
              <motion.button
                className="text-[10px] text-charcoal/8 hover:text-charcoal/40 transition-colors duration-500 cursor-pointer select-none focus-visible:outline-none focus-visible:text-orange"
                onClick={handleSecretClick}
                whileHover={{ scale: 1.5 }}
                aria-label="A tiny smiley face"
                title="You found it! ☺"
              >
                ☺
              </motion.button>
            </motion.div>

            {/* ── Chat bubbles ───────────────────────────────────── */}
            <div>
              <motion.p
                className="font-handwriting text-xl text-coffee/50 mb-3 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                actual things we said:
              </motion.p>

              <div className="space-y-3" role="log" aria-label="Chat conversation">
                {chatBubbles.map((bubble, i) => (
                  <motion.div
                    key={bubble.id}
                    className={`flex ${bubble.sender === 'us' ? 'justify-end' : 'justify-start'}`}
                    custom={i}
                    variants={chatVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`
                        relative px-4 py-2.5 max-w-[85%] border-2 border-charcoal
                        ${bubble.sender === 'us'
                          ? 'bg-orange/15 rounded-2xl rounded-tr-none'
                          : 'bg-white rounded-2xl rounded-tl-none'
                        }
                      `}
                      style={{ boxShadow: '2px 2px 0 rgba(45,45,45,0.2)' }}
                      whileHover={
                        shouldReduceMotion ? {} : { scale: 1.02, transition: { duration: 0.15 } }
                      }
                    >
                      <p className="font-letter text-xl text-charcoal">{bubble.text}</p>
                      {bubble.reaction && (
                        <span className="absolute -bottom-3 right-2 text-base">{bubble.reaction}</span>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Emoji stickers ─────────────────────────────────── */}
            <div>
              <motion.p
                className="font-handwriting text-xl text-coffee/50 italic mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                filed under:
              </motion.p>
              <div
                className="flex flex-wrap gap-4 items-end"
                role="list"
                aria-label="Emoji stickers"
              >
                {stickers.map((sticker, i) => (
                  <div key={sticker.id} role="listitem">
                    <Sticker sticker={sticker} index={i} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Reaction cards ─────────────────────────────────── */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className="font-display text-sm font-black px-3 py-1 text-warm-white"
                  style={{ backgroundColor: '#2D2D2D', letterSpacing: '0.1em' }}
                >
                  REACTIONS
                </div>
                <div className="h-px flex-1 bg-charcoal/15" />
              </motion.div>

              <div className="flex flex-wrap gap-3" role="list" aria-label="Reaction cards">
                {reactionCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-charcoal rounded-full"
                    style={{
                      backgroundColor: card.color,
                      boxShadow: '3px 3px 0 #2D2D2D',
                    }}
                    custom={i}
                    variants={popVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
                    role="listitem"
                    aria-label={`${card.emoji} ${card.label}: ${card.count}`}
                  >
                    <span className="text-xl">{card.emoji}</span>
                    <span className="font-letter text-lg text-charcoal">{card.label}</span>
                    <span
                      className="font-display text-sm font-black text-charcoal/50 ml-1"
                    >
                      {card.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Doodle area ────────────────────────────────────── */}
            <motion.div
              className="relative flex-1 min-h-[120px] border-2 border-dashed border-charcoal/15 rounded-sm overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              aria-hidden="true"
            >
              <BenDayDots color="#6F4E37" opacity={0.05} />

              {/* Spiral doodle */}
              <svg className="absolute bottom-4 right-6 w-20 h-20 opacity-30" viewBox="0 0 80 80">
                <motion.path
                  d="M 40 40 C 40 30, 50 25, 55 35 C 60 45, 55 58, 40 60 C 25 62, 15 50, 18 35 C 21 20, 35 12, 50 15 C 65 18, 72 30, 68 45"
                  fill="none"
                  stroke="#D4844A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>

              {/* Stars */}
              {[
                { x: '15%', y: '30%', delay: 0.5, size: 16 },
                { x: '55%', y: '20%', delay: 0.7, size: 12 },
                { x: '30%', y: '65%', delay: 0.9, size: 14 },
                { x: '75%', y: '50%', delay: 1.1, size: 10 },
              ].map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute text-golden/50"
                  style={{ left: star.x, top: star.y, fontSize: star.size }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: star.delay, type: 'spring', bounce: 0.6 }}
                >
                  ★
                </motion.div>
              ))}

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-handwriting text-2xl text-coffee/20 italic text-center px-4">
                  "the world is funnier when you're in it with the right person"
                </p>
              </div>
            </motion.div>

            {/* Secret found badge */}
            <AnimatePresence>
              {secretFound && (
                <motion.div
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#FFFDE7] border-2 border-golden/40 rounded-full self-start cursor-pointer"
                  initial={{ opacity: 0, scale: 0.7, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setShowSecret(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Open secret memory"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowSecret(true);
                    }
                  }}
                  style={{ boxShadow: '2px 2px 0 rgba(201,168,76,0.4)' }}
                >
                  <span>✨</span>
                  <span className="font-handwriting text-xl text-coffee/80">
                    you found something...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── Panel modal ─── */}
      <AnimatePresence>
        {openPanel && (
          <PanelModal panel={openPanel} onClose={() => setOpenPanel(null)} />
        )}
      </AnimatePresence>

      {/* ── Secret memory card ─── */}
      <AnimatePresence>
        {showSecret && (
          <SecretCard onClose={() => setShowSecret(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
