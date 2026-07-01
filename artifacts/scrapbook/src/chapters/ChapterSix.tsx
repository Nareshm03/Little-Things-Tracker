import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Morning sunlight ─────────────────────────────────────────────────────────
function MorningSunlight() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute"
        style={{
          top: -60, right: -40, width: 520, height: 420,
          background: 'radial-gradient(ellipse at 80% 20%, rgba(232,184,109,0.10) 0%, transparent 62%)',
        }}
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 25% 65%, rgba(255,255,255,0.05) 0%, transparent 55%)' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// ─── Bucket list — real notebook paper, handwritten, humanised ───────────────
function BucketList({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      style={{ width: 206, rotate: '-1deg' }}
      className="relative"
    >
      {/* Torn top edge */}
      <svg width="206" height="10" viewBox="0 0 206 10" className="w-full block" aria-hidden="true">
        <path d="M0,8 C14,2 30,8 46,5 C62,2 78,8 94,4 C110,0 126,7 142,3 C158,0 176,6 206,5 L206,10 L0,10 Z"
          fill="#FDFAF4" />
      </svg>
      <div className="bg-[#FDFAF4] border-x border-b border-charcoal/8 shadow-sm px-4 pb-4 pt-2.5 relative overflow-hidden">
        {/* Notebook ruled lines */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: 0,
            bottom: 0,
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 21px, rgba(180,160,140,0.14) 21px, rgba(180,160,140,0.14) 22px)',
            backgroundPosition: '0 30px',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        {/* Red margin line */}
        <div className="absolute top-0 bottom-0 left-10 border-l border-[#E8A0A0]/28" aria-hidden="true" />

        <p className="font-handwriting text-[9px] text-charcoal/28 mb-3 ml-7 tracking-wide relative">things we want to do —</p>

        <div className="space-y-2.5 relative ml-2">
          {/* Passport — done, with big checkmark */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-handwriting text-[16px] leading-none text-[#3A7C3A]/65 flex-shrink-0">✓</span>
            <p className="font-handwriting text-[13px] text-charcoal/58">Passport</p>
          </div>
          {/* IELTS — uncertain */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-handwriting text-[14px] leading-none text-charcoal/32 flex-shrink-0">?</span>
            <p className="font-handwriting text-[13px] text-charcoal/52">IELTS</p>
            <p className="font-handwriting text-[9px] text-charcoal/24 italic">(preparing...)</p>
          </div>
          {/* Abroad — wishful, with trailing thought */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-handwriting text-[14px] leading-none text-charcoal/22 flex-shrink-0">—</span>
            <p className="font-handwriting text-[13px] text-charcoal/48">Abroad</p>
            <p className="font-handwriting text-[10px] text-[#3A5C82]/45 italic">one day...</p>
          </div>
          {/* Build together */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-handwriting text-[14px] leading-none text-charcoal/22 flex-shrink-0">—</span>
            <p className="font-handwriting text-[13px] text-charcoal/44">Build something together</p>
          </div>

          {/* Stay together — special, underlined, coloured */}
          <div className="pt-1 border-t border-charcoal/8 mt-1">
            <div className="flex items-baseline gap-2.5">
              <span className="font-handwriting text-[16px] leading-none text-[#3A5C82]/60 flex-shrink-0">✓</span>
              <p className="font-handwriting text-[13px] text-[#3A5C82]/65" style={{ textDecoration: 'underline', textDecorationColor: 'rgba(58,92,130,0.22)', textUnderlineOffset: '3px' }}>
                Stay together ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Passport photo strip — looks like an application printout ────────────────
function PassportPhoto({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.9 }}
      className="relative"
      style={{ width: 72, rotate: '2.5deg' }}
    >
      {/* Paperclip */}
      <svg width="14" height="40" viewBox="0 0 14 40" className="absolute -top-2 left-5 z-10"
        aria-hidden="true" style={{ opacity: 0.5 }}>
        <path d="M 7 3 C 4 3 3 6 3 9 L 3 30 C 3 35 5 37 7 37 C 9 37 11 35 11 30 L 11 11 C 11 8 10 6 7 6 C 5 6 4 8 4 11 L 4 29 C 4 31 5 32 7 32 C 9 32 10 31 10 29 L 10 13"
          fill="none" stroke="#8B9BAD" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {/* Application form strip */}
      <div
        className="bg-white border border-charcoal/10 shadow-sm"
        style={{ padding: '4px 4px 6px 4px' }}
      >
        {/* Three photo slots stacked — passport strip style */}
        {[
          { label: 'N + M', tint: '#D8E4F0' },
          { label: '', tint: '#E4EAF2' },
          { label: '', tint: '#D8E4F0' },
        ].map(({ label, tint }, i) => (
          <div
            key={i}
            style={{ backgroundColor: tint, width: 62, height: 28, marginBottom: i < 2 ? 2 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {i === 0 && (
              <p className="font-handwriting text-[9px] text-[#3A5C82]/48 leading-none">{label}</p>
            )}
            {i > 0 && (
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid rgba(58,92,130,0.15)', opacity: 0.4 }} />
            )}
          </div>
        ))}
        <p className="font-sans text-[4.5px] tracking-[0.2em] uppercase text-charcoal/18 text-center mt-1">PHOTOGRAPH</p>
      </div>
    </motion.div>
  );
}

// ─── "deal is deal." tiny sticky ─────────────────────────────────────────────
function DealSticky({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9 }}
      style={{
        backgroundColor: '#FFF9C4',
        width: 100,
        rotate: '3deg',
        padding: '8px 10px 12px 10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      }}
    >
      <p className="font-handwriting text-[12px] text-charcoal/58 italic">deal is deal.</p>
    </motion.div>
  );
}

// ─── Passport folder — interaction 1 ─────────────────────────────────────────
function PassportFolder({ delay }: { delay: number }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      style={{ width: 152, rotate: '1.5deg' }}
    >
      <motion.div
        className="relative cursor-pointer overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #1A3A5C 0%, #243B55 100%)',
          borderRadius: 2,
          boxShadow: open
            ? '0 14px 36px rgba(0,0,0,0.24), 0 4px 12px rgba(0,0,0,0.12)'
            : '0 4px 14px rgba(0,0,0,0.18)',
        }}
        onClick={() => setOpen(v => !v)}
        role="button" tabIndex={0}
        aria-label={open ? 'Close passport folder' : 'Open passport folder'}
        aria-expanded={open}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(v => !v); } }}
      >
        <div className="px-4 py-3 flex flex-col items-center gap-1">
          <p className="font-sans text-[5.5px] tracking-[0.35em] uppercase text-white/28">Republic of India</p>
          <div className="w-7 h-7 rounded-full border border-white/14 flex items-center justify-center my-0.5">
            <p className="text-[13px]" aria-hidden="true">⚜️</p>
          </div>
          <p className="font-sans text-[7.5px] tracking-[0.2em] uppercase text-white/45">Passport</p>
          {!open && (
            <p className="font-handwriting text-[7px] text-white/18 italic mt-0.5">tap to open</p>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="bg-[#FDFCF8] border-t border-white/10 px-4 py-4"
            >
              <p className="font-sans text-[6px] tracking-[0.32em] uppercase text-charcoal/28 mb-2">Destination</p>
              <p className="font-letter text-[22px] text-charcoal/55 leading-tight">Unknown.</p>
              <p className="font-letter text-[20px] text-charcoal/40 mt-0.5">Still planning.</p>
              <div className="mt-3 pt-2 border-t border-charcoal/8">
                <p className="font-handwriting text-[10px] text-[#3A5C82]/45 italic">hopefully together ❤️</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─── Bike route sketch — tracing paper lift ───────────────────────────────────
function BikeSketch({ delay }: { delay: number }) {
  const [lifted, setLifted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 182 }}
    >
      <div className="bg-[#FDFAF4] border border-charcoal/10 shadow-sm p-3" style={{ rotate: '-2deg' }}>
        <p className="font-sans text-[6px] tracking-[0.3em] uppercase text-charcoal/18 mb-1.5">Route Sketch</p>
        <svg width="156" height="68" viewBox="0 0 156 68" aria-label="Bike route sketch from start to Tirupati">
          <path d="M 8 58 C 30 52, 52 44, 72 34 C 92 24, 112 18, 134 20 C 148 21, 152 30, 150 42"
            fill="none" stroke="#3A5C82" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray="3 2.5" opacity="0.32" />
          <path d="M 0 56 Q 22 38, 44 50 Q 60 60, 84 40 Q 104 22, 156 28"
            fill="none" stroke="#8BA888" strokeWidth="0.9" opacity="0.16" strokeLinecap="round" />
          <circle cx="8" cy="58" r="2.5" fill="#3A5C82" opacity="0.38" />
          <text x="3" y="66" fontSize="5" fill="#2D2D2D" opacity="0.22" fontFamily="cursive">start</text>
          <circle cx="150" cy="42" r="2.5" fill="#C9A84C" opacity="0.48" />
          <text x="136" y="37" fontSize="5" fill="#2D2D2D" opacity="0.28" fontFamily="cursive">Tirupati</text>
          <text x="76" y="32" fontSize="9" opacity="0.32">🏍</text>
        </svg>
        <div className="mt-1.5 pt-1.5 border-t border-charcoal/8">
          <p className="font-letter text-[13px] text-charcoal/55 leading-snug">
            Tirupati.<br />
            <span className="text-charcoal/42">After exams.</span><br />
            <span className="font-handwriting text-[11px] text-[#C9A84C]/62 italic">Deal is deal.</span>
          </p>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 cursor-pointer"
        style={{
          background: 'rgba(244, 247, 252, 0.90)',
          border: '1px solid rgba(58, 92, 130, 0.10)',
          transformOrigin: 'top center',
          transformPerspective: 600,
          backdropFilter: 'blur(0.5px)',
          rotate: '-2deg',
        }}
        animate={!shouldReduceMotion
          ? { rotateX: lifted ? -58 : 0, y: lifted ? -20 : 0, opacity: lifted ? 0 : 1 }
          : { opacity: lifted ? 0 : 1 }
        }
        transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => setLifted(v => !v)}
        role="button" tabIndex={0}
        aria-label={lifted ? 'Lower tracing paper' : 'Lift tracing paper to reveal what is written beneath'}
        aria-expanded={lifted}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLifted(v => !v); } }}
      >
        <div className="p-3">
          <p className="font-sans text-[6px] tracking-[0.3em] uppercase text-[#3A5C82]/18 mb-1.5">Route Sketch</p>
          <svg width="156" height="68" viewBox="0 0 156 68" aria-hidden="true">
            <path d="M 8 58 C 30 52, 52 44, 72 34 C 92 24, 112 18, 134 20 C 148 21, 152 30, 150 42"
              fill="none" stroke="#3A5C82" strokeWidth="1" strokeLinecap="round"
              strokeDasharray="3 2.5" opacity="0.12" />
          </svg>
          <p className="font-handwriting text-[7.5px] text-[#3A5C82]/18 italic mt-1">lift ↑ to reveal</p>
        </div>
      </motion.div>
      {!lifted && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: delay + 1.8, duration: 1 }}
          className="absolute -bottom-5 right-1 font-handwriting text-[7px] text-charcoal/16 italic pointer-events-none select-none"
        >
          lift ↑
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── SDC ID card — clipped, rotated more, hidden half ────────────────────────
function SDCIdCard({ delay }: { delay: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 160 }}
    >
      {/* Binder clip — sits on top edge */}
      <svg
        width="28" height="22" viewBox="0 0 28 22"
        className="absolute z-20"
        style={{ top: -10, left: 18 }}
        aria-hidden="true"
      >
        {/* Clip body */}
        <rect x="4" y="8" width="20" height="10" rx="1" fill="#8B9BAD" opacity="0.55" />
        {/* Clip jaws */}
        <path d="M 4 8 L 4 4 C 4 2 6 2 6 4 L 6 8" fill="#7A8E9E" opacity="0.65" />
        <path d="M 22 8 L 22 4 C 22 2 24 2 24 4 L 24 8" fill="#7A8E9E" opacity="0.65" />
        {/* Top loop */}
        <path d="M 6 2 Q 14 -2 22 2" fill="none" stroke="#7A8E9E" strokeWidth="1.5" opacity="0.45" strokeLinecap="round" />
        {/* Highlight */}
        <rect x="7" y="9" width="14" height="2" rx="0.5" fill="rgba(255,255,255,0.22)" />
      </svg>

      {/* Card — rotated more aggressively, partially clipped */}
      <div
        className="relative cursor-pointer select-none"
        style={{ width: 150, height: 96, perspective: 800, rotate: '-9deg', marginLeft: 6 }}
        onClick={() => setFlipped(v => !v)}
        role="button" tabIndex={0}
        aria-label={flipped ? 'Flip SDC ID back to front' : 'Flip SDC ID card to see the back'}
        aria-pressed={flipped}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(v => !v); } }}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-[#1A3A5C] shadow-md overflow-hidden p-2.5"
            style={{ backfaceVisibility: 'hidden', borderRadius: 3 }}
          >
            <div className="bg-[#C9A84C]/18 h-4 rounded-sm flex items-center px-2 mb-2">
              <p className="font-sans text-[5.5px] tracking-[0.32em] uppercase text-[#C9A84C]/65">Student Design Council</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-white/8 border border-white/10 flex items-center justify-center" style={{ width: 28, height: 36 }}>
                <p className="text-[10px] text-white/28" aria-hidden="true">👤</p>
              </div>
              <div>
                <p className="font-handwriting text-[8px] text-white/32 mt-0.5">Member</p>
                <p className="font-letter text-[14px] text-white/52 leading-tight mt-0.5">SDC</p>
                <p className="font-sans text-[5px] text-white/18 tracking-wider mt-1">2025–2026</p>
              </div>
            </div>
            <p className="absolute bottom-2 right-2 font-handwriting text-[6.5px] text-white/14 italic">flip →</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 bg-[#FDFCF8] shadow-md flex flex-col items-center justify-center p-3"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 3, border: '1px solid rgba(60,40,20,0.08)' }}
          >
            <p className="font-letter text-[19px] text-charcoal/62 text-center leading-snug">
              Welcome to SDC ❤️🔥
            </p>
            <div className="mt-2 h-px w-14 bg-charcoal/10" />
            <p className="font-handwriting text-[7.5px] text-charcoal/26 italic mt-1.5">both of us. together.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── IELTS vocabulary paper ───────────────────────────────────────────────────
function IELTSNotes({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ opacity: { delay, duration: 0.5 }, y: { type: 'spring', stiffness: 44, damping: 11, delay } }}
      style={{ width: 166, rotate: '-1.5deg', backgroundColor: '#FDFBF5' }}
      className="relative border border-charcoal/10 shadow-sm overflow-hidden"
    >
      {/* Aged paper tint — slight yellowing from being kept */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,195,140,0.09) 0%, transparent 55%)', zIndex: 1 }}
        aria-hidden="true"
      />
      <div className="bg-[#E4EAF3] px-3 py-1.5 border-b border-charcoal/8 relative z-10">
        <p className="font-sans text-[6px] tracking-[0.3em] uppercase text-[#3A5C82]/40">IELTS Vocabulary</p>
      </div>
      <div className="px-3 pt-2 pb-2.5 relative z-10" style={{ backgroundColor: '#FDFBF5' }}>
        {[
          { word: 'ambiguous', def: 'unclear in meaning' },
          { word: 'perseverance', def: 'keep going no matter what' },
          { word: 'abroad', def: '→ one day. soon.' },
          { word: 'aspire', def: 'to dream + work for it' },
        ].map(({ word, def }, i) => (
          <div key={i} className="flex gap-1.5 border-b border-charcoal/6 py-0.5 last:border-b-0">
            <p className="font-letter text-[10px] text-[#3A5C82]/52 w-20 flex-shrink-0">{word}</p>
            <p className="font-handwriting text-[8px] text-charcoal/32 italic">{def}</p>
          </div>
        ))}
        <p className="font-handwriting text-[8px] text-charcoal/22 italic mt-2 pt-1 border-t border-charcoal/6">
          one step at a time...
        </p>
      </div>
    </motion.div>
  );
}

