import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Sunlight drift ──────────────────────────────────────────────────────────
function SunlightDrift() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 w-[55%] h-full"
        style={{ background: 'radial-gradient(ellipse at 15% 25%, rgba(232,184,109,0.14) 0%, transparent 60%)' }}
        animate={{ x: [0, 14, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─── Tiny handwriting annotation ─────────────────────────────────────────────
function Note({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className={`font-handwriting text-[9px] text-[#8B2020]/48 pointer-events-none select-none ${className}`}
    >
      {children}
    </motion.p>
  );
}

// ─── Photo slot (hero / secondary / tertiary) ─────────────────────────────────
// src: real photo when available. Until then shows a clean empty frame.
// liftReveal: if true, tapping lifts the photo to show hidden text beneath.
type PhotoSlotProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  rotate: number;
  delay: number;
  caption: string;
  captionDelay?: number;
  liftReveal?: boolean;
  liftText?: React.ReactNode;
  tapeColor?: string;
};

function PhotoSlot({
  src, alt, width, height, rotate, delay, caption, captionDelay,
  liftReveal = false, liftText, tapeColor = 'rgba(232,184,109,0.5)',
}: PhotoSlotProps) {
  const [lifted, setLifted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.1 }}
      className="relative"
      style={{ width }}
    >
      {/* Hidden text behind photo */}
      {liftReveal && liftText && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden={!lifted}
        >
          <AnimatePresence>
            {lifted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {liftText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Photo frame */}
      <motion.div
        className={`bg-white shadow-md border border-charcoal/5 ${liftReveal ? 'cursor-pointer' : ''}`}
        style={{
          padding: '8px 8px 32px 8px',
          rotate: `${rotate}deg`,
          boxShadow: lifted
            ? '0 24px 40px rgba(0,0,0,0.20)'
            : '0 4px 14px rgba(0,0,0,0.11), 0 1px 4px rgba(0,0,0,0.07)',
        }}
        animate={
          liftReveal && !shouldReduceMotion
            ? { y: lifted ? -28 : 0, rotate: lifted ? rotate + 3 : rotate, zIndex: lifted ? 30 : 1 }
            : { y: 0, rotate }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onClick={liftReveal ? () => setLifted(v => !v) : undefined}
        role={liftReveal ? 'button' : undefined}
        tabIndex={liftReveal ? 0 : undefined}
        aria-label={liftReveal ? (lifted ? 'Set photo down' : 'Lift photo') : undefined}
        onKeyDown={liftReveal ? e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLifted(v => !v); }
        } : undefined}
      >
        {/* Washi tape */}
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 h-5 w-14"
          style={{
            backgroundColor: tapeColor,
            transform: `translateX(-50%) rotate(${rotate * 0.4}deg)`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
          aria-hidden="true"
        />

        {/* Image area */}
        <div
          className="overflow-hidden bg-[#F0EAE0] relative"
          style={{ width: width - 16, height }}
        >
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.08) contrast(1.03)' }} />
          ) : (
            /* Honest empty frame — ready for the real photo */
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-50">
              <svg viewBox="0 0 32 24" width="32" height="24" aria-hidden="true">
                <rect x="1" y="1" width="30" height="22" rx="2" fill="none" stroke="#9C7B4F" strokeWidth="1.2" strokeDasharray="3 2" />
                <circle cx="16" cy="11" r="4" fill="none" stroke="#9C7B4F" strokeWidth="1" />
                <path d="M10 16 L14 11 L18 14 L21 10 L28 18" fill="none" stroke="#9C7B4F" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <p className="font-handwriting text-[9px] text-[#9C7B4F]">{alt}</p>
            </div>
          )}
        </div>

        {/* Caption */}
        <motion.p
          className="font-handwriting text-[10px] text-charcoal/40 text-center mt-1.5 leading-snug"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: captionDelay ?? delay + 1, duration: 0.8 }}
        >
          {caption}
        </motion.p>
      </motion.div>

      {liftReveal && !lifted && (
        <Note delay={delay + 1.2} className="absolute -bottom-5 right-2 rotate-[3deg]">lift to see ↑</Note>
      )}
    </motion.div>
  );
}

// ─── Temple receipt — moment-first, not place-first ───────────────────────────
function TempleReceipt({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2.5 }}
      animate={{ opacity: 1, rotate: -2.5 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 130 }}
    >
      <div className="bg-[#FFFEF8] border border-[#C9A84C]/25 shadow-sm overflow-hidden">
        <div className="bg-[#C9A84C]/10 px-3 py-1 border-b border-[#C9A84C]/15">
          <p className="font-sans text-[6.5px] tracking-[0.25em] uppercase text-[#8B6020]/45 text-center">5 April 2026</p>
        </div>
        <div className="px-3 py-2.5">
          <p className="font-letter text-[11px] text-charcoal/58 leading-relaxed">First temple together.</p>
          <div className="h-px border-t border-dashed border-[#C9A84C]/18 my-1.5" />
          <p className="font-handwriting text-[8px] text-[#8B6020]/30 text-right italic">Hosakote</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── INTERACTION: Folded note (April moment, not future promise) ───────────────
