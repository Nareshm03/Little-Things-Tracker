import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Motion helper ─────────────────────────────────────────────────────────────
// Paper settles — drops and tilts into place. Not a UI fade.
function paperSettle(targetRotate: number, delay: number) {
  return {
    initial: { opacity: 0, rotate: targetRotate + 7, y: 32 },
    animate: { opacity: 1, rotate: targetRotate, y: 0 },
    transition: {
      opacity: { delay, duration: 0.4 },
      rotate: { type: 'spring' as const, stiffness: 44, damping: 11, delay },
      y: { type: 'spring' as const, stiffness: 44, damping: 11, delay },
    },
  };
}

// ─── Date Divider ─────────────────────────────────────────────────────────────

function DateDivider({ date, delay = 0 }: { date: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className="flex items-center gap-3 my-4"
    >
      <div className="w-4 h-px bg-charcoal/10" />
      <p className="font-handwriting text-[15px] text-charcoal/38 whitespace-nowrap tracking-wide">{date}</p>
      <div className="flex-1 h-px bg-charcoal/12" />
    </motion.div>
  );
}

// ─── INTERACTIVE 1: Envelope — First Kiss ─────────────────────────────────────
// rotate(-5deg). Very soft shadow.

function EnvelopeCard({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);
  const settle = paperSettle(-5, delay);

  return (
    <motion.div
      {...settle}
      className="relative"
      style={{ width: 360 }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 washi-tape" />

      <div
        className="bg-[#FDF6E8] border border-[#D4C4A8]/60 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-coffee/30"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
        onClick={() => setOpened(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Close envelope' : 'Open envelope'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        {/* Flap */}
        <motion.div
          className="w-full origin-top pointer-events-none"
          animate={{ scaleY: opened ? 0 : 1, opacity: opened ? 0 : 1 } as any}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg viewBox="0 0 220 52" width="100%" className="block">
            <polygon points="0,0 110,47 220,0" fill="#F0E6CC" />
            <line x1="0" y1="0" x2="110" y2="47" stroke="#D4C4A8" strokeWidth="0.7" opacity="0.5" />
            <line x1="220" y1="0" x2="110" y2="47" stroke="#D4C4A8" strokeWidth="0.7" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="px-5 py-4 min-h-[80px] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="100%" x2="50%" y2="52" stroke="#D4C4A8" strokeWidth="0.5" opacity="0.35" />
            <line x1="100%" y1="100%" x2="50%" y2="52" stroke="#D4C4A8" strokeWidth="0.5" opacity="0.35" />
          </svg>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.p key="hint" exit={{ opacity: 0 }}
                className="font-handwriting text-xs text-charcoal/30 text-center">
                tap to open
              </motion.p>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="w-full flex flex-col items-center gap-3"
              >
                <div className="bg-white p-2 pb-7 border border-gray-100/80 relative"
                  style={{ width: 143, transform: 'rotate(1deg)', boxShadow: '1px 2px 8px rgba(0,0,0,0.09)' }}>
                  <div className="w-full bg-[#EDE3D8]" style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-2xl opacity-30" aria-hidden="true">💋</span>
                  </div>
                </div>
                <p className="font-handwriting text-xs text-charcoal/45">14 February 2026</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── INTERACTIVE: Chocolate wrapper peels to reveal chat ──────────────────────
// rotate(7deg). Strong shadow. Wrapper covers the memory — peel to read it.

function ChocolateArtifact({ delay }: { delay: number }) {
  const [peeled, setPeeled] = useState(false);
  const settle = paperSettle(7, delay);

  return (
    <motion.div
      {...settle}
      className="relative"
      style={{ width: 256 }}
    >
      <div className="absolute -top-3 right-3 w-12 h-5 washi-tape -rotate-[3deg]" />

      {/* Strong shadow */}
      <div
        className="bg-[#F9F6F0] border border-charcoal/10 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-coffee/30"
        style={{ boxShadow: '4px 8px 28px rgba(0,0,0,0.18)' }}
        onClick={() => setPeeled(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={peeled ? 'Cover the message' : 'Peel the wrapper'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPeeled(v => !v); } }}
      >
        {/* Chat always sits here — revealed when wrapper peels */}
        <div className="px-3 py-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
          <p className="text-[15px] tracking-widest uppercase text-charcoal/28 mb-2 font-sans">15 February 2026</p>
          <div className="flex justify-end">
            <div className="bg-[#DCF8C6] px-2 py-1 rounded-lg rounded-tr-sm text-[14px] text-[#111] max-w-[80%]">
              I think dark chocolate... you?
              <span className="ml-1 text-[14px] text-green-600/50">✓✓</span>
            </div>
          </div>
        </div>

        {/* Wrapper peels upward from top */}
        <motion.div
          className="absolute inset-0 origin-bottom"
          animate={{ scaleY: peeled ? 0.09 : 1 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{ zIndex: 10 }}
        >
          <div className="bg-[#4A2C0A] w-full h-full flex flex-col justify-center"
            style={{ borderRadius: '2px' }}>
            <div className="border border-[#C8924A]/35 mx-4 my-4 px-3 py-3">
              <p className="font-sans text-[16px] tracking-[0.25em] uppercase text-[#C8924A]/70 text-center leading-none mb-0.5">Dark</p>
              <p className="font-display text-sm text-[#F0D08A] text-center">Chocolate</p>
            </div>
            {!peeled && (
              <p className="font-handwriting text-[15px] text-[#C8924A]/50 text-center pb-2">peel ↑</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Hidden detail: tiny 😂😂😂 almost invisible */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 2.2, duration: 2 }}
        className="absolute -bottom-4 left-1 font-handwriting text-[15px] text-charcoal/18 select-none pointer-events-none"
        aria-hidden="true"
      >😂😂😂</motion.p>
    </motion.div>
  );
}

// ─── STATIC: Recipe Card — handwritten, human ─────────────────────────────────
// rotate(2deg). Medium shadow. Real recipe, not a designed list.

function RecipeArtifact({ delay }: { delay: number }) {
  const settle = paperSettle(2, delay);

  const lines = [
    { text: '2 people', indent: false },
    { text: '1 kitchen', indent: false },
    { text: 'too much laughing', indent: true },
    { text: 'a little burning', indent: true },
    { text: '∞ cuddles', indent: false },
  ];

  return (
    <motion.div
      {...settle}
      className="relative"
      style={{ width: 220 }}
    >
      <div className="absolute -top-3 left-4 w-12 h-5 washi-tape rotate-[2deg]" />
      <div
        className="bg-[#FEFCE8] border border-[#D4C89A]/50 px-5 py-4"
        style={{ boxShadow: '2px 4px 14px rgba(0,0,0,0.10)' }}
      >
        <p className="font-handwriting text-base text-coffee/70 mb-3 border-b border-charcoal/10 pb-2">
          Recipe
        </p>
        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3 + i * 0.15, duration: 0.7 }}
              className={`font-handwriting text-sm text-charcoal/62 ${line.indent ? 'pl-3' : ''}`}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Hidden: tiny heart */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 2.5, duration: 2 }}
        className="absolute -bottom-4 right-3 font-handwriting text-[14px] text-[#C87070]/22 select-none pointer-events-none"
        aria-hidden="true"
      >♡</motion.p>
    </motion.div>
  );
}

// ─── STATIC: Sticky Note ──────────────────────────────────────────────────────
// rotate(-8deg). Almost no shadow.

function StickyArtifact({ delay }: { delay: number }) {
  const settle = paperSettle(-8, delay);

  return (
    <motion.div
      {...settle}
      style={{ width: 224 }}
    >
      <div
        className="bg-[#FEF08A] px-4 py-4"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
      >
        <p className="font-handwriting text-[16px] text-charcoal/35 mb-1.5">20 February 2026</p>
        <p className="font-letter text-xs text-charcoal/80 leading-snug">
          "I think I'll stop using my brain when I'm with you 😂"
        </p>
        <p className="font-handwriting text-[16px] text-charcoal/38 mt-2 text-right">— Meghana</p>
      </div>
    </motion.div>
  );
}

// ─── STATIC: Campus Doodle — pen-drawn, not digital ──────────────────────────

function CampusDoodle({ delay }: { delay: number }) {
  const settle = paperSettle(1.5, delay);

  return (
    <motion.div
      {...settle}
      className="relative"
      style={{ width: 206 }}
    >
      <div className="absolute -top-3 left-3 w-12 h-5 washi-tape -rotate-[1deg]" />
      <div
        className="bg-[#F5F0E8] border border-charcoal/12 p-3"
        style={{ boxShadow: '1px 3px 10px rgba(0,0,0,0.08)' }}
      >
        <p className="font-handwriting text-[15px] text-charcoal/35 text-center mb-2">16 February 2026</p>
        <svg viewBox="0 0 144 96" width="100%" className="block">
          {/* Hand-drawn boxes — slightly wobbly */}
          {/* College building — top left */}
          <path d="M6 8 Q6.5 8 44 8.5 Q44 8.5 44.5 34 Q44.5 34.5 6.5 34 Q6 34 6 8"
            fill="#EDE3CC" stroke="#8B7355" strokeWidth="1.1" strokeLinejoin="round" />
          <text x="25" y="24" textAnchor="middle" fontSize="7" fill="#6B5530"
            fontFamily="Georgia,serif" fontStyle="italic">College</text>

          {/* Canteen — bottom right */}
          <path d="M92 58 Q92.5 58 138 58.5 Q138 58.5 138.5 90 Q138.5 90.5 92.5 90 Q92 90 92 58"
            fill="#EDE3CC" stroke="#8B7355" strokeWidth="1.1" strokeLinejoin="round" />
          <text x="115" y="76" textAnchor="middle" fontSize="7" fill="#6B5530"
            fontFamily="Georgia,serif" fontStyle="italic">Canteen</text>

          {/* Hand-drawn vertical path — like a pen line down then across */}
          <path d="M25 34 L25.5 55 Q25.5 56 27 56 L91 57"
            fill="none" stroke="#C86A2A" strokeWidth="1.3" strokeLinecap="round"
            strokeLinejoin="round" />

          {/* Destination marker — hand-drawn X */}
          <motion.path
            d="M88 54 L94 60 M94 54 L88 60"
            stroke="#C86A2A" strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 1.0, duration: 0.6 }}
          />

          {/* Path drawn on animate */}
          <motion.path
            d="M25 34 L25.5 55 Q25.5 56 27 56 L88 57"
            fill="none" stroke="#C86A2A" strokeWidth="1.3" strokeLinecap="round"
            strokeLinejoin="round" opacity={0}
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ delay: delay + 0.5, duration: 1.0, ease: 'easeOut' }}
          />

          {/* Animated draw over */}
          <motion.path
            d="M25 34 L25.5 55 Q25.5 56 27 56 L88 57"
            fill="none" stroke="#C86A2A" strokeWidth="1.3" strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: delay + 0.5, duration: 1.0, ease: 'easeOut' }}
          />
        </svg>
        <p className="font-handwriting text-[15px] text-charcoal/38 text-center mt-1 italic">
          "you came."
        </p>
      </div>
    </motion.div>
  );
}

