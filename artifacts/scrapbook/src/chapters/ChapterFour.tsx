import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import { chapter4Data, Polaroid } from '../data/chapters/chapter4';

import polaroid1 from '@assets/generated_images/polaroid-1.jpg';
import polaroid2 from '@assets/generated_images/polaroid-2.jpg';
import polaroid3 from '@assets/generated_images/polaroid-3.jpg';
import polaroid4 from '@assets/generated_images/polaroid-4.jpg';
import pressedFlower from '@assets/generated_images/pressed-flower.png';

const assetMap: Record<string, string> = {
  'polaroid-1': polaroid1,
  'polaroid-2': polaroid2,
  'polaroid-3': polaroid3,
  'polaroid-4': polaroid4,
};

// ─── Page transition: gentle bloom from centre ──────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, filter: 'blur(6px)', scale: 1.02 },
};

// ─── Sunlight drift overlay ──────────────────────────────────────────────────
function SunlightDrift() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0 w-[60%] h-full"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(232,184,109,0.13) 0%, transparent 65%)',
        }}
        animate={{ x: [0, 18, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[40%] h-full"
        style={{
          background:
            'radial-gradient(ellipse at 80% 60%, rgba(201,168,76,0.08) 0%, transparent 60%)',
        }}
        animate={{ x: [0, -12, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </motion.div>
  );
}

// ─── Film strip ──────────────────────────────────────────────────────────────
function FilmStrip({ labels }: { labels: string[] }) {
  return (
    <motion.div
      className="flex items-center gap-0 overflow-hidden select-none"
      animate={{ x: [0, -80, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      {[...labels, ...labels].map((label, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-16 h-10 bg-charcoal border border-charcoal/60 relative flex items-center justify-center"
          style={{ borderRight: '2px solid #1a1a1a' }}
        >
          {/* Sprocket holes */}
          <div className="absolute top-0.5 left-1 w-1.5 h-1.5 rounded-sm bg-amber-100/20" />
          <div className="absolute top-0.5 right-1 w-1.5 h-1.5 rounded-sm bg-amber-100/20" />
          <div className="absolute bottom-0.5 left-1 w-1.5 h-1.5 rounded-sm bg-amber-100/20" />
          <div className="absolute bottom-0.5 right-1 w-1.5 h-1.5 rounded-sm bg-amber-100/20" />
          <p className="font-letter text-[7px] text-amber-100/30 text-center leading-tight px-1 truncate">
            {label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Coffee stain ─────────────────────────────────────────────────────────────
function CoffeeStain({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none opacity-20 ${className}`}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cs" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#6F4E37" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#6F4E37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6F4E37" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="40" rx="36" ry="32" fill="url(#cs)" />
      <ellipse cx="40" cy="40" rx="32" ry="28" fill="none" stroke="#6F4E37" strokeWidth="1.5" strokeOpacity="0.3" />
    </svg>
  );
}

// ─── Washi tape strip ────────────────────────────────────────────────────────
function WashiTape({
  color,
  rotate,
  className = '',
}: {
  color: string;
  rotate: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color,
        height: '18px',
        width: '52px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
        backdropFilter: 'blur(2px)',
        maskImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 20' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,20 L0,20 Z' opacity='0.8'/%3E%3Cpath d='M-2,2 C10,5 20,-2 30,3 C40,8 50,0 60,4 C70,8 80,1 90,5 C100,9 102,0 102,0 L102,20 L-2,20 Z' fill='black'/%3E%3Cpath d='M-2,18 C10,15 20,22 30,17 C40,12 50,20 60,16 C70,12 80,19 90,15 C100,11 102,20 102,20 L102,0 L-2,0 Z' fill='black'/%3E%3C/svg%3E\")",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Polaroid card ───────────────────────────────────────────────────────────
function PolaroidCard({
  polaroid,
  index,
  onOpen,
  onNoteReveal,
  noteRevealed,
}: {
  polaroid: Polaroid;
  index: number;
  onOpen: (p: Polaroid) => void;
  onNoteReveal: () => void;
  noteRevealed: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const src = polaroid.assetKey ? assetMap[polaroid.assetKey] : null;
  const [imgError, setImgError] = useState(false);

  const slideDelay = 0.25 + index * 0.17;

  return (
    <motion.div
      className="relative group"
      initial={shouldReduceMotion ? false : { y: 80, opacity: 0, rotate: polaroid.rotate * 2 }}
      whileInView={{ y: 0, opacity: 1, rotate: polaroid.rotate }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: slideDelay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Tape — settles with a small spring */}
      <motion.div
        initial={shouldReduceMotion ? false : { rotate: polaroid.tapeAngle * 2, y: -8, opacity: 0 }}
        whileInView={{ rotate: polaroid.tapeAngle, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: slideDelay + 0.25, type: 'spring', bounce: 0.4 }}
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10"
      >
        <WashiTape color={polaroid.tapeColor} rotate={0} />
      </motion.div>

      {/* Hidden note edge — only on the designated polaroid */}
      {polaroid.hasHiddenNote && !noteRevealed && (
        <motion.button
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-16 bg-[#FFFDE7] border border-golden/30 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
          style={{ borderRadius: '0 4px 4px 0', boxShadow: '2px 0 6px rgba(0,0,0,0.1)' }}
          onClick={(e) => { e.stopPropagation(); onNoteReveal(); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onNoteReveal(); }
          }}
          aria-label="Peek behind this polaroid"
          whileHover={{ x: 2 }}
          title="Something's tucked behind here…"
        >
          <span className="font-handwriting text-[9px] text-golden/60 -rotate-90 whitespace-nowrap">peek</span>
        </motion.button>
      )}

      {/* Polaroid frame */}
      <motion.div
        className="bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
        style={{ padding: '10px 10px 40px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)' }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.04, zIndex: 40, boxShadow: '0 12px 28px rgba(0,0,0,0.18)' }}
        transition={{ duration: 0.2 }}
        onClick={() => onOpen(polaroid)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(polaroid); } }}
        aria-label={`Open photo: ${polaroid.caption}`}
      >
        {/* Photo area with develop animation */}
        <div className="w-[130px] h-[130px] sm:w-[148px] sm:h-[148px] bg-soft-beige overflow-hidden relative">
          {/* Develop effect */}
          <motion.div
            className="absolute inset-0 bg-warm-white pointer-events-none z-10"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, delay: slideDelay + 0.4, ease: 'easeOut' }}
          />
          {/* Sepia fade-in */}
          {src && !imgError ? (
            <motion.img
              src={src}
              alt={polaroid.caption}
              className="w-full h-full object-cover"
              initial={{ filter: 'brightness(1.6) contrast(0.6) sepia(1)', opacity: 0.4 }}
              whileInView={{ filter: 'brightness(1) contrast(1.05) sepia(0.15)', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, delay: slideDelay + 0.5 }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: slideDelay + 1.5 }}
              >
                <span className="text-2xl opacity-30">📷</span>
                <p className="font-handwriting text-xs text-coffee/30 mt-1 leading-tight px-2">
                  {polaroid.assetKey ? 'film loading…' : 'still developing…'}
                </p>
              </motion.div>
            </div>
          )}
        </div>

        {/* Caption writes itself */}
        <motion.p
          className="font-handwriting text-base text-navy text-center mt-2 leading-snug"
          style={{ minHeight: '1.4em' }}
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: slideDelay + 1.8, duration: 0.6 }}
        >
          {polaroid.caption}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ─── Lightbox modal ──────────────────────────────────────────────────────────
function LightboxModal({
  polaroid,
  onClose,
}: {
  polaroid: Polaroid;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const src = polaroid.assetKey ? assetMap[polaroid.assetKey] : null;
  const [imgError, setImgError] = useState(false);

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
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Memory: ${polaroid.caption}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-md" />

      {/* Polaroid enlarged */}
      <motion.div
        className="relative bg-white max-w-sm w-full"
        style={{ padding: '16px 16px 56px 16px', boxShadow: '0 24px 60px rgba(0,0,0,0.28)' }}
        initial={{ scale: 0.75, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.85, opacity: 0, rotate: 4 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.55 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Washi tape on lightbox */}
        <WashiTape
          color={polaroid.tapeColor}
          rotate={polaroid.tapeAngle}
          className="-top-2.5 left-1/2 -translate-x-1/2 z-10"
        />

        {/* Photo */}
        <div className="w-full aspect-square bg-soft-beige overflow-hidden relative">
          {src && !imgError ? (
            <img
              src={src}
              alt={polaroid.caption}
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.12) contrast(1.05)' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="text-4xl opacity-25">📷</span>
              <p className="font-handwriting text-sm text-coffee/30">still developing…</p>
            </div>
          )}
          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.12) 100%)' }}
          />
        </div>

        {/* Date */}
        <motion.p
          className="font-sans text-[10px] tracking-widest uppercase text-coffee/40 mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {polaroid.date}
        </motion.p>

        {/* Caption */}
        <p className="font-handwriting text-xl text-navy text-center mt-0.5">{polaroid.caption}</p>

        {/* Chat snippet */}
        <motion.div
          className="mt-4 space-y-1.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          role="log"
          aria-label="Chat snippet"
        >
          {polaroid.chatSnippet.map((line, i) => (
            <motion.div
              key={i}
              className={`flex ${line.speaker === 'me' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, x: line.speaker === 'me' ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.1, duration: 0.3 }}
            >
              <div
                className={`px-3 py-1.5 max-w-[80%] text-charcoal border border-charcoal/10 ${
                  line.speaker === 'me'
                    ? 'bg-orange/10 rounded-2xl rounded-tr-sm'
                    : 'bg-white rounded-2xl rounded-tl-sm shadow-sm'
                }`}
              >
                <p className="font-letter text-lg leading-snug">{line.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Handwritten memory */}
        <motion.div
          className="mt-4 pt-3 border-t border-charcoal/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {/* Drawn line */}
          <svg className="w-full h-4 mb-1" viewBox="0 0 260 12" aria-hidden="true">
            <motion.path
              d="M 4 8 Q 65 3 130 8 Q 195 13 256 6"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </svg>
          <p className="font-letter text-lg text-coffee/80 italic leading-snug text-center">
            "{polaroid.memory}"
          </p>
        </motion.div>

        {/* Close */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 bg-soft-beige text-coffee/60 flex items-center justify-center rounded-full text-sm hover:bg-orange hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          aria-label="Close photo"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Hidden note card ────────────────────────────────────────────────────────
function HiddenNoteCard({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { hiddenNote } = chapter4Data;

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
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Hidden note"
    >
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" />

      <motion.div
        className="relative max-w-sm w-full"
        initial={{ scaleY: 0.1, opacity: 0, originY: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0.1, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        style={{ transformOrigin: 'top center' }}
      >
        {/* Fold crease top */}
        <div
          className="w-full h-4 bg-[#FFFDE7] border-t-2 border-x-2 border-golden/25"
          style={{ borderRadius: '4px 4px 0 0' }}
          aria-hidden="true"
        />

        {/* Note body */}
        <div
          className="bg-[#FFFDE7] border-x-2 border-b-2 border-golden/25 p-8"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
        >
          {/* Ruled lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-px bg-blue-200/40 mb-6"
              aria-hidden="true"
            />
          ))}
          <div className="absolute top-8 left-8 right-8">
            <p className="font-handwriting text-2xl text-coffee mb-4">{hiddenNote.title}</p>
            <p className="font-letter text-xl text-charcoal/85 leading-relaxed mb-6">
              {hiddenNote.body}
            </p>

            {/* Drawn underline */}
            <svg className="w-full h-5 mb-2" viewBox="0 0 260 16" aria-hidden="true">
              <motion.path
                d="M 4 10 C 50 5, 110 14, 170 8 S 230 12, 256 9"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </svg>

            <p className="font-handwriting text-xl text-coffee/70 text-right italic">
              {hiddenNote.signOff}
            </p>
          </div>
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-6 right-4 w-7 h-7 bg-golden/20 text-coffee/60 flex items-center justify-center rounded-full text-sm hover:bg-orange hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          aria-label="Close note"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ChapterFour({ onNext, onPrev }: ChapterProps) {
  const [openPolaroid, setOpenPolaroid] = useState<Polaroid | null>(null);
  const [noteRevealed, setNoteRevealed] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { polaroids, filmStrip, quote, attribution } = chapter4Data;

  return (
    <>
      <motion.div
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
        style={{ backgroundColor: '#EDE8DF' }}
        variants={shouldReduceMotion ? {} : pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
        aria-label="Chapter Four: Little Moments We Captured"
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px),
              linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <SunlightDrift />

        <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-0 min-h-full">

          {/* ═══════════ LEFT PAGE ═══════════ */}
          <div className="flex-1 lg:border-r lg:border-charcoal/12 lg:pr-10 flex flex-col gap-6 pb-8 lg:pb-0">

            {/* Chapter header */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="font-sans text-xs tracking-[0.35em] uppercase text-coffee/45 mb-1">
                {chapter4Data.chapterNumber}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-coffee leading-tight">
                {chapter4Data.title}
              </h2>
              {/* Drawn underline */}
              <motion.svg className="w-56 h-5 mt-1" viewBox="0 0 230 14" aria-hidden="true">
                <motion.path
                  d="M 0 9 C 46 4, 92 13, 138 7 S 200 11, 230 8"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.3, delay: 0.5 }}
                />
              </motion.svg>
            </motion.div>

            {/* Introduction */}
            <motion.p
              className="font-quote text-xl text-charcoal/80 leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9 }}
            >
              {chapter4Data.intro}
            </motion.p>

            {/* Decorative washi tape strip */}
            <motion.div
              className="relative h-5 w-48 self-start"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              aria-hidden="true"
            >
              <WashiTape color="rgba(232,184,109,0.5)" rotate={-1} className="top-0 left-0 !w-48" />
            </motion.div>

            {/* Handwritten paragraph */}
            <motion.div
              className="relative max-w-sm"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {/* Yellow sticky-note style */}
              <div
                className="bg-[#FEFCE8] p-5 shadow-sm"
                style={{ rotate: '-0.5deg', boxShadow: '2px 3px 8px rgba(0,0,0,0.08)' }}
              >
                <p className="font-letter text-2xl text-charcoal/85 leading-relaxed">
                  {chapter4Data.handwrittenParagraph}
                </p>
                {/* Written underline */}
                <motion.svg className="w-full h-4 mt-2" viewBox="0 0 280 12" aria-hidden="true">
                  <motion.path
                    d="M 4 8 Q 70 3 140 8 Q 210 13 276 6"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  />
                </motion.svg>
              </div>

              {/* Annotation */}
              <motion.p
                className="font-handwriting text-base text-golden/70 italic mt-1 ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {chapter4Data.annotation}
              </motion.p>
            </motion.div>

            {/* Pressed flower */}
            <motion.div
              className="relative self-end mr-8"
              initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ delay: 1.3, duration: 1, type: 'spring', bounce: 0.3 }}
              aria-hidden="true"
            >
              <img
                src={pressedFlower}
                alt=""
                className="w-20 h-24 object-contain opacity-80"
                style={{ filter: 'sepia(0.3) brightness(0.95)' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Tape over flower */}
              <WashiTape
                color="rgba(232,184,109,0.4)"
                rotate={-6}
                className="top-2 left-1/2 -translate-x-1/2"
              />
            </motion.div>

            {/* Film strip */}
            <div className="mt-auto">
              <motion.div
                className="overflow-hidden rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                aria-hidden="true"
              >
                <FilmStrip labels={filmStrip} />
              </motion.div>
            </div>

            {/* Quote */}
            <motion.blockquote
              className="pt-4 border-t border-charcoal/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-quote text-lg text-charcoal/55 italic">{quote}</p>
              <footer className="font-handwriting text-base text-coffee/45 mt-1">{attribution}</footer>
            </motion.blockquote>

            {/* Navigation */}
            <div className="flex gap-4 pb-2">
              <button
                onClick={onPrev}
                className="font-handwriting text-xl text-coffee/55 hover:text-coffee transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
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

          {/* Gutter */}
          <div className="hidden lg:flex flex-col items-center px-3 py-8 gap-1.5" aria-hidden="true">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-px h-3 bg-charcoal/8" />
            ))}
          </div>

          {/* ═══════════ RIGHT PAGE — Polaroid wall ═══════════ */}
          <div className="flex-1 lg:pl-8 flex flex-col gap-4 pb-8">

            {/* Right page header */}
            <motion.div
              className="pt-6 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-handwriting text-2xl text-coffee/60 italic">the camera roll</p>
              <p className="font-sans text-xs tracking-widest text-coffee/30 uppercase">tap to open</p>
            </motion.div>

            {/* Coffee stain — decorative */}
            <div className="relative flex-1">
              <CoffeeStain className="absolute -top-2 -right-2 w-16 h-16" />

              {/* Polaroid grid */}
              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6"
                role="list"
                aria-label="Photo memories"
              >
                {polaroids.map((polaroid, i) => (
                  <div key={polaroid.id} role="listitem">
                    <PolaroidCard
                      polaroid={polaroid}
                      index={i}
                      onOpen={setOpenPolaroid}
                      onNoteReveal={() => { setNoteRevealed(true); setShowNote(true); }}
                      noteRevealed={noteRevealed}
                    />
                  </div>
                ))}
              </div>

              {/* Decorative scattered washi strips */}
              <motion.div
                className="mt-6 flex items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                aria-hidden="true"
              >
                <WashiTape color="rgba(232,184,109,0.45)" rotate={2} className="relative static !w-28 h-4" />
                <p className="font-handwriting text-base text-coffee/40 italic">
                  {noteRevealed ? 'you found the note ✨' : 'one of these has a secret…'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {openPolaroid && (
          <LightboxModal polaroid={openPolaroid} onClose={() => setOpenPolaroid(null)} />
        )}
      </AnimatePresence>

      {/* ── Hidden note ── */}
      <AnimatePresence>
        {showNote && (
          <HiddenNoteCard onClose={() => setShowNote(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
