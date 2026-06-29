import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import birthdayPhoto from '@assets/00003349-PHOTO-2026-03-11-20-20-02_1782729987549.jpg';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DateLine({ date, delay = 0 }: { date: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="flex items-center gap-3 my-3"
    >
      <div className="flex-1 h-px bg-charcoal/10" />
      <p className="font-handwriting text-[10px] text-charcoal/32 tracking-wide whitespace-nowrap">{date}</p>
      <div className="flex-1 h-px bg-charcoal/10" />
    </motion.div>
  );
}

// ─── INTERACTIVE 1: Folded Letter ─────────────────────────────────────────────
// "Every night before I sleep..."
// The letter unfolds. Ink fades in. Nothing else moves.

function FoldedLetter({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className="relative"
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 washi-tape rotate-[1deg]" />

      {/* Letter card */}
      <div
        className="bg-[#FEFCE8] border border-[#D4C89A]/50 shadow-md overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-coffee/20"
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Fold letter' : 'Unfold letter'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        {/* Fold creases — visible when closed */}
        <AnimatePresence initial={false}>
          {!opened && (
            <motion.div
              key="folded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="px-5 py-5"
            >
              <div className="border-b border-[#D4C89A]/40 pb-3 mb-3 flex items-center justify-between">
                <p className="font-handwriting text-[10px] text-charcoal/32 tracking-wide">March 2026</p>
                {/* Wax seal */}
                <div className="w-7 h-7 rounded-full bg-[#8B2020]/15 border border-[#8B2020]/20 flex items-center justify-center">
                  <span className="font-display text-[9px] text-[#8B2020]/40 font-bold">N</span>
                </div>
              </div>
              <div className="border-t border-[#D4C89A]/30 pt-3 space-y-1.5">
                <div className="h-px bg-[#D4C89A]/20 w-3/4" />
                <div className="h-px bg-[#D4C89A]/20 w-full" />
                <div className="h-px bg-[#D4C89A]/20 w-5/6" />
              </div>
              <p className="font-handwriting text-[10px] text-charcoal/28 text-center mt-4 italic">tap to unfold</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open state — ink fades in line by line */}
        <AnimatePresence initial={false}>
          {opened && (
            <motion.div
              key="open"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 py-6 relative">
                {/* Ruled lines in background */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <div key={i} className="border-b border-[#B8A880]/12" style={{ height: 28 }} />
                  ))}
                </div>

                <div className="relative space-y-1.5 pb-4">
                  {[
                    { text: 'Every night before I sleep,', delay: 0.1 },
                    { text: 'I think about you.', delay: 0.5 },
                    { text: '', delay: 0.8 },
                    { text: 'Not because I have to.', delay: 0.9 },
                    { text: 'Because you just... appear.', delay: 1.3 },
                  ].map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: line.delay, duration: 1.2 }}
                      className="font-letter text-sm text-charcoal/72 leading-relaxed min-h-[20px]"
                    >
                      {line.text}
                    </motion.p>
                  ))}
                </div>

                {/* Gradient fade — letter continues beyond view */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#FEFCE8] to-transparent pointer-events-none" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Movie Ticket ─────────────────────────────────────────────────────
// Slightly faded. Seats 15 • 16. The chat below.

function MovieTicket({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2 }}
      animate={{ opacity: 1, rotate: -2 }}
      transition={{ delay, duration: 1 }}
      className="relative flex-shrink-0"
      style={{ width: 140 }}
    >
      {/* Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C8924A]/40 border border-[#C8924A]/30 z-10" />

      <div className="bg-[#1A1A2E] rounded-sm overflow-hidden shadow-md" style={{ opacity: 0.88 }}>
        {/* Header */}
        <div className="px-3 py-2 border-b border-white/10">
          <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-white/40 text-center">Cinema</p>
          <p className="font-display text-xs text-[#C8924A]/80 text-center mt-0.5">March 2026</p>
        </div>
        {/* Seats */}
        <div className="px-3 py-3 text-center">
          <p className="font-sans text-[8px] tracking-widest uppercase text-white/30 mb-1">Seats</p>
          <p className="font-display text-2xl text-white/75 tracking-wider">15 • 16</p>
          <p className="font-sans text-[8px] text-white/25 mt-1">Middle Row</p>
        </div>
        {/* Perforated line */}
        <div className="border-t border-dashed border-white/15 mx-2" />
        {/* Chat */}
        <div className="px-3 py-3 space-y-1.5">
          <div className="flex justify-end">
            <p className="font-sans text-[9px] text-white/50 bg-white/8 px-2 py-1 rounded-lg rounded-tr-none max-w-[90%]">
              Book any corner seats know...
            </p>
          </div>
          <div className="flex justify-start">
            <p className="font-sans text-[9px] text-[#C8924A]/65 bg-[#C8924A]/8 px-2 py-1 rounded-lg rounded-tl-none max-w-[90%]">
              I booked.
            </p>
          </div>
        </div>
        {/* Popcorn doodle */}
        <div className="text-center pb-2" aria-hidden="true">
          <span className="text-sm opacity-30">🍿</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Handwriting Strip ────────────────────────────────────────────────
// Assignment paper. Real exchange. Tiny. Funny.

function HandwritingStrip({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 1.5 }}
      animate={{ opacity: 1, rotate: 1.5 }}
      transition={{ delay, duration: 0.9 }}
    >
      <div className="absolute -top-3 right-4 w-10 h-4 washi-tape -rotate-[2deg]" />
      <div className="bg-white border border-charcoal/8 shadow-sm px-4 py-3" style={{ borderLeft: '3px solid #D4C89A' }}>
        {/* Ruled lines */}
        <div className="space-y-px mb-2" aria-hidden="true">
          <div className="h-px bg-[#B8D4E8]/25 w-full" />
          <div className="h-px bg-[#B8D4E8]/25 w-full" />
        </div>
        <p className="font-letter text-xs text-charcoal/65">
          See how worst is my handwriting
        </p>
        <p className="font-letter text-xs text-coffee/60 mt-1.5 italic">
          "It's looking good from far 😂"
        </p>
        <div className="space-y-px mt-2" aria-hidden="true">
          <div className="h-px bg-[#B8D4E8]/25 w-full" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Tobby Polaroid ───────────────────────────────────────────────────

function TobbyPolaroid({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 3 }}
      animate={{ opacity: 1, rotate: 3 }}
      transition={{ delay, duration: 1 }}
      className="relative flex-shrink-0"
    >
      <div className="absolute -top-3 left-3 w-12 h-4 washi-tape rotate-[1deg]" />
      <div className="bg-white p-2 pb-6 shadow-md border border-charcoal/5" style={{ width: 120 }}>
        {/* Dog doodle in polaroid space */}
        <svg viewBox="0 0 96 80" width="96" height="80" className="block bg-[#F5F0E8]" aria-label="Tobby the dog">
          {/* Body */}
          <ellipse cx="48" cy="54" rx="26" ry="18" fill="#C8A87A" />
          {/* Head */}
          <ellipse cx="48" cy="32" rx="20" ry="18" fill="#D4B48A" />
          {/* Floppy ears */}
          <ellipse cx="29" cy="36" rx="10" ry="14" fill="#B89060" transform="rotate(-15 29 36)" />
          <ellipse cx="67" cy="36" rx="10" ry="14" fill="#B89060" transform="rotate(15 67 36)" />
          {/* Eyes */}
          <circle cx="41" cy="30" r="4" fill="#3D2A1A" />
          <circle cx="55" cy="30" r="4" fill="#3D2A1A" />
          <circle cx="42" cy="28.5" r="1.2" fill="white" />
          <circle cx="56" cy="28.5" r="1.2" fill="white" />
          {/* Nose */}
          <ellipse cx="48" cy="38" rx="5" ry="3.5" fill="#3D2A1A" />
          {/* Mouth */}
          <path d="M44 41 Q48 45 52 41" fill="none" stroke="#3D2A1A" strokeWidth="1.2" strokeLinecap="round" />
          {/* Tail */}
          <path d="M72 60 Q84 50 80 42" fill="none" stroke="#C8A87A" strokeWidth="5" strokeLinecap="round" />
          {/* Paws */}
          <ellipse cx="34" cy="68" rx="8" ry="5" fill="#C8A87A" />
          <ellipse cx="62" cy="68" rx="8" ry="5" fill="#C8A87A" />
        </svg>
        <p className="font-handwriting text-[10px] text-charcoal/50 text-center mt-2 leading-tight">
          Tobby
        </p>
      </div>
      {/* Chat below */}
      <div className="mt-2 space-y-1 px-1">
        <p className="font-letter text-[10px] text-charcoal/55">
          "Tobby is looking handsome."
        </p>
        <p className="font-letter text-[10px] text-coffee/50 italic">
          "He is more handsome I guess 😂"
        </p>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Daily Care Strips ────────────────────────────────────────────────
// Cut WhatsApp strips. Dozens of times in March. That's why they matter.

const careMessages = [
  { msg: 'Had breakfast?', side: 'out' },
  { msg: 'Reached PG?', side: 'in' },
  { msg: 'Go eat.', side: 'out' },
  { msg: 'Sleep properly.', side: 'out' },
  { msg: 'Drink water.', side: 'in' },
];

function DailyCareStrips({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
    >
      <div className="absolute -top-3 left-2 w-12 h-4 washi-tape rotate-[2deg]" />
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm p-3">
        <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-charcoal/28 mb-2.5 text-center">Every day. All of March.</p>
        <div className="space-y-1.5">
          {careMessages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.side === 'out' ? 8 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.15 * i, duration: 0.7 }}
              className={`flex ${m.side === 'out' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`px-2.5 py-1 rounded-lg text-[10px] font-sans max-w-[80%] ${
                m.side === 'out'
                  ? 'bg-[#DCF8C6] text-[#0A0A0A]/65 rounded-tr-none'
                  : 'bg-white text-[#0A0A0A]/55 rounded-tl-none border border-charcoal/6'
              }`}>
                {m.msg}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── INTERACTIVE 2: Surprise Lunch ────────────────────────────────────────────
// A folded paper bag. When opened — three lines. No drama. Just kindness.

function LunchWrapper({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -1.5 }}
      animate={{ opacity: 1, rotate: -1.5 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 184 }}
    >
      <div className="absolute -top-3 right-3 w-14 h-4 washi-tape rotate-[1deg]" />
      <div
        className="overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-coffee/20"
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Close lunch wrapper' : 'Open lunch wrapper'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        {/* Paper bag */}
        <div className="bg-[#C8924A]/20 border border-[#C8924A]/25 px-4 py-3 relative">
          {/* Bag folds */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#C8924A]/15 border-b border-[#C8924A]/20" />
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="font-handwriting text-sm text-[#7C4A0A]/60">Surprise 🍱</p>
              <p className="font-sans text-[9px] text-charcoal/30 mt-0.5">tap to open</p>
            </div>
            <motion.span
              animate={{ rotate: opened ? 90 : 0 }}
              transition={{ duration: 0.4 }}
              className="text-base opacity-30"
              aria-hidden="true"
            >▷</motion.span>
          </div>
        </div>

        {/* Contents — revealed on open */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-[#FEFCE8] border border-t-0 border-[#C8924A]/20 px-5 py-4">
                {[
                  { text: 'I brought you lunch...', delay: 0.1 },
                  { text: 'Sorry...', delay: 0.5 },
                  { text: 'It\'s okay madam.', delay: 0.9, style: 'italic text-coffee/55' },
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: line.delay, duration: 0.9 }}
                    className={`font-letter text-sm text-charcoal/65 leading-relaxed ${line.style || ''}`}
                  >
                    {line.text}
                  </motion.p>
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 1 }}
                  className="font-handwriting text-[10px] text-charcoal/32 mt-3 text-right italic"
                >
                  I wish you had eaten.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Bus Ticket ───────────────────────────────────────────────────────

function BusTicket({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 2 }}
      animate={{ opacity: 1, rotate: 2 }}
      transition={{ delay, duration: 0.9 }}
      style={{ width: 160 }}
    >
      <div className="bg-[#F5F5DC] border border-charcoal/12 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#2D4A8A]/12 px-3 py-1.5 border-b border-charcoal/8">
          <p className="font-sans text-[8px] tracking-widest uppercase text-charcoal/35 text-center">BMTC</p>
        </div>
        {/* Chat as ticket text */}
        <div className="px-3 py-2.5 space-y-1">
          <div className="flex justify-end">
            <p className="font-sans text-[9px] text-charcoal/50 bg-[#DCF8C6]/60 px-2 py-0.5 rounded-sm">I reached PG.</p>
          </div>
          <div className="flex justify-start">
            <p className="font-sans text-[9px] text-charcoal/45 bg-white/60 px-2 py-0.5 rounded-sm border border-charcoal/5">Got bus?</p>
          </div>
          <div className="flex justify-end">
            <p className="font-sans text-[9px] text-charcoal/50 bg-[#DCF8C6]/60 px-2 py-0.5 rounded-sm">Almost ITPL.</p>
          </div>
        </div>
        {/* Perforated bottom */}
        <div className="border-t border-dashed border-charcoal/12 mx-2 mb-1" />
        <p className="font-handwriting text-[8px] text-charcoal/20 text-center pb-1.5">The same route. Every day.</p>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Birthday Polaroid ────────────────────────────────────────────────
// 11 March. Outside. Sunset. Pink flower. She's smiling.

function BirthdayPolaroid({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2.5 }}
      animate={{ opacity: 1, rotate: -2.5 }}
      transition={{ delay, duration: 1.1 }}
      className="relative"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 washi-tape rotate-[1deg]" />
      <div className="bg-white p-2 pb-8 shadow-lg border border-charcoal/5" style={{ width: 168 }}>
        <img
          src={birthdayPhoto}
          alt="Naresh and Meghana outside on her birthday, sunset, holding a pink flower"
          className="w-full object-cover"
          style={{ height: 180, objectPosition: 'center top' }}
        />
      </div>
      <div className="mt-2 px-1">
        <p className="font-handwriting text-[10px] text-charcoal/38 text-center">11 March 2026</p>
        <p className="font-quote text-[11px] text-charcoal/52 italic text-center leading-snug mt-1">
          Sometimes the best moments were<br />simply finding each other.
        </p>
      </div>
    </motion.div>
  );
}

// ─── INTERACTIVE 3: Washi Tape — Deleted Message ──────────────────────────────
// Lift the tape. WhatsApp deletion. Tap again. Silence.

function WashiHidden({ delay }: { delay: number }) {
  const [phase, setPhase] = useState<'covered' | 'deleted' | 'reflection'>('covered');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      style={{ width: 200 }}
    >
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm overflow-hidden">
        {/* WhatsApp-style conversation */}
        <div className="px-3 py-3">
          {phase === 'covered' && (
            <div
              className="relative cursor-pointer"
              onClick={() => setPhase('deleted')}
              role="button"
              tabIndex={0}
              aria-label="Lift the tape"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPhase('deleted'); } }}
            >
              <div className="flex justify-end mb-1.5">
                <div className="bg-[#DCF8C6] px-2.5 py-1 rounded-lg rounded-tr-none text-[10px] text-charcoal/60 max-w-[80%]">
                  ...
                </div>
              </div>
              {/* Washi tape covering the message */}
              <div className="relative">
                <div className="washi-tape w-full h-6 flex items-center justify-center" style={{ opacity: 0.7 }}>
                  <p className="font-handwriting text-[9px] text-charcoal/40">lift ↑</p>
                </div>
              </div>
            </div>
          )}

          {phase === 'deleted' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="cursor-pointer"
              onClick={() => setPhase('reflection')}
              role="button"
              tabIndex={0}
              aria-label="Continue"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPhase('reflection'); } }}
            >
              <div className="flex justify-end mb-1.5">
                <div className="bg-[#DCF8C6] px-2.5 py-1 rounded-lg rounded-tr-none text-[10px] text-charcoal/60 max-w-[80%]">
                  ...
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex items-center gap-1.5 bg-[#DCF8C6] px-2.5 py-1.5 rounded-lg rounded-tr-none max-w-[88%] border border-charcoal/5">
                  <span className="text-[11px] text-charcoal/28" aria-hidden="true">🚫</span>
                  <p className="font-sans text-[9px] text-charcoal/35 italic">You deleted this message</p>
                </div>
              </div>
              <p className="font-handwriting text-[8px] text-charcoal/22 text-right mt-1.5">tap to continue</p>
            </motion.div>
          )}

          {phase === 'reflection' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4 }}
              className="py-2 text-center"
            >
              <p className="font-quote text-sm text-charcoal/52 italic leading-relaxed">
                Some things<br />didn't need words.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Chapter Three ────────────────────────────────────────────────────────────

export default function ChapterThree({ onNext, onPrev }: ChapterProps) {
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
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FFF6EC]/40 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 flex flex-col py-8 z-10 relative">

          {/* Background texture details */}
          <div className="absolute top-28 left-3 w-14 h-14 rounded-full border border-[#C8924A]/10 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 4px rgba(200,146,74,0.04)' }} aria-hidden="true" />
          <svg className="absolute top-52 left-0 opacity-12 pointer-events-none" width="14" height="38" viewBox="0 0 14 38" aria-hidden="true">
            <path d="M7 2 Q13 2 13 8 L13 30 Q13 36 7 36 Q1 36 1 30 L1 10 Q1 6 4 6 Q7 6 7 10 L7 28 Q7 32 5 32" fill="none" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {/* Dried flower */}
          <div className="absolute bottom-52 left-1 text-xs opacity-12 pointer-events-none" aria-hidden="true">🌸</div>

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="mb-6">
            <p className="font-sans text-xs tracking-[0.38em] uppercase text-brown/38 mb-2">Chapter Three</p>
            <p className="font-handwriting text-xl text-coffee/48 mb-1">March 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-coffee font-light leading-snug">
              When Everyday<br />Became Home
            </h2>
            <motion.svg className="w-40 h-4 mt-2" viewBox="0 0 160 12" aria-hidden="true">
              <motion.path d="M 0 8 C 35 3, 80 11, 120 6 S 150 9, 160 7"
                fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }} />
            </motion.svg>
          </motion.div>

          <DateLine date="Early March 2026" delay={0.8} />

          {/* THE LETTER — centerpiece of left page */}
          <div className="relative mb-6">
            <FoldedLetter delay={1.0} />
          </div>

          {/* Movie ticket + handwriting strip — side by side */}
          <DateLine date="Mid March 2026" delay={1.6} />
          <div className="flex gap-4 items-start flex-wrap mb-5">
            <div className="relative">
              <MovieTicket delay={1.8} />
            </div>
            <div className="relative flex-1 min-w-[140px]">
              <HandwritingStrip delay={2.2} />
            </div>
          </div>

          {/* Tobby */}
          <DateLine date="March 2026" delay={2.6} />
          <div className="mb-4">
            <TobbyPolaroid delay={2.8} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-auto border-t border-charcoal/10">
            <button onClick={onPrev} className="font-sans text-xs text-charcoal/35 hover:text-coffee transition-colors tracking-widest uppercase">← Chapter Two</button>
            <button onClick={onNext} className="font-sans text-xs text-charcoal/45 hover:text-coffee transition-colors tracking-widest uppercase">Next →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE — organic scatter ═══════════ */}
        <div className="flex-1 md:pl-12 py-8">

          {/* Desktop organic scatter */}
          <div className="hidden md:block relative" style={{ minHeight: 800 }}>
            {/* Daily care strips — top area */}
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
              <DailyCareStrips delay={1.2} />
            </div>
            {/* Lunch wrapper — top right */}
            <div style={{ position: 'absolute', top: 20, left: 220 }}>
              <LunchWrapper delay={1.6} />
            </div>
            {/* Bus ticket — mid left */}
            <div style={{ position: 'absolute', top: 230, left: 10 }}>
              <BusTicket delay={2.0} />
            </div>
            {/* Birthday polaroid — mid right */}
            <div style={{ position: 'absolute', top: 190, left: 200 }}>
              <BirthdayPolaroid delay={2.4} />
            </div>
            {/* Washi hidden — lower left */}
            <div style={{ position: 'absolute', top: 430, left: 5 }}>
              <WashiHidden delay={2.8} />
            </div>

            {/* Ending — bottom, centered */}
            <motion.div
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 2.5 }}
            >
              <div className="border-t border-charcoal/8 pt-6 text-center">
                <p className="font-quote text-base text-charcoal/48 italic leading-loose">
                  March wasn't special<br />because something big happened.
                </p>
                <p className="font-quote text-base text-charcoal/55 italic leading-loose mt-2">
                  It was special because<br />
                  <em className="font-display text-coffee/65 not-italic">ordinary</em><br />
                  started feeling like home.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mobile: natural flow */}
          <div className="flex flex-col gap-7 md:hidden">
            <DailyCareStrips delay={1.2} />
            <LunchWrapper delay={1.5} />
            <BusTicket delay={1.8} />
            <BirthdayPolaroid delay={2.1} />
            <WashiHidden delay={2.4} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2.5 }}
              className="border-t border-charcoal/8 pt-6 text-center"
            >
              <p className="font-quote text-base text-charcoal/48 italic leading-loose">
                March wasn't special<br />because something big happened.
              </p>
              <p className="font-quote text-base text-charcoal/55 italic leading-loose mt-2">
                It was special because<br />
                <em className="font-display text-coffee/65 not-italic">ordinary</em><br />
                started feeling like home.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
