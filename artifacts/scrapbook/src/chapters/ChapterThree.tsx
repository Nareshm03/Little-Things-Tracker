/**
 * Chapter Three — When Everyday Became Home
 *
 * Architecture: single-column scroll narrative.
 * Each section is a beat in the story — not a collection, but a journey.
 *
 * Objects on this page (6 total, down from 12):
 *   1. Heading          — establishes the chapter
 *   2. The Letter       — emotional centerpiece, unfolds on click
 *   3. Cinema Ticket    — small contextual footnote beneath the letter
 *   4. Birthday Photo   — visual hero, develops as a polaroid
 *   5. Chat moment      — two messages, the whole relationship in two lines
 *   6. Closing quote    — resolution, breathing room
 *
 * Everything else was cut. If it couldn't answer "what emotion does it create?"
 * it was removed.
 */

import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ChapterProps } from '../App';
import birthdayPhoto from '@assets/00003349-PHOTO-2026-03-11-20-20-02_1782729987549.jpg';
import photoAutoPout  from '@assets/FullSizeRender_1782795167754.jpeg';

// ─── Viewport scroll reveal ────────────────────────────────────────────────────
// Every section enters once — opacity+y — never restarts.

const reveal = (delay = 0, reducedMotion: boolean | null = false) => ({
  initial:     { opacity: 0, y: reducedMotion ? 0 : 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-64px' },
  transition:  reducedMotion
    ? { duration: 0.15, delay: 0 }
    : { duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

// ─── Subtle mouse parallax ─────────────────────────────────────────────────────
// Max 4px, spring-smoothed. Respects prefers-reduced-motion.

function useMouseParallax(maxPx = 4) {
  const shouldReduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x  = useSpring(mx, { stiffness: 50, damping: 22, mass: 0.4 });
  const y  = useSpring(my, { stiffness: 50, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const h = (e: MouseEvent) => {
      mx.set(((e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2)) * maxPx);
      my.set(((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * maxPx);
    };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, [shouldReduceMotion, mx, my, maxPx]);

  return shouldReduceMotion
    ? { x: 0 as unknown as typeof x, y: 0 as unknown as typeof y }
    : { x, y };
}

// ─── 1. THE LETTER — emotional centerpiece ─────────────────────────────────────
// Handwriting font for emotion. The letter unfolds smoothly on click.
// Tape peels gently on hover — a physical memory coming alive.

function FoldedLetter({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggle = () => setOpened(v => !v);
  const onKey  = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  };

  return (
    <motion.div {...reveal(delay, shouldReduceMotion)} className="relative w-full">

      {/* Tape — peels on hover */}
      <motion.div
        className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape z-20"
        style={{ width: 68, height: 18 }}
        whileHover={!shouldReduceMotion
          ? { rotate: -3, scaleX: 0.92, transformOrigin: 'right center' }
          : undefined}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      />

      {/* Coffee stain — corner detail */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 14, right: -8,
          width: 34, height: 30, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140,90,40,0.11) 55%, transparent 85%)',
          border: '1px solid rgba(140,90,40,0.06)',
          zIndex: 30, pointerEvents: 'none', filter: 'blur(1px)',
        }}
      />

      {/* Letter card */}
      <motion.div
        className="bg-[#FEFCE8] border border-[#D4C89A]/55 cursor-pointer w-full"
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        }}
        whileHover={!shouldReduceMotion
          ? { y: -3, boxShadow: '0 12px 36px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.07)' }
          : undefined}
        transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Fold letter' : 'Unfold letter'}
        aria-expanded={opened}
        onKeyDown={onKey}
      >
        {/* Header — always visible */}
        <div className="px-6 pt-5 pb-3 border-b border-[#D4C89A]/30 flex items-center justify-between">
          <p className="font-handwriting text-[17px] text-charcoal/38 tracking-wide">
            2 March 2026 — 11:17 PM
          </p>
          <div className="w-7 h-7 rounded-full bg-[#8B2020]/10 border border-[#8B2020]/18 flex items-center justify-center flex-shrink-0 ml-3">
            <span className="font-display text-[15px] text-[#8B2020]/42 font-bold">N</span>
          </div>
        </div>

        {/* Closed state — folded lines */}
        <AnimatePresence initial={false}>
          {!opened && (
            <motion.div key="closed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="px-7 py-6"
            >
              <div className="space-y-3">
                {[0.82, 0.95, 0.58, 0.88, 0.72, 0.64, 0.78].map((w, i) => (
                  <div key={i} className="h-px bg-[#D4C89A]/26" style={{ width: `${w * 100}%` }} />
                ))}
              </div>
              <p className="font-handwriting text-[16px] text-charcoal/26 text-right mt-5 italic">
                tap to unfold
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open state — ink fades in, paragraph by paragraph */}
        <AnimatePresence initial={false}>
          {opened && (
            <motion.div key="open"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden relative"
            >
              {/* Ruled lines */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {Array.from({ length: 34 }).map((_, i) => (
                  <div key={i} className="border-b border-[#B8A880]/7" style={{ height: 28 }} />
                ))}
              </div>
              {/* Margin line */}
              <div className="absolute left-[52px] top-0 bottom-0 w-px bg-[#C87070]/8 pointer-events-none" aria-hidden="true" />

              <div className="px-7 py-6 relative pb-10" style={{ paddingLeft: 60 }}>
                {[
                  { text: 'Dear Meghana,',                                              d: 0.1, gap: 4 },
                  { text: 'Every night before I sleep, I think about you…',             d: 0.4, indent: true },
                  { text: 'and suddenly the whole day feels your presence…',            d: 0.7, gap: 3 },
                  { text: 'I ',                                                         d: 1.0, special: 'crossed', gap: 0 },
                  { text: 'love you so deeply that sometimes',                          d: 1.0, indent: true, after: true },
                  { text: 'I don\'t even have the right words for it.',                 d: 1.3, gap: 3 },
                  { text: 'It\'s not just love… it\'s comfort, peace and that',         d: 1.6, indent: true },
                  { text: 'feeling of home with you…',                                 d: 1.9, gap: 3 },
                  { text: 'I miss your presence in the smallest moments —',             d: 2.2, indent: true },
                  { text: 'your voice, your fragrance and just you…',                  d: 2.5, gap: 3 },
                  { text: 'Sleep peacefully, my beautiful girl.',                       d: 2.8, indent: true },
                  { text: 'May your dreams be wonderful — filled with me.',             d: 3.1, gap: 4 },
                  { text: 'Good night, baby.',                                          d: 3.5 },
                  { text: 'I love you more than I can explain.',                        d: 3.8, gap: 4 },
                  { text: 'Love,',                                                      d: 4.1 },
                  { text: 'N',                                                          d: 4.4, sig: true },
                ].map((line, i) => {
                  if (line.special === 'crossed') {
                    return (
                      <motion.p key={i}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: line.d, duration: 1.1 }}
                        className="font-letter text-[19px] text-charcoal/78 leading-[1.85] indent-6"
                        style={{ marginBottom: line.gap ? `${line.gap * 4}px` : undefined }}
                      >
                        I{' '}
                        <span style={{ textDecoration: 'line-through', opacity: 0.38 }}>like</span>
                        {' '}love you so deeply that sometimes
                      </motion.p>
                    );
                  }
                  if (line.after) return null; // already rendered inline above
                  return (
                    <motion.p key={i}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: line.d, duration: 1.1 }}
                      className={`font-letter text-charcoal/78 leading-[1.85] ${
                        line.sig ? 'text-xl text-charcoal/78' : 'text-[19px]'
                      } ${line.indent ? 'indent-6' : ''}`}
                      style={{ marginBottom: line.gap ? `${line.gap * 4}px` : undefined }}
                    >
                      {line.text}
                    </motion.p>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── 2. CINEMA TICKET — contextual footnote ────────────────────────────────────
// Small. Quiet. Not competing. Answers: "we went to the cinema this month."
// Gentle perpetual swing after settling — the ticket is pinned, not placed.

function CinemaTicket({ delay }: { delay: number }) {
  const [settled, setSettled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: -10 }}
      animate={settled && !shouldReduceMotion
        ? { opacity: 1, y: [0, -2, 0], rotate: [-3, -1.5, -3] }
        : { opacity: 1, y: 0, rotate: -3 }
      }
      transition={settled && !shouldReduceMotion
        ? {
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          }
        : {
            opacity: { delay, duration: 0.4 },
            y: { type: 'spring', stiffness: 40, damping: 10, delay },
            rotate: { type: 'spring', stiffness: 40, damping: 10, delay },
          }
      }
      onAnimationComplete={() => { if (!settled) setSettled(true); }}
      style={{ width: 154, transformOrigin: 'top center' }}
    >
      {/* Push-pin */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-20"
        style={{ background: 'rgba(212,132,74,0.48)', border: '1.5px solid rgba(212,132,74,0.28)', boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}
        aria-hidden="true"
      />

      <div
        className="bg-[#1A1A2E] rounded-sm relative overflow-hidden"
        style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.20), 0 1px 4px rgba(0,0,0,0.10)', opacity: 0.88 }}
      >
        <div className="px-3 py-2 border-b border-white/8 text-center">
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-white/38">Cinema · March 2026</p>
        </div>
        <div className="px-3 py-2.5 text-center">
          <p className="font-sans text-[11px] tracking-widest uppercase text-white/25 mb-1">Seats</p>
          <p className="font-display text-lg text-white/75 tracking-wider">15 • 16</p>
        </div>
        <div className="border-t border-dashed border-white/10 mx-2" />
        <div className="px-3 py-2 space-y-1">
          <div className="flex justify-end">
            <p className="font-sans text-[12px] text-white/48 bg-white/5 px-2 py-0.5 rounded-lg rounded-tr-none leading-snug">
              Book any corner seats know...
            </p>
          </div>
          <div className="flex justify-start">
            <p className="font-sans text-[12px] text-[#C8924A]/60 bg-[#C8924A]/5 px-2 py-0.5 rounded-lg rounded-tl-none leading-snug">
              I booked.
            </p>
          </div>
        </div>
        <p className="text-center text-xs opacity-20 pb-1.5" aria-hidden="true">🍿</p>
      </div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6, duration: 1 }}
        className="font-handwriting text-[15px] text-charcoal/30 text-center mt-1 italic pointer-events-none"
      >
        don't lose this.
      </motion.p>
    </motion.div>
  );
}

// ─── 3. BIRTHDAY PHOTO — visual hero ──────────────────────────────────────────
// The ONE centerpiece. Isolated. Surrounded by whitespace.
// It develops like a physical polaroid as it enters the viewport.

function BirthdayPolaroid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2.5 }}
      whileInView={{ opacity: 1, rotate: -2.5 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative inline-block"
      style={{ width: 264 }}
    >
      {/* Washi tape */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
        style={{
          width: 72, height: 18,
          backgroundColor: 'rgba(232,184,109,0.45)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          transform: 'translateX(-50%) rotate(1deg)',
        }}
        aria-hidden="true"
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 1.5 }}
        className="absolute -right-6 -top-6 font-handwriting text-[17px] text-[#8B2020]/48 rotate-[6deg] pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        favorite memory.
      </motion.p>

      {/* Polaroid frame */}
      <motion.div
        className="bg-white relative overflow-hidden"
        style={{
          padding: '10px 10px 40px 10px',
          boxShadow: '0 10px 36px rgba(0,0,0,0.22), 0 4px 10px rgba(0,0,0,0.10)',
        }}
        whileHover={!shouldReduceMotion
          ? {
              y: -8, rotate: -1,
              boxShadow: '0 20px 52px rgba(0,0,0,0.26), 0 8px 18px rgba(0,0,0,0.12)',
            }
          : undefined}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* The photo develops as it enters view — brightness/saturation animate in */}
        <motion.img
          src={birthdayPhoto}
          alt="Naresh and Meghana on her birthday — sunset, a pink flower"
          initial={shouldReduceMotion ? {} : {
            filter: 'brightness(2.8) saturate(0) blur(2px) sepia(0)',
          }}
          whileInView={shouldReduceMotion ? {} : {
            filter: 'brightness(1.04) saturate(1.14) blur(0px) sepia(0.10)',
          }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 2.2, delay: 0.4, ease: 'easeOut' }}
          style={{
            width: '100%', height: 218,
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Bent corner */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 18, height: 18,
            background: 'linear-gradient(135deg, transparent 50%, rgba(200,180,140,0.38) 50%)',
          }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="font-handwriting text-[17px] text-charcoal/42 text-center mt-3"
      >
        11 March 2026
      </motion.p>
    </motion.div>
  );
}

// ─── 4. CHAT MOMENT — the whole relationship in two lines ──────────────────────
// Two messages. That's the whole story: she arrived safe; he checked.
// Left bubble slides from the left. Right bubble from the right.

function ChatMoment({ delay }: { delay: number }) {
  const shouldReduceMotion = useReducedMotion();
  const d = shouldReduceMotion ? 0 : 24;

  return (
    <div className="space-y-2.5">
      {/* Her message — arrives from left */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0, x: -d }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="rounded-xl rounded-tl-none px-4 py-2.5"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(45,45,45,0.08)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            maxWidth: '72%',
          }}
        >
          <p className="font-sans text-[16px] text-[#111]/76 leading-snug">I reached PG.</p>
          <p className="font-sans text-[13px] text-[#888] text-right mt-1">11:09 PM</p>
        </div>
      </motion.div>

      {/* His reply — arrives from right */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, x: d }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: delay + 0.25, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="rounded-xl rounded-tr-none px-4 py-2.5"
          style={{
            background: '#DCF8C6',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            maxWidth: '66%',
          }}
        >
          <p className="font-sans text-[16px] text-[#111]/76 leading-snug">Got bus?</p>
          <p className="font-sans text-[13px] text-[#888] text-right mt-1">11:10 PM ✓✓</p>
        </div>
      </motion.div>

      {/* Tiny annotation */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.8, duration: 1.2 }}
        className="font-handwriting text-[16px] text-charcoal/30 italic text-right pr-1 pointer-events-none"
        aria-hidden="true"
      >
        same route. every night.
      </motion.p>
    </div>
  );
}