// ─── INTERACTIVE: Sikkina Unde ────────────────────────────────────────────────
// rotate(-12deg). Paper-thin shadow. "pull gently". Hidden "bangara." sideways.

function SikkinaUnde({ delay }: { delay: number }) {
  const [pulled, setPulled] = useState(false);
  const settle = paperSettle(-12, delay);

  return (
    <motion.div
      {...settle}
      className="relative"
      style={{ width: 246 }}
    >
      <div className="absolute -top-3 left-5 w-14 h-5 washi-tape rotate-[1deg]" />
      <div
        className="bg-[#F9F6F0] border border-charcoal/10 overflow-hidden"
        style={{ boxShadow: '1px 2px 6px rgba(0,0,0,0.06)' }}
      >
        <p className="font-handwriting text-[15px] text-charcoal/32 text-center pt-3 pb-1">23 February 2026</p>

        <div
          className="relative mx-auto my-2 cursor-pointer"
          style={{ width: 154, height: 102 }}
          onClick={() => setPulled(v => !v)}
          role="button"
          tabIndex={0}
          aria-label={pulled ? 'Close sweet wrapper' : 'Pull open sweet wrapper'}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPulled(v => !v); } }}
        >
          {/* Note beneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FEFCE8] border border-[#D4C89A]/40 px-3 py-2">
            <AnimatePresence>
              {pulled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-center"
                >
                  <p className="font-handwriting text-xs text-coffee/70 leading-snug">
                    "From this day...<br />you became Bangara."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wrapper peels back */}
          <motion.div
            className="absolute inset-0 origin-bottom"
            animate={{ scaleY: pulled ? 0.08 : 0.72 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg viewBox="0 0 120 80" width="120" height="80">
              <ellipse cx="7" cy="40" rx="7" ry="14" fill="#C8924A" opacity="0.6" />
              <ellipse cx="113" cy="40" rx="7" ry="14" fill="#C8924A" opacity="0.6" />
              <rect x="12" y="12" width="96" height="56" rx="12" fill="#E8A84A" />
              <rect x="18" y="18" width="84" height="44" rx="10" fill="#F0B84A" />
              <ellipse cx="50" cy="26" rx="18" ry="6" fill="white" opacity="0.2" />
              <text x="60" y="44" textAnchor="middle" fontSize="10" fill="#7C4A0A"
                fontFamily="Georgia,serif">Sikkina Unde</text>
              <text x="60" y="58" textAnchor="middle" fontSize="7" fill="#7C4A0A"
                fontFamily="Georgia,serif" opacity="0.5">pull gently</text>
            </svg>
          </motion.div>
        </div>

        <AnimatePresence>
          {pulled && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-sans text-[15px] tracking-widest uppercase text-charcoal/28 text-center pb-3"
            >
              A small sweet. A big nickname.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden: "bangara." written sideways, barely visible */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 2.8, duration: 2 }}
        className="absolute -right-5 top-1/2 font-handwriting text-[15px] text-coffee/18 select-none pointer-events-none"
        style={{ transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center' }}
        aria-hidden="true"
      >bangara.</motion.p>
    </motion.div>
  );
}

// ─── INTERACTIVE: 26 Feb Kiss Note — folded receipt ───────────────────────────
// No border. No card. Just paper. Tap to unfold and read the cascade.

function FebQuoteNote({ delay }: { delay: number }) {
  const [unfolded, setUnfolded] = useState(false);
  const settle = paperSettle(2.5, delay);

  return (
    <motion.div
      {...settle}
      style={{ width: 206 }}
      className="relative"
    >
      {/* Folded receipt — just cream paper, no border */}
      <div
        className="bg-[#FDFAF4] cursor-pointer focus-within:outline-none"
        style={{ boxShadow: '1px 2px 8px rgba(0,0,0,0.07)' }}
        onClick={() => setUnfolded(v => !v)}
        role="button"
        tabIndex={0}
        aria-label={unfolded ? 'Fold the note' : 'Open the note'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setUnfolded(v => !v); } }}
      >
        {/* Fold line visible at top — shows it's folded */}
        <div className="border-b border-charcoal/8 px-4 py-2.5">
          <p className="font-handwriting text-[15px] text-charcoal/28">
            {unfolded ? '26 February' : 'tap to open ↓'}
          </p>
        </div>

        <AnimatePresence initial={false}>
          {!unfolded && (
            <motion.div
              key="folded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-3">
                {/* Folded paper lines — shows content is hidden */}
                <div className="space-y-2">
                  <div className="h-px bg-charcoal/8 w-4/5" />
                  <div className="h-px bg-charcoal/5 w-3/5" />
                  <div className="h-px bg-charcoal/8 w-4/5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {unfolded && (
            <motion.div
              key="open"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 py-4">
                {[
                  { text: '"The kiss was so good', d: 0.1 },
                  { text: 'good', d: 0.4, indent: 3 },
                  { text: 'good', d: 0.7, indent: 5 },
                  { text: 'good."', d: 1.0, indent: 7 },
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: line.d, duration: 0.8 }}
                    className="font-handwriting text-sm text-charcoal/65 leading-relaxed"
                    style={{ paddingLeft: `${(line as any).indent ?? 0}px` }}
                  >
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

// ─── INTERACTIVE: Forgot the Hug ─────────────────────────────────────────────

function ForgotHug() {
  const [phase, setPhase] = useState<'empty' | 'whisper' | 'hug'>('empty');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setPhase('whisper'), shouldReduceMotion ? 100 : 2000);
    return () => clearTimeout(t);
  }, [isInView, shouldReduceMotion]);

  return (
    <div ref={ref} className="text-center py-6">
      <div className="h-6" />
      <AnimatePresence>
        {(phase === 'whisper' || phase === 'hug') && (
          <motion.div
            key="whisper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <button
              onClick={() => setPhase('hug')}
              disabled={phase === 'hug'}
              className="font-handwriting text-sm text-charcoal/38 hover:text-charcoal/55 transition-colors cursor-pointer bg-transparent border-none p-0 disabled:cursor-default"
              aria-label="Reveal the forgotten hug"
            >
              "You forgot something..."
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'hug' && (
          <motion.div
            key="hug"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="mt-5"
          >
            <svg viewBox="0 0 130 75" width="130" height="75" className="mx-auto mb-3"
              aria-label="Two figures hugging">
              <circle cx="42" cy="17" r="9" fill="none" stroke="#7C6A4F" strokeWidth="1.4" />
              <path d="M42 26 L42 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M42 37 Q32 33 28 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M42 37 Q55 31 65 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M34 50 Q42 62 50 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <circle cx="88" cy="17" r="9" fill="none" stroke="#7C6A4F" strokeWidth="1.4" />
              <path d="M88 26 L88 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M88 37 Q75 31 65 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M88 37 Q98 33 102 37" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <path d="M80 50 Q88 62 96 50" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <text x="65" y="42" textAnchor="middle" fontSize="11" fill="#C87070" opacity="0.6">♥</text>
            </svg>
            <p className="font-quote text-sm text-charcoal/60 italic">
              "You missed something while going."
            </p>
            <p className="font-handwriting text-xs text-charcoal/32 mt-1">— 27 February 2026</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FFF6EC]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 flex flex-col py-8 z-10 relative">

          {/* Background details */}
          <div
            className="absolute top-24 left-2 w-16 h-16 rounded-full border-2 border-[#C8924A]/12 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 5px rgba(200,146,74,0.05)' }}
            aria-hidden="true"
          />
          <svg className="absolute top-56 left-1 opacity-18 pointer-events-none" width="14" height="38" viewBox="0 0 14 38" aria-hidden="true">
            <path d="M7 2 Q13 2 13 8 L13 30 Q13 36 7 36 Q1 36 1 30 L1 10 Q1 6 4 6 Q7 6 7 10 L7 28 Q7 32 5 32" fill="none" stroke="#7C6A4F" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-44 left-2 text-base opacity-18 pointer-events-none" aria-hidden="true">🌸</div>
          <div className="absolute bottom-24 left-0 w-7 h-14 bg-[#E8DDD0] border border-[#C8B8A8]/25 opacity-14 pointer-events-none"
            style={{ rotate: '5deg' }} aria-hidden="true">
            <div className="w-full h-2.5 bg-[#C8924A]/20 mt-2" />
          </div>

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="mb-8">
            <p className="font-sans text-xs tracking-[0.38em] uppercase text-brown/38 mb-2">Chapter Two</p>
            <p className="font-handwriting text-xl text-coffee/48 mb-1">February 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-coffee font-light leading-snug">
              The Days We Couldn't<br />Stop Smiling
            </h2>
            <motion.svg className="w-40 h-4 mt-2" viewBox="0 0 160 12" aria-hidden="true">
              <motion.path d="M 0 8 C 35 3, 80 11, 120 6 S 150 9, 160 7"
                fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }} />
            </motion.svg>
          </motion.div>

          {/* Date timeline */}
          <div className="space-y-0.5 flex-1">
            <DateDivider date="14 February 2026" delay={0.8} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
              className="font-handwriting text-lg text-charcoal/42 pl-2 pb-3">The first one.</motion.p>

            <DateDivider date="15 February 2026" delay={1.4} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 1 }}
              className="pl-2 pb-3 space-y-1">
              <p className="font-handwriting text-lg text-charcoal/38">She said dark chocolate.</p>
              <p className="font-handwriting text-lg text-charcoal/32 italic">Then she dreamed of a kitchen.</p>
            </motion.div>

            <DateDivider date="16 February 2026" delay={2.0} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 1 }}
              className="font-handwriting text-lg text-charcoal/38 pl-2 pb-3">4:30 PM at the canteen entrance.</motion.p>

            <DateDivider date="20 February 2026" delay={2.6} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9, duration: 1 }}
              className="font-handwriting text-lg text-charcoal/35 pl-2 pb-3 italic">She stopped using her brain.<br />It's fine. Same.</motion.p>

            <DateDivider date="23 February 2026" delay={3.2} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}
              className="pl-2 pb-3">
              <p className="font-handwriting text-lg text-charcoal/38">Sikkina Unde.</p>
              <p className="font-handwriting text-lg text-coffee/55">Bangara.</p>
            </motion.div>

            <DateDivider date="26 February 2026" delay={3.8} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.1, duration: 1 }}
              className="font-handwriting text-lg text-charcoal/35 pl-2 pb-3 italic">"...so good good good good good."</motion.p>

            <DateDivider date="27 February 2026" delay={4.4} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.7, duration: 1 }}
              className="font-handwriting text-lg text-charcoal/30 pl-2 italic">Something was forgotten.</motion.p>
          </div>

          {/* Closing — centered, tiny, lots of space around it */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 2 }}
            className="mt-16 mb-8 flex flex-col items-center text-center"
          >
            <p className="font-quote text-[16px] text-charcoal/28 mb-3 tracking-widest">*</p>
            <p className="font-quote text-base text-charcoal/42 leading-[2.2] italic">
              February was over.<br />
              <span className="text-charcoal/32">Somehow,</span><br />
              <span className="text-charcoal/38">it already felt like home.</span>
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2 mt-2">
            <button onClick={onPrev} className="font-sans text-xs text-charcoal/35 hover:text-coffee transition-colors tracking-widest uppercase">← Chapter One</button>
            <button onClick={onNext} className="font-sans text-xs text-charcoal/45 hover:text-coffee transition-colors tracking-widest uppercase">Next →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE ═══════════ */}
        <div className="flex-1 md:pl-12 py-8">

          {/* Desktop: organic scatter */}
          <div className="hidden md:block relative" style={{ minHeight: 960 }}>
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
              <EnvelopeCard delay={0.9} />
            </div>
            <div style={{ position: 'absolute', top: 8, left: 294 }}>
              <ChocolateArtifact delay={1.3} />
            </div>
            <div style={{ position: 'absolute', top: 256, left: 10 }}>
              <RecipeArtifact delay={1.8} />
            </div>
            <div style={{ position: 'absolute', top: 152, left: 288 }}>
              <StickyArtifact delay={2.2} />
            </div>
            <div style={{ position: 'absolute', top: 488, left: 18 }}>
              <CampusDoodle delay={2.6} />
            </div>
            <div style={{ position: 'absolute', top: 434, left: 254 }}>
              <SikkinaUnde delay={3.0} />
            </div>
            <div style={{ position: 'absolute', top: 700, left: 236 }} className="relative">
              <FebQuoteNote delay={3.6} />
            </div>
            <div style={{ position: 'absolute', top: 740, left: 0, right: 0 }}>
              <ForgotHug />
            </div>
          </div>

          {/* Mobile: natural flow */}
          <div className="flex flex-col gap-7 md:hidden">
            <EnvelopeCard delay={0.9} />
            <ChocolateArtifact delay={1.2} />
            <RecipeArtifact delay={1.5} />
            <StickyArtifact delay={1.8} />
            <CampusDoodle delay={2.1} />
            <SikkinaUnde delay={2.4} />
            <FebQuoteNote delay={2.7} />
            <ForgotHug />
          </div>

        </div>
      </div>
    </motion.div>
  );
}
