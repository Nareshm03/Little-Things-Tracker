import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterProps } from '../App';
import birthdayPhoto from '@assets/00003349-PHOTO-2026-03-11-20-20-02_1782729987549.jpg';
import grandmomPhoto from '@assets/00002975-PHOTO-2026-03-06-17-36-51_1782730093726.jpg';
import photoAutoPout from '@assets/FullSizeRender_1782795167754.jpeg';

// ─── Tiny handwritten annotation ─────────────────────────────────────────────

function Note({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className={`font-handwriting text-[15px] text-[#8B2020]/48 pointer-events-none select-none ${className}`}
    >
      {children}
    </motion.p>
  );
}

// ─── INTERACTIVE 1: Folded Letter ─────────────────────────────────────────────

function FoldedLetter({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ opacity: { delay, duration: 0.5 }, y: { type: 'spring', stiffness: 38, damping: 11, delay } }}
      className="relative"
    >
      {/* Coffee stain — overlaps one corner */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 18,
          right: -10,
          width: 38,
          height: 34,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140,90,40,0.13) 55%, transparent 85%)',
          border: '1px solid rgba(140,90,40,0.08)',
          zIndex: 30,
          pointerEvents: 'none',
          filter: 'blur(1px)',
        }}
      />
      {/* Inner ring of coffee stain */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 24,
          right: -5,
          width: 22,
          height: 20,
          borderRadius: '50%',
          border: '1px solid rgba(140,90,40,0.07)',
          zIndex: 31,
          pointerEvents: 'none',
        }}
      />

      {/* Tape — slightly lifting on the right side */}
      <div
        className="absolute -top-3 washi-tape z-20"
        style={{
          left: '46%',
          width: 62,
          height: 17,
          transform: 'translateX(-50%) rotate(-1.5deg)',
          transformOrigin: 'right center',
        }}
      />

      {/* Annotation */}
      <Note delay={delay + 0.8} className="absolute -right-2 -top-5 rotate-[4deg] z-30">
        still have this ❤️
      </Note>

      <div
        className="bg-[#FEFCE8] border border-[#D4C89A]/55 shadow-md cursor-pointer focus-within:ring-2 focus-within:ring-coffee/20"
        style={{ width: 330 }}
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Fold letter' : 'Unfold letter'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        {/* Fold header — always visible */}
        <div className="px-5 pt-4 pb-2 border-b border-[#D4C89A]/35 flex items-center justify-between">
          <p className="font-handwriting text-[16px] text-charcoal/32 tracking-wide">2 March 2026 — 11:17 PM</p>
          <div className="w-6 h-6 rounded-full bg-[#8B2020]/12 border border-[#8B2020]/18 flex items-center justify-center">
            <span className="font-display text-[14px] text-[#8B2020]/35 font-bold">N</span>
          </div>
        </div>

        {/* Closed state */}
        <AnimatePresence initial={false}>
          {!opened && (
            <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} className="px-5 py-4">
              <div className="space-y-2.5">
                {[0.8, 0.9, 0.55, 0.85, 0.7, 0.6, 0.75].map((w, i) => (
                  <div key={i} className="h-px bg-[#D4C89A]/30" style={{ width: `${w * 100}%` }} />
                ))}
              </div>
              <p className="font-handwriting text-[15px] text-charcoal/25 text-right mt-4 italic">tap to unfold</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open state — ink fades in */}
        <AnimatePresence initial={false}>
          {opened && (
            <motion.div key="open" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden relative">
              {/* Ruled lines */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="border-b border-[#B8A880]/10" style={{ height: 26 }} />
                ))}
              </div>

              {/* Left margin red line */}
              <div className="absolute left-10 top-0 bottom-0 w-px bg-[#C87070]/10 pointer-events-none" aria-hidden="true" />

              <div className="px-6 py-5 relative pb-8" style={{ paddingLeft: 44 }}>

                {/* Salutation */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-3">
                  Dear Meghana,
                </motion.p>

                {/* Para 1 */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-1 indent-5">
                  Every night before I sleep, I think about you…
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-3">
                  and suddenly the whole day feels your presence…
                </motion.p>

                {/* Para 2 — with one crossed/corrected word */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-1 indent-5">
                  I{' '}
                  <span style={{ textDecoration: 'line-through', opacity: 0.4, fontStyle: 'normal' }}>like</span>
                  {' '}love you so deeply that sometimes
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-3">
                  I don't even have the right words for it.
                </motion.p>

                {/* Para 3 */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-1 indent-5">
                  It's not just love… it's comfort, peace and that
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 2.0, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-3">
                  feeling of home with you…
                </motion.p>

                {/* Para 4 */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 2.3, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-1 indent-5">
                  I miss your presence in the smallest moments —
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 2.6, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-3">
                  your voice, your fragrance and just you…
                </motion.p>

                {/* Para 5 */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 2.9, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-1 indent-5">
                  Sleep peacefully, my beautiful girl.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 3.2, duration: 1.2 }}
                  className="font-letter text-[16px] text-charcoal/70 leading-relaxed mb-3">
                  May your dreams be wonderful — filled with me.
                </motion.p>

                {/* Closing */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 3.6, duration: 1.5 }}
                  className="mt-4">
                  <p className="font-letter text-[16px] text-charcoal/60 leading-relaxed">Good night, baby.</p>
                  <p className="font-letter text-[16px] text-charcoal/60 leading-relaxed mb-4">I love you more than I can explain.</p>
                  <p className="font-letter text-[16px] text-charcoal/55 leading-relaxed">Love,</p>
                  <p className="font-letter text-lg text-charcoal/65">N</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Movie Ticket ─────────────────────────────────────────────────────

function MovieTicket({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: -8 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ opacity: { delay, duration: 0.4 }, y: { type: 'spring', stiffness: 42, damping: 10, delay }, rotate: { type: 'spring', stiffness: 42, damping: 10, delay } }}
      className="relative"
      style={{ width: 170 }}
    >
      {/* Push-pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4844A]/45 border-2 border-[#D4844A]/25 z-20 shadow-sm" />
      <Note delay={delay + 0.6} className="absolute -bottom-5 left-0 -rotate-[2deg]">don't lose this.</Note>

      <div className="bg-[#1A1A2E] rounded-sm shadow-md relative overflow-hidden" style={{ opacity: 0.87 }}>
        {/* Fingerprint overlay — subtle radial smudge */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 28,
            right: 12,
            width: 32,
            height: 28,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 40%, transparent 80%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
        <div className="px-3 py-2 border-b border-white/8">
          <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-white/35 text-center">Cinema · March 2026</p>
        </div>
        <div className="px-3 py-3 text-center">
          <p className="font-sans text-[14px] tracking-widest uppercase text-white/25 mb-1">Seats</p>
          <p className="font-display text-xl text-white/70 tracking-wider">15 • 16</p>
          <p className="font-sans text-[14px] text-white/20 mt-0.5">Middle Row</p>
        </div>
        <div className="border-t border-dashed border-white/12 mx-2" />
        <div className="px-3 py-2.5 space-y-1.5">
          <div className="flex justify-end">
            <p className="font-sans text-[14px] text-white/48 bg-white/6 px-2 py-1 rounded-lg rounded-tr-none">
              Book any corner seats know...
            </p>
          </div>
          <div className="flex justify-start">
            <p className="font-sans text-[14px] text-[#C8924A]/55 bg-[#C8924A]/6 px-2 py-1 rounded-lg rounded-tl-none">
              I booked.
            </p>
          </div>
        </div>
        <p className="text-center text-sm opacity-20 pb-1.5" aria-hidden="true">🍿</p>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Handwriting Strip — torn notebook style ─────────────────────────

function HandwritingStrip({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: 6 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ opacity: { delay, duration: 0.4 }, y: { type: 'spring', stiffness: 42, damping: 10, delay }, rotate: { type: 'spring', stiffness: 42, damping: 10, delay } }}
      className="relative"
      style={{ width: 210 }}
    >
      {/* Tape */}
      <div className="absolute -top-3 left-4 w-10 h-4 washi-tape -rotate-[1deg]" />

      {/* Torn top edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 160 8"
        width="160"
        height="8"
        style={{ display: 'block', marginBottom: -1 }}
        preserveAspectRatio="none"
      >
        <path
          d="M0 8 L8 3 L18 7 L30 2 L44 6 L58 1 L70 5 L84 2 L96 6 L110 1 L124 5 L138 3 L148 6 L160 2 L160 8 Z"
          fill="#FFFFFF"
        />
      </svg>

      <div className="bg-white border-x border-b border-charcoal/8 shadow-sm px-3 py-2.5" style={{ borderLeft: '2.5px solid #D4C89A' }}>
        <p className="font-letter text-[16px] text-charcoal/60">
          See how worst is my handwriting 😂
        </p>
        <p className="font-letter text-[15px] text-coffee/58 mt-0.5 italic">
          "It's looking good from far."
        </p>
      </div>

      {/* Torn bottom edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 160 8"
        width="160"
        height="8"
        style={{ display: 'block', marginTop: -1 }}
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 L12 5 L24 1 L38 6 L52 2 L64 7 L78 3 L92 6 L106 2 L120 7 L134 3 L146 5 L160 0 L160 8 L0 8 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Curled corner — bottom right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 4,
          right: 0,
          width: 12,
          height: 12,
          background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.06) 50%)',
          borderRadius: '0 0 0 2px',
          boxShadow: '-2px -2px 3px rgba(0,0,0,0.06)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

// ─── STATIC: Tobby Polaroid ───────────────────────────────────────────────────

function TobbyPolaroid({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: 9 }}
      animate={{ opacity: 1, y: 0, rotate: 4 }}
      transition={{ opacity: { delay, duration: 0.4 }, y: { type: 'spring', stiffness: 40, damping: 10, delay }, rotate: { type: 'spring', stiffness: 40, damping: 10, delay } }}
      className="relative"
      style={{ width: 150 }}
    >
      <div className="absolute -top-3 left-3 w-12 h-4 washi-tape rotate-[2deg]" />
      <div className="bg-white p-2 pb-6 shadow-md border border-charcoal/5">
        <svg viewBox="0 0 96 80" width="96" height="80" className="block bg-[#F5F0E8]" aria-label="Tobby">
          <ellipse cx="48" cy="54" rx="26" ry="18" fill="#C8A87A" />
          <ellipse cx="48" cy="32" rx="20" ry="18" fill="#D4B48A" />
          <ellipse cx="29" cy="36" rx="10" ry="14" fill="#B89060" transform="rotate(-15 29 36)" />
          <ellipse cx="67" cy="36" rx="10" ry="14" fill="#B89060" transform="rotate(15 67 36)" />
          <circle cx="41" cy="30" r="4" fill="#3D2A1A" />
          <circle cx="55" cy="30" r="4" fill="#3D2A1A" />
          <circle cx="42" cy="28.5" r="1.2" fill="white" />
          <circle cx="56" cy="28.5" r="1.2" fill="white" />
          <ellipse cx="48" cy="38" rx="5" ry="3.5" fill="#3D2A1A" />
          <path d="M44 41 Q48 45 52 41" fill="none" stroke="#3D2A1A" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M72 60 Q84 50 80 42" fill="none" stroke="#C8A87A" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="34" cy="68" rx="8" ry="5" fill="#C8A87A" />
          <ellipse cx="62" cy="68" rx="8" ry="5" fill="#C8A87A" />
        </svg>
        <p className="font-handwriting text-[15px] text-charcoal/45 text-center mt-1.5">Tobby</p>
      </div>
      <div className="mt-1.5 space-y-0.5 px-0.5">
        <p className="font-letter text-[16px] text-charcoal/55">"Tobby is looking handsome."</p>
        <p className="font-letter text-[16px] text-coffee/48 italic">"He is more handsome I guess 😂"</p>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Daily Care Strips ────────────────────────────────────────────────

const careMessages = [
  { msg: 'Had breakfast?', out: false },
  { msg: 'Reached PG?', out: true },
  { msg: 'Go eat.', out: false },
  { msg: 'Sleep properly.', out: false },
  { msg: 'Drink water.', out: true },
];

function DailyCareStrips({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 252 }}
    >
      <div className="absolute -top-3 left-3 w-12 h-4 washi-tape rotate-[2deg]" />
      <Note delay={delay + 0.6} className="absolute -right-3 -top-4 rotate-[3deg]">every. single. day.</Note>
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm p-3">
        <p className="font-sans text-[14px] tracking-[0.32em] uppercase text-charcoal/25 mb-2.5 text-center">
          All of March
        </p>
        <div className="space-y-1.5">
          {careMessages.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: m.out ? 6 : -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.12 * i, duration: 0.7 }}
              className={`flex ${m.out ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-2.5 py-1 rounded-lg text-[15px] font-sans ${
                m.out
                  ? 'bg-[#DCF8C6] text-[#111]/60 rounded-tr-none'
                  : 'bg-white text-[#111]/50 rounded-tl-none border border-charcoal/6'
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

function LunchWrapper({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2 }}
      animate={{ opacity: 1, rotate: -2 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 232 }}
    >
      <div className="absolute -top-3 right-4 w-14 h-4 washi-tape rotate-[1deg]" />
      <div className="overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-coffee/20"
        onClick={() => setOpened(v => !v)}
        role="button" tabIndex={0}
        aria-label={opened ? 'Close' : 'Open lunch wrapper'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        <div className="bg-[#C8924A]/18 border border-[#C8924A]/25 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="font-handwriting text-sm text-[#7C4A0A]/58">Surprise 🍱</p>
            <motion.span animate={{ rotate: opened ? 90 : 0 }} transition={{ duration: 0.4 }}
              className="text-xs opacity-25" aria-hidden="true">▷</motion.span>
          </div>
        </div>
        <AnimatePresence>
          {opened && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden">
              <div className="bg-[#FEFCE8] border border-t-0 border-[#C8924A]/20 px-5 py-4">
                {[
                  { text: 'I brought you lunch...', d: 0.1 },
                  { text: 'Sorry...', d: 0.5 },
                  { text: "It's okay madam.", d: 0.9, italic: true },
                ].map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: line.d, duration: 0.9 }}
                    className={`font-letter text-sm text-charcoal/65 leading-relaxed ${line.italic ? 'italic text-coffee/58' : ''}`}>
                    {line.text}
                  </motion.p>
                ))}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
                  className="font-handwriting text-[16px] text-charcoal/28 mt-3 text-right italic">
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

// ─── STATIC: Bus Ticket — printed WhatsApp screenshot style ──────────────────

function BusTicket({ delay }: { delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, rotate: 2 }} animate={{ opacity: 1, rotate: 2 }}
      transition={{ delay, duration: 0.9 }} style={{ width: 210 }} className="relative">
      {/* Tape strip */}
      <div
        className="absolute -top-3 left-1/2 washi-tape z-10"
        style={{ width: 52, height: 17, transform: 'translateX(-50%) rotate(-0.5deg)' }}
      />
      {/* Printed screenshot — aged/slightly warm paper */}
      <div
        className="shadow-md border border-charcoal/10 overflow-hidden relative"
        style={{
          background: '#F7F3ED',
          filter: 'sepia(0.06) brightness(0.98)',
        }}
      >
        {/* WhatsApp header bar */}
        <div style={{ background: '#075E54', padding: '5px 8px 4px' }}>
          <p className="font-sans text-white/90" style={{ fontSize: 7, letterSpacing: '0.02em' }}>
            ← &nbsp;N 🤍
          </p>
        </div>

        {/* Chat bubbles */}
        <div className="px-2.5 py-2.5 space-y-1.5" style={{ background: '#E5DDD5' }}>
          {/* Meghana's message (left) */}
          <div className="flex justify-start">
            <div className="bg-white rounded-lg rounded-tl-none px-2.5 py-1.5 shadow-sm" style={{ maxWidth: '75%' }}>
              <p className="font-sans text-[15px] text-[#111]/70 leading-relaxed">I reached PG.</p>
              <p className="font-sans text-[16px] text-[#888] text-right mt-0.5">11:09 PM</p>
            </div>
          </div>
          {/* Naresh's reply (right) */}
          <div className="flex justify-end">
            <div className="rounded-lg rounded-tr-none px-2.5 py-1.5 shadow-sm" style={{ background: '#DCF8C6', maxWidth: '70%' }}>
              <p className="font-sans text-[15px] text-[#111]/70 leading-relaxed">Got bus?</p>
              <p className="font-sans text-[16px] text-[#888] text-right mt-0.5">11:10 PM ✓✓</p>
            </div>
          </div>
          {/* Meghana again */}
          <div className="flex justify-start">
            <div className="bg-white rounded-lg rounded-tl-none px-2.5 py-1.5 shadow-sm" style={{ maxWidth: '80%' }}>
              <p className="font-sans text-[15px] text-[#111]/70 leading-relaxed">Almost ITPL 😴</p>
              <p className="font-sans text-[16px] text-[#888] text-right mt-0.5">11:22 PM</p>
            </div>
          </div>
        </div>

        {/* Printed paper grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
            pointerEvents: 'none',
            opacity: 0.4,
          }}
        />
      </div>
      <p className="font-handwriting text-[14px] text-charcoal/22 text-center mt-1.5">same route. every day.</p>
    </motion.div>
  );
}

// ─── STATIC: Birthday Photo Polaroid — warm tint, bent corner ────────────────

function BirthdayPolaroid({ delay }: { delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, rotate: -2.5 }} animate={{ opacity: 1, rotate: -2.5 }}
      transition={{ delay, duration: 1.1 }} className="relative" style={{ width: 210, cursor: 'default' }}>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 washi-tape rotate-[1deg]" />
      <Note delay={delay + 0.6} className="absolute -right-4 -top-5 rotate-[6deg]">favorite memory.</Note>
      <div className="bg-white p-2 pb-8 shadow-lg border border-charcoal/5 relative overflow-hidden">
        <img
          src={birthdayPhoto}
          alt="Naresh and Meghana outside on her birthday, sunset, pink flower"
          className="w-full object-cover"
          style={{
            height: 172,
            objectPosition: 'center top',
            filter: 'sepia(0.14) brightness(1.06) saturate(1.18) contrast(1.02)',
          }}
        />
        {/* Bent corner — bottom right */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 16,
            height: 16,
            background: 'linear-gradient(135deg, transparent 50%, rgba(200,180,140,0.35) 50%)',
            pointerEvents: 'none',
          }}
        />
      </div>
      <p className="font-handwriting text-[16px] text-charcoal/38 text-center mt-2">11 March 2026</p>
    </motion.div>
  );
}

// ─── STATIC: Family Visit Polaroid (6 March) — faded ─────────────────────────

function FamilyPolaroid({ delay }: { delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, rotate: 3 }} animate={{ opacity: 1, rotate: 3 }}
      transition={{ delay, duration: 1 }} className="relative" style={{ width: 146 }}>
      <div className="absolute -top-2 left-3 w-10 h-4 washi-tape -rotate-[1deg]" />
      <div className="bg-white p-1.5 pb-6 shadow-md border border-charcoal/5">
        <img
          src={grandmomPhoto}
          alt="Meghana with her grandmother on 6 March"
          className="w-full object-cover"
          style={{
            height: 110,
            objectPosition: 'center top',
            filter: 'sepia(0.32) brightness(0.88) contrast(0.84) saturate(0.72)',
          }}
        />
      </div>
      <p className="font-handwriting text-[15px] text-charcoal/32 text-center mt-1">6 March — home</p>
    </motion.div>
  );
}