// ─── 5. AUTO POUT — a single small warm memory ────────────────────────────────
// Not competing. Just a moment, placed after the chat.

function AutoPout({ delay }: { delay: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      {...reveal(delay, shouldReduceMotion)}
      className="relative inline-block"
      style={{ rotate: '2deg' }}
    >
      <div
        className="absolute -top-2.5 left-1/2 z-10"
        style={{
          width: 36, height: 13,
          backgroundColor: 'rgba(232,184,109,0.42)',
          transform: 'translateX(-50%) rotate(-1.5deg)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="bg-white border border-charcoal/5 relative overflow-hidden"
        style={{ padding: '4px 4px 20px 4px', boxShadow: '0 3px 12px rgba(0,0,0,0.09)' }}
        whileHover={!shouldReduceMotion
          ? { y: -5, rotate: 3.5, boxShadow: '0 10px 28px rgba(0,0,0,0.14)' }
          : undefined}
        transition={{ duration: 0.35 }}
      >
        <img
          src={photoAutoPout}
          alt="Being herself in an auto"
          style={{
            width: 110, height: 132,
            objectFit: 'cover', objectPosition: 'center top',
            filter: 'saturate(0.84) hue-rotate(-8deg) brightness(1.03)',
            display: 'block',
          }}
        />
        <p className="font-handwriting text-[15px] text-charcoal/38 text-center mt-1.5">auto rides 😂</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Chapter Three ─────────────────────────────────────────────────────────────

export default function ChapterThree({ onNext, onPrev }: ChapterProps) {
  const { x: px, y: py } = useMouseParallax(3);
  const shouldReduceMotion = useReducedMotion();

  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit:    { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 bg-soft-beige w-full h-full overflow-y-auto overflow-x-hidden paper-texture"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      aria-label="Chapter Three: When Everyday Became Home"
    >
      {/* Morning light — left edge only, quiet */}
      <div
        className="absolute top-0 left-0 w-1/3 h-full pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(255,246,236,0.36), transparent)' }}
        aria-hidden="true"
      />

      {/* Board-level parallax — max 3px, barely perceptible */}
      <motion.div style={{ x: px, y: py }}>

        {/* Single column — the page is a spine, not a bulletin board */}
        <div className="max-w-lg mx-auto px-4 sm:px-8">

          {/* ═══ BEAT 1: Heading ═══════════════════════════════════════════════ */}
          {/* Tall. Breathing room. The chapter announces itself then steps back. */}
          <section className="flex flex-col justify-center min-h-[56vh] pt-16 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Label — sans-serif, readable, quiet */}
              <p className="font-sans text-xs tracking-[0.44em] uppercase mb-3"
                style={{ color: 'rgba(139,111,71,0.55)' }}>
                Chapter Three
              </p>

              {/* Month — handwriting for emotion, not for reading */}
              <p className="font-handwriting text-[22px] mb-2"
                style={{ color: 'rgba(111,78,55,0.55)' }}>
                March 2026
              </p>

              {/* Title — display serif, high contrast, sets the story */}
              <h2
                className="font-display font-light"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 3.2rem)', lineHeight: 1.22, color: '#5C3510' }}
              >
                When Everyday<br />Became Home
              </h2>

              {/* Animated underline — draws itself in */}
              <motion.svg
                className="mt-4"
                style={{ width: 180, height: 12 }}
                viewBox="0 0 180 12"
                aria-hidden="true"
              >
                <motion.path
                  d="M 0 8 C 40 3, 90 11, 135 6 S 165 9, 180 7"
                  fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                />
              </motion.svg>
            </motion.div>
          </section>

          {/* ═══ BEAT 2: The Letter ════════════════════════════════════════════ */}
          {/* The emotional centerpiece. Unfolds to reveal the words.            */}
          {/* Ticket appears below — a quiet footnote, never competing.          */}
          <section className="pb-16">

            <FoldedLetter delay={0.4} />

            {/* Ticket — footnote, below-right, not overlapping letter text */}
            <div className="flex justify-end mt-3 mr-2">
              <CinemaTicket delay={1.0} />
            </div>

          </section>

          {/* ═══ BEAT 3: The Photo ════════════════════════════════════════════ */}
          {/* One memory. Isolated. Surrounded by silence.                       */}
          {/* Develops as a polaroid — you watch it appear.                      */}
          <section className="pb-16 flex justify-center sm:justify-end sm:pr-8">
            <BirthdayPolaroid />
          </section>

          {/* ═══ BEAT 4: The Daily Language ═══════════════════════════════════ */}
          {/* Two messages. The whole relationship in two lines.                 */}
          {/* Small photo beside — a warm, human moment.                         */}
          <section className="pb-16">

            <motion.p
              {...reveal(0, shouldReduceMotion)}
              className="font-sans text-xs tracking-[0.36em] uppercase mb-5"
              style={{ color: 'rgba(139,111,71,0.42)' }}
            >
              All of March
            </motion.p>

            <div className="flex items-end gap-6">
              <div className="flex-1">
                <ChatMoment delay={0.1} />
              </div>
              <div className="flex-shrink-0 pb-1">
                <AutoPout delay={0.5} />
              </div>
            </div>

          </section>

          {/* ═══ BEAT 5: Resolution ═══════════════════════════════════════════ */}
          {/* Whitespace IS the storytelling here. The quote arrives after       */}
          {/* everything else has settled. It's the exhale.                      */}
          <section className="pt-6 pb-20">

            <motion.div
              {...reveal(0, shouldReduceMotion)}
              className="border-t border-charcoal/8 pt-10 text-center"
            >
              <p className="font-quote italic leading-[1.95]"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.12rem)', color: 'rgba(45,45,45,0.50)' }}>
                We didn't become closer<br />
                because everything went right.
              </p>
              <p className="font-quote italic leading-[1.95] mt-4"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.12rem)', color: 'rgba(45,45,45,0.62)' }}>
                We became closer<br />
                because we kept coming back.
              </p>
            </motion.div>

            {/* Navigation — at the very end, after the story is told */}
            <motion.div
              {...reveal(0.2, shouldReduceMotion)}
              className="flex items-center justify-between mt-14 pt-6 border-t border-charcoal/8"
            >
              <button
                onClick={onPrev}
                className="font-sans text-xs text-charcoal/38 hover:text-coffee transition-colors tracking-widest uppercase min-h-[44px] px-2 flex items-center"
              >
                ← Chapter Two
              </button>
              <button
                onClick={onNext}
                className="font-sans text-xs text-charcoal/50 hover:text-coffee transition-colors tracking-widest uppercase min-h-[44px] px-2 flex items-center"
              >
                Next →
              </button>
            </motion.div>

          </section>

        </div>
      </motion.div>
    </motion.div>
  );
}