function FoldedNote({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: 1.5 }}
      animate={{ opacity: 1, rotate: 1.5 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 152 }}
    >
      <div className="absolute -top-3 left-4 w-12 h-4 washi-tape -rotate-[1deg]" />
      <Note delay={delay + 0.8} className="absolute -right-2 -top-5 rotate-[4deg]">April.</Note>

      <div
        className="bg-[#FFFEF8] border border-[#C9A84C]/28 shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-[#C9A84C]/25"
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Fold note' : 'Open note'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        <div className="px-4 pt-3 pb-2 border-b border-[#C9A84C]/12 flex items-center justify-between">
          <p className="font-sans text-[7px] tracking-[0.28em] uppercase text-[#8B6020]/35">Note</p>
          <motion.span animate={{ rotate: opened ? 90 : 0 }} transition={{ duration: 0.4 }}
            className="text-[10px] text-[#C9A84C]/35" aria-hidden="true">▷</motion.span>
        </div>

        <AnimatePresence initial={false}>
          {!opened && (
            <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} className="px-4 py-3">
              <div className="space-y-1.5">
                {[3.5, 2.5, 4].map((w, i) => (
                  <div key={i} className="h-px bg-[#C9A84C]/15" style={{ width: `${w / 4 * 100}%` }} />
                ))}
              </div>
              <p className="font-handwriting text-[8px] text-charcoal/20 text-right mt-2 italic">tap to open</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {opened && (
            <motion.div key="open" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden">
              <div className="px-5 py-4 space-y-0.5">
                {[
                  { text: 'Let\'s pray together.', d: 0.1 },
                  { text: '', d: 0.2 },
                  { text: 'We did.', d: 0.5 },
                  { text: '', d: 0.6 },
                  { text: '5 April 2026', d: 0.9 },
                ].map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: line.d, duration: 0.9 }}
                    className="font-letter text-[13px] text-charcoal/65 leading-relaxed min-h-[18px]">
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
      <div className="absolute inset-0 pointer-events-none paper-texture" aria-hidden="true" />
      <SunlightDrift />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 py-8 z-10 relative flex flex-col gap-7">

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#8B6020]/38 mb-1">Chapter Four · April 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#7C4A10] leading-tight">Where We Found<br />Peace</h2>
            <motion.svg className="w-44 h-4 mt-1.5" viewBox="0 0 180 12" aria-hidden="true">
              <motion.path d="M0 7 Q45 3 90 7 Q135 11 180 6"
                fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.7 }} />
            </motion.svg>
          </motion.div>

          {/* HERO PHOTO — temple, with lift interaction */}
          {/* When real photo is ready: src="@assets/..." */}
          <div className="relative">
            <PhotoSlot
              alt="First temple together"
              width={260}
              height={200}
              rotate={-1.5}
              delay={0.6}
              caption="5 April 2026"
              captionDelay={1.4}
              liftReveal={true}
              tapeColor="rgba(201,168,76,0.45)"
              liftText={
                <div className="text-center select-none">
                  <p className="font-handwriting text-sm text-[#7C4A10]/70">12 April 2026</p>
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-charcoal/35 mt-0.5">Halasuru Temple</p>
                </div>
              }
            />
            {/* Note attached below the photo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="font-letter text-sm text-charcoal/55 mt-3 ml-2 leading-relaxed"
            >
              Some places become special<br />
              <span className="ml-4 text-charcoal/40">because of who stood beside you.</span>
            </motion.p>
          </div>

          {/* Temple receipt — attached to left page context */}
          <div className="ml-4">
            <TempleReceipt delay={1.8} />
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-auto pt-6">
            <button
              onClick={onPrev}
              className="font-handwriting text-xl text-[#8B6020]/50 hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2"
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
          <div className="relative flex flex-col gap-6">

            {/* SECONDARY PHOTO — saree & dhoti, with note attached */}
            <div className="relative self-end mr-4">
              <PhotoSlot
                alt="Saree & Dhoti"
                width={210}
                height={164}
                rotate={2.5}
                delay={1}
                caption="12–13 April"
                captionDelay={1.9}
                tapeColor="rgba(139,32,32,0.18)"
              />
              {/* Note attached below this photo */}
              <Note delay={2.1} className="absolute -bottom-5 left-3 rotate-[1deg] !text-[9px]">
                Both of us in temple clothes.
              </Note>
            </div>

            {/* Folded note — stands in as the one real interaction */}
            <div className="self-start ml-6">
              <FoldedNote delay={1.5} />
            </div>

            {/* TERTIARY PHOTO — Swayam Fest */}
            <div className="relative self-center ml-2">
              <PhotoSlot
                alt="Swayam Fest"
                width={180}
                height={140}
                rotate={-2}
                delay={1.3}
                caption="28–29 April"
                captionDelay={2.2}
                tapeColor="rgba(232,184,109,0.4)"
              />
              {/* Note attached */}
              <Note delay={2.4} className="absolute -bottom-5 right-2 -rotate-[2deg] !text-[9px]">
                walking. talking. nothing in particular.
              </Note>
            </div>

            {/* Ending — quiet, bottom right */}
            <motion.div
              className="self-end pr-2 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 2 }}
            >
              <p className="font-quote text-sm text-charcoal/32 italic text-right">Some memories</p>
              <p className="font-quote text-sm text-charcoal/25 italic text-right">never needed words.</p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