// ─── Veloura sketch — off-centre, as a real sketch would be ──────────────────
function VelouraSketch({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 160 }}
    >
      {/* Logo sketch paper — deliberately not centred */}
      <div
        className="bg-[#FFFEF8] border border-charcoal/10 shadow-sm p-3"
        style={{ rotate: '3deg', width: 118 }}
      >
        <p className="font-sans text-[5.5px] tracking-[0.28em] uppercase text-charcoal/18 mb-1.5">logo sketch</p>
        <svg width="94" height="46" viewBox="0 0 94 46" aria-label="Veloura logo sketch">
          {/* crossed-out v1 attempt — offset left */}
          <ellipse cx="32" cy="18" rx="28" ry="10" fill="none" stroke="#2D2D2D" strokeWidth="0.6"
            opacity="0.09" strokeDasharray="2 1.5" />
          <line x1="4" y1="9" x2="62" y2="27" stroke="#2D2D2D" strokeWidth="0.6" opacity="0.11" />
          {/* v2 — shifted off-centre, slightly lower */}
          <ellipse cx="38" cy="26" rx="34" ry="12" fill="none" stroke="#2D2D2D" strokeWidth="0.7"
            opacity="0.16" strokeDasharray="2 1.5" />
          {/* Text intentionally left-aligned, not centred */}
          <text x="10" y="30" textAnchor="start" fontSize="11" fill="#2D2D2D" opacity="0.44"
            fontFamily="'Playfair Display', serif" fontStyle="italic">Veloura</text>
          <path d="M 8 38 L 70 38" stroke="#2D2D2D" strokeWidth="0.4" opacity="0.07" />
          {/* "v2 — better?" also left-shifted, rotated slightly */}
          <text x="8" y="44" textAnchor="start" fontSize="4.5" fill="#2D2D2D" opacity="0.18"
            fontFamily="sans-serif" transform="rotate(-1.5 8 44)">v2 — better?</text>
        </svg>
      </div>
      {/* Tiny brainstorm sticky */}
      <div
        className="absolute"
        style={{
          top: 8, right: 0,
          backgroundColor: '#E8F4E8',
          width: 62,
          rotate: '-5deg',
          padding: '6px 7px 10px 7px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        }}
      >
        <p className="font-handwriting text-[8.5px] text-charcoal/45 leading-relaxed">
          v1 ❌<br />
          v2 ✓?<br />
          v3?
        </p>
      </div>
    </motion.div>
  );
}