// ─── INTERACTIVE 3: Washi Hidden — Deleted Message ───────────────────────────

function WashiHidden({ delay }: { delay: number }) {
  const [phase, setPhase] = useState<'covered' | 'deleted' | 'reflection'>('covered');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }} style={{ width: 255 }}>
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm">
        <div className="px-3 py-3">
          {phase === 'covered' && (
            <div className="cursor-pointer"
              onClick={() => setPhase('deleted')}
              role="button" tabIndex={0}
              aria-label="Lift the tape"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPhase('deleted'); } }}>
              {/* Small handwritten note above the covered bubble */}
              <p className="font-handwriting text-[15px] text-charcoal/30 mb-2 italic">
                (something I almost sent)
              </p>
              <div className="flex justify-end mb-2">
                <div className="bg-[#DCF8C6] px-2.5 py-1 rounded-lg rounded-tr-none text-[15px] text-charcoal/45">...</div>
              </div>
              <div className="washi-tape w-full h-6 flex items-center justify-center" style={{ opacity: 0.65 }}>
                <p className="font-handwriting text-[15px] text-charcoal/38">lift to see ↑</p>
              </div>
            </div>
          )}
          {phase === 'deleted' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
              className="cursor-pointer"
              onClick={() => setPhase('reflection')}
              role="button" tabIndex={0}
              aria-label="Continue"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPhase('reflection'); } }}>
              <div className="flex justify-end mb-2">
                <div className="bg-[#DCF8C6] px-2.5 py-1 rounded-lg rounded-tr-none text-[15px] text-charcoal/45">...</div>
              </div>
              <div className="flex justify-end">
                <div className="flex items-center gap-1.5 bg-[#DCF8C6] px-2.5 py-1.5 rounded-lg rounded-tr-none border border-charcoal/4">
                  <span className="text-[16px] text-charcoal/25" aria-hidden="true">🚫</span>
                  <p className="font-sans text-[15px] text-charcoal/32 italic">You deleted this message</p>
                </div>
              </div>
              <p className="font-handwriting text-[14px] text-charcoal/18 text-right mt-1.5">tap to continue</p>
            </motion.div>
          )}
          {phase === 'reflection' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}
              className="py-3 text-center">
              <p className="font-quote text-sm text-charcoal/50 italic leading-relaxed">
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
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 py-8 z-10 relative flex flex-col">

          {/* Background accents */}
          <div className="absolute top-24 left-3 w-14 h-14 rounded-full border border-[#C8924A]/8 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 4px rgba(200,146,74,0.04)' }} aria-hidden="true" />
          <svg className="absolute top-52 left-0 opacity-10 pointer-events-none" width="14" height="38" viewBox="0 0 14 38" aria-hidden="true">
            <path d="M7 2 Q13 2 13 8 L13 30 Q13 36 7 36 Q1 36 1 30 L1 10 Q1 6 4 6 Q7 6 7 10 L7 28 Q7 32 5 32" fill="none" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-40 left-1 text-xs opacity-10 pointer-events-none" aria-hidden="true">🌸</div>

          {/* Chapter header — moved 20px lower, increased line-height, settles first */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            className="mb-7 mt-5"
          >
            <p className="font-sans text-xs tracking-[0.38em] uppercase text-brown/38 mb-2">Chapter Three</p>
            <p className="font-handwriting text-xl text-coffee/48 mb-1">March 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-coffee font-light" style={{ lineHeight: 1.35 }}>
              When Everyday<br />Became Home
            </h2>
            <motion.svg className="w-40 h-4 mt-2" viewBox="0 0 160 12" aria-hidden="true">
              <motion.path d="M 0 8 C 35 3, 80 11, 120 6 S 150 9, 160 7"
                fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 1.2, ease: 'easeOut' }} />
            </motion.svg>
          </motion.div>

          {/* ── Desktop: organic overlapping scatter — delayed so title settles first ── */}
          <div className="hidden md:block relative flex-1" style={{ minHeight: 700 }}>

            {/* Letter — largest, anchors the left page */}
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
              <FoldedLetter delay={1.6} />
            </div>

            {/* Movie ticket — overlaps top-right corner of letter */}
            <div style={{ position: 'absolute', top: 10, left: 256, zIndex: 9 }}>
              <MovieTicket delay={2.0} />
            </div>

            {/* Handwriting strip — below letter, offset left */}
            <div style={{ position: 'absolute', top: 390, left: 15, zIndex: 6 }}>
              <HandwritingStrip delay={2.5} />
            </div>

            {/* Tobby — tucked under ticket, right of handwriting */}
            <div style={{ position: 'absolute', top: 300, left: 252, zIndex: 7 }}>
              <TobbyPolaroid delay={2.9} />
            </div>
          </div>

          {/* ── Mobile: natural flow ── */}
          <div className="flex flex-col gap-6 md:hidden">
            <FoldedLetter delay={1.6} />
            <MovieTicket delay={2.0} />
            <HandwritingStrip delay={2.3} />
            <TobbyPolaroid delay={2.6} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-charcoal/10">
            <button onClick={onPrev} className="font-sans text-xs text-charcoal/35 hover:text-coffee transition-colors tracking-widest uppercase">← Chapter Two</button>
            <button onClick={onNext} className="font-sans text-xs text-charcoal/45 hover:text-coffee transition-colors tracking-widest uppercase">Next →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE — organic scatter ═══════════ */}
        <div className="flex-1 md:pl-12 py-8">

          {/* Desktop scatter */}
          <div className="hidden md:block relative" style={{ minHeight: 1060 }}>

            {/* Daily care strips — top left */}
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
              <DailyCareStrips delay={1.8} />
            </div>

            {/* Lunch wrapper — top right, slightly overlapping strips */}
            <div style={{ position: 'absolute', top: 20, left: 206, zIndex: 7 }}>
              <LunchWrapper delay={2.2} />
            </div>

            {/* Bus ticket — mid left */}
            <div style={{ position: 'absolute', top: 250, left: 8, zIndex: 5 }}>
              <BusTicket delay={2.6} />
            </div>

            {/* Birthday polaroid — shifted ~50px lower per feedback */}
            <div style={{ position: 'absolute', top: 252, left: 192, zIndex: 8 }}>
              <BirthdayPolaroid delay={3.0} />
            </div>

            {/* Family polaroid — tucked below/beside birthday */}
            <div style={{ position: 'absolute', top: 440, left: 210, zIndex: 6 }}>
              <FamilyPolaroid delay={3.4} />
            </div>

            {/* Washi hidden — lower left */}
            <div style={{ position: 'absolute', top: 470, left: 5, zIndex: 6 }}>
              <WashiHidden delay={3.8} />
            </div>

            {/* AUTO POUT PHOTO — moved 20px upward */}
            <motion.div
              style={{ position: 'absolute', top: 552, left: 176, zIndex: 7, rotate: '2.5deg' }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2, duration: 1.1 }}
            >
              <div className="absolute -top-2.5 left-1/2 z-10 w-10 h-3.5"
                style={{ backgroundColor: 'rgba(232,184,109,0.44)', transform: 'translateX(-50%) rotate(-1deg)' }}
                aria-hidden="true" />
              <div className="bg-white shadow-md border border-charcoal/5 relative overflow-hidden" style={{ padding: '5px 5px 20px 5px' }}>
                <img
                  src={photoAutoPout}
                  alt="In an auto, being herself"
                  style={{
                    width: 118, height: 142,
                    objectFit: 'cover', objectPosition: 'center top',
                    filter: 'saturate(0.84) hue-rotate(-8deg) brightness(1.03)',
                    display: 'block',
                  }}
                />
                {/* Bent corner on selfie polaroid */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 14,
                    height: 14,
                    background: 'linear-gradient(315deg, transparent 50%, rgba(180,160,120,0.3) 50%)',
                    pointerEvents: 'none',
                  }}
                />
                <p className="font-handwriting text-[14px] text-charcoal/35 text-center mt-1">auto rides 😂</p>
              </div>
              <Note delay={4.8} className="absolute -bottom-5 -left-2 -rotate-[2deg]">being herself.</Note>
            </motion.div>

            {/* Ending — pushed to very bottom margin, not fighting the photo */}
            <motion.div
              style={{ position: 'absolute', bottom: 12, left: 0, right: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.5, duration: 2.5 }}
            >
              <div className="border-t border-charcoal/8 pt-5 text-center">
                <p className="font-quote text-[15px] text-charcoal/45 italic leading-loose">
                  We didn't become closer<br />
                  because everything went right.
                </p>
                <p className="font-quote text-[15px] text-charcoal/55 italic leading-loose mt-2">
                  We became closer<br />
                  because we kept coming back.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mobile flow */}
          <div className="flex flex-col gap-7 md:hidden">
            <DailyCareStrips delay={1.8} />
            <LunchWrapper delay={2.0} />
            <BusTicket delay={2.3} />
            <BirthdayPolaroid delay={2.5} />
            <FamilyPolaroid delay={2.8} />
            <WashiHidden delay={3.0} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 5.0, duration: 2.5 }}
              className="border-t border-charcoal/8 pt-6 text-center">
              <p className="font-quote text-[15px] text-charcoal/45 italic leading-loose">
                We didn't become closer<br />because everything went right.
              </p>
              <p className="font-quote text-[15px] text-charcoal/55 italic leading-loose mt-2">
                We became closer<br />because we kept coming back.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