// ─── Planning notebook — "Zara Zara" hidden ───────────────────────────────────
function NotebookFragment({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      style={{ width: 190, rotate: '0.5deg' }}
      className="relative bg-white border border-charcoal/10 shadow-sm overflow-hidden"
    >
      {/* Spiral holes */}
      <div className="absolute top-0 bottom-0 left-0 w-5 bg-[#EDE8DF] border-r border-charcoal/8 flex flex-col justify-around items-center py-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#D9D2C8] border border-charcoal/10" />
        ))}
      </div>
      <div className="absolute top-0 bottom-0 left-8 border-l border-[#E8B4B4]/25" />
      <div className="pl-10 pr-3 pt-2 pb-3">
        <div className="h-5 border-b border-[#B0C4D8]/12 flex items-center">
          <p className="font-handwriting text-[9px] text-charcoal/42">June goals —</p>
        </div>
        <div className="h-5 border-b border-[#B0C4D8]/12 flex items-center gap-1.5">
          <p className="font-handwriting text-[9px] text-charcoal/20 line-through">NIC ideas</p>
          <p className="font-handwriting text-[9px] text-charcoal/30">NIC campaign draft →</p>
        </div>
        <div className="h-5 border-b border-[#B0C4D8]/12 flex items-center gap-1">
          <p className="font-handwriting text-[9px] text-charcoal/26 italic">Inscribe collab?</p>
          <p className="font-handwriting text-[7px] text-charcoal/18 italic">(ask her)</p>
        </div>
        <div className="h-5 border-b border-[#B0C4D8]/12" />
        <div className="h-5 border-b border-[#B0C4D8]/12 flex items-center gap-1.5">
          <p className="font-handwriting text-[9px] text-charcoal/28">SDC project list</p>
          <p className="font-handwriting text-[7px] text-charcoal/18">← due when??</p>
        </div>
        <div className="h-5 border-b border-[#B0C4D8]/12 flex items-center gap-1.5">
          <p className="font-handwriting text-[9px] text-charcoal/16 italic line-through">Veloura logo</p>
          <p className="font-handwriting text-[9px] text-charcoal/22 italic">brand deck</p>
        </div>
        <div className="h-5 border-b border-[#B0C4D8]/12" />
      </div>
      <motion.p
        className="absolute font-handwriting text-[6px] text-[#3A5C82]/16 pointer-events-none select-none"
        style={{ left: 0, top: '50%', transform: 'rotate(-90deg)', transformOrigin: 'left center', whiteSpace: 'nowrap' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 3, duration: 2.2 }}
        aria-hidden="true"
      >
        zara zara...
      </motion.p>
    </motion.div>
  );
}

// ─── Calendar page — June 2026 — with marks, coffee ring, phone number ────────
function CalendarPage({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      style={{ width: 106, rotate: '-2.5deg' }}
      className="relative bg-white border border-charcoal/10 shadow-sm overflow-hidden"
    >
      {/* Coffee ring stain — overlaid on the calendar */}
      <svg
        width="106" height="106"
        viewBox="0 0 106 106"
        className="absolute pointer-events-none z-10"
        style={{ top: 0, left: 0 }}
        aria-hidden="true"
      >
        {/* Main ring */}
        <ellipse cx="78" cy="72" rx="22" ry="20"
          fill="none" stroke="rgba(101,67,33,0.13)" strokeWidth="2.8" />
        {/* Inner ring */}
        <ellipse cx="78" cy="72" rx="15" ry="13"
          fill="rgba(101,67,33,0.04)" />
        {/* Smear */}
        <path d="M 58 80 C 64 83, 72 82, 80 80"
          fill="none" stroke="rgba(101,67,33,0.07)" strokeWidth="1.5" />
        {/* Highlighter swipe across week row */}
        <rect x="2" y="64" width="60" height="7" fill="rgba(255,220,50,0.18)" />
        {/* Cross through a date */}
        <line x1="46" y1="44" x2="55" y2="52" stroke="rgba(80,40,20,0.22)" strokeWidth="1.2" />
        <line x1="55" y1="44" x2="46" y2="52" stroke="rgba(80,40,20,0.22)" strokeWidth="1.2" />
        {/* Pen underline */}
        <line x1="2" y1="78" x2="40" y2="79" stroke="rgba(58,92,130,0.20)" strokeWidth="1" />
      </svg>

      {/* Calendar header */}
      <div className="bg-[#3A5C82] px-3 py-1.5 text-center">
        <p className="font-sans text-[7px] tracking-[0.28em] uppercase text-white/55">June 2026</p>
      </div>

      <div className="p-2 relative">
        <div className="grid grid-cols-7 gap-0 mb-0.5">
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <p key={i} className="font-sans text-[5px] text-charcoal/22 text-center">{d}</p>
          ))}
        </div>
        {[
          [null, null, null, 1, 2, 3, 4],
          [5, 6, 7, 8, 9, 10, 11],
          [12, 13, 14, 15, 16, 17, 18],
          [19, 20, 21, 22, 23, 24, 25],
          [26, 27, 28, 29, 30, null, null],
        ].map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-0">
            {week.map((day, di) => (
              <div key={di} className="h-4 flex items-center justify-center relative">
                {day ? (
                  <p className={`font-sans text-[5.5px] leading-none ${
                    day === 15 ? 'text-[#C9A84C]' :
                    day === 22 ? 'text-[#3A5C82]' :
                    day === 9  ? 'text-charcoal/14' :
                    'text-charcoal/28'
                  }`}>{day}</p>
                ) : null}
                {day === 15 && (
                  <div className="absolute inset-0 rounded-full border border-[#C9A84C]/30 scale-90" />
                )}
                {day === 22 && (
                  <div className="absolute inset-0 rounded-full border border-[#3A5C82]/22 scale-90" />
                )}
              </div>
            ))}
          </div>
        ))}
        {/* Handwritten notes + phone number */}
        <div className="mt-1 pt-1 border-t border-charcoal/6 relative">
          <p className="font-handwriting text-[6px] text-charcoal/25 italic">← meeting</p>
          <p className="font-handwriting text-[6px] text-[#3A5C82]/28 italic">↑ call?</p>
          <p className="font-handwriting text-[5.5px] text-charcoal/18 mt-0.5">98765 43210</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Chapter Six ──────────────────────────────────────────────────────────────
export default function ChapterSix({ onNext, onPrev }: ChapterProps) {
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#F6F8FA' }}
      variants={slideVariants}
      initial="initial" animate="animate" exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      aria-label="Chapter Six: The Dreams We Started Building"
    >
      {/* Notebook-paper grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(58,92,130,0.025) 1px, transparent 1px), linear-gradient(rgba(58,92,130,0.025) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />
      <MorningSunlight />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-10 py-8 z-10 relative flex flex-col">

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#3A5C82]/38 mb-1">Chapter Six · June 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#1A3A5C] leading-tight">
              The Dreams We<br />Started Building
            </h2>
            <motion.svg className="w-44 h-4 mt-1.5" viewBox="0 0 180 12" aria-hidden="true">
              <motion.path
                d="M0 7 Q45 3 90 7 Q135 11 180 6"
                fill="none" stroke="#3A5C82" strokeWidth="1.5" strokeLinecap="round" opacity={0.28}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.7 }}
              />
            </motion.svg>
          </motion.div>

          <div className="relative flex-1 mt-6" style={{ minHeight: 460 }}>

            {/* Bucket list — now real notebook paper style */}
            <div className="absolute top-0 left-0">
              <BucketList delay={0.7} />
            </div>

            {/* Passport photo strip */}
            <div className="absolute top-4 right-4">
              <PassportPhoto delay={0.9} />
            </div>

            {/* Calendar — with coffee stain, marks, phone number */}
            <div className="absolute" style={{ top: 234, right: 0 }}>
              <CalendarPage delay={1.5} />
            </div>

            {/* "deal is deal." sticky */}
            <div className="absolute" style={{ top: 286, left: 18 }}>
              <DealSticky delay={1.8} />
            </div>

          </div>

          <div className="flex gap-4 pt-6 mt-auto">
            <button
              onClick={onPrev}
              className="font-handwriting text-xl text-[#1A3A5C]/38 hover:text-[#1A3A5C] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A5C82]/50 focus-visible:ring-offset-2"
              aria-label="Previous chapter"
            >← back</button>
            <button
              onClick={onNext}
              className="font-handwriting text-xl text-[#3A5C82]/60 hover:text-[#1A3A5C] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A5C82]/50 focus-visible:ring-offset-2 ml-auto"
              aria-label="Next chapter"
            >next chapter →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE ═══════════ */}
        <div className="flex-1 md:pl-10 py-8 z-10">
          <div className="relative" style={{ minHeight: 660 }}>

            {/* IELTS notes — top left */}
            <div className="absolute top-0 left-0">
              <IELTSNotes delay={0.8} />
            </div>

            {/* Passport folder — top right */}
            <div className="absolute top-2 right-0">
              <PassportFolder delay={1.0} />
            </div>

            {/* SDC ID card — clipped, rotated -9°, partially behind notebook */}
            <div className="absolute z-0" style={{ top: 190, left: -8 }}>
              <SDCIdCard delay={1.2} />
            </div>

            {/* Notebook fragment — overlaps SDC card */}
            <div className="absolute z-10" style={{ top: 216, left: 24 }}>
              <NotebookFragment delay={1.6} />
            </div>

            {/* Bike sketch — mid right */}
            <div className="absolute" style={{ top: 212, right: 0 }}>
              <BikeSketch delay={1.4} />
            </div>

            {/* Veloura sketch — lower left, off-centre */}
            <div className="absolute" style={{ top: 376, left: 2 }}>
              <VelouraSketch delay={1.7} />
            </div>

            {/* Ending */}
            <motion.div
              className="absolute left-0 right-0 text-center"
              style={{ bottom: 6 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.4, duration: 2.6 }}
            >
              <p className="font-quote text-sm text-charcoal/25 italic leading-relaxed">
                The future<br />
                <span className="text-charcoal/19">was no longer</span><br />
                <span className="text-charcoal/15 text-xs">something we imagined.</span>
              </p>
              <p className="font-quote text-xs text-charcoal/12 italic mt-2">
                It had started.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
