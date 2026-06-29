import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Sunlight drift ──────────────────────────────────────────────────────────
function SunlightDrift() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 w-[60%] h-full"
        style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(232,184,109,0.11) 0%, transparent 58%)' }}
        animate={{ x: [0, 18, 0], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─── Coffee mug + ring stain + steam ─────────────────────────────────────────
function CoffeeMug() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="relative" style={{ width: 80, height: 96 }}>
      {/* Ring stain on paper */}
      <div
        className="absolute bottom-0 left-1/2"
        style={{
          transform: 'translateX(-50%)',
          width: 58, height: 58,
          border: '2.5px solid rgba(101,67,33,0.085)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 38%, rgba(101,67,33,0.028) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Steam lines */}
      {!shouldReduceMotion && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 0, width: 36, height: 30 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute animate-steam"
              style={{
                left: `${22 + i * 20}%`,
                bottom: 6,
                width: 2,
                height: 13,
                borderRadius: 4,
                background: 'rgba(180,150,120,0.28)',
                animationDelay: `${i * 1.1}s`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      )}
      {/* Mug SVG */}
      <svg
        width="52" height="52"
        viewBox="0 0 52 52"
        className="absolute bottom-1 left-1/2 -translate-x-1/2"
        aria-label="Coffee mug" role="img"
      >
        <path d="M 9 10 L 9 40 Q 9 47 15 47 L 37 47 Q 43 47 43 40 L 43 10 Z" fill="#2C1810" opacity="0.72" />
        <path d="M 43 18 Q 54 18 54 28 Q 54 38 43 38" fill="none" stroke="#2C1810" strokeWidth="3.5" strokeLinecap="round" opacity="0.60" />
        <ellipse cx="26" cy="10" rx="17" ry="3.5" fill="#3D2212" opacity="0.72" />
        <ellipse cx="26" cy="10" rx="15.5" ry="2.5" fill="#6B3A1F" opacity="0.45" />
        <path d="M 13 20 Q 12 30 13 40" stroke="rgba(255,255,255,0.055)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

// ─── Chocolate wrapper (peel interaction) ─────────────────────────────────────
function ChocolateWrapper({ delay }: { delay: number }) {
  const [peeled, setPeeled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative"
      style={{ width: 158, height: 54 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
    >
      {/* Text revealed beneath wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" aria-hidden={!peeled}>
        <p className="font-letter text-[12px] text-charcoal/52 italic text-center leading-snug">
          I think dark chocolate...<br />
          <span className="text-charcoal/35 text-[11px]">you?</span>
        </p>
      </div>

      {/* Wrapper — peels open from the top */}
      <motion.div
        className="absolute inset-0 z-10 cursor-pointer"
        style={{ transformOrigin: 'top center', transformPerspective: 600 }}
        animate={!shouldReduceMotion ? { rotateX: peeled ? -162 : 0 } : {}}
        transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => setPeeled(v => !v)}
        role="button" tabIndex={0}
        aria-label={peeled ? 'Close chocolate wrapper' : 'Peel open chocolate wrapper'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPeeled(v => !v); } }}
      >
        <div
          className="w-full h-full rounded-sm overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #2c1810 0%, #3d2410 48%, #2c1810 100%)', border: '1px solid rgba(15,8,3,0.35)' }}
        >
          {[20, 38, 56, 74].map(x => (
            <div key={x} className="absolute top-0 bottom-0" style={{ left: `${x}%`, width: 1, background: 'rgba(255,255,255,0.04)' }} aria-hidden="true" />
          ))}
          <div className="absolute top-0 bottom-0 left-0 w-3" style={{ background: 'linear-gradient(90deg, rgba(192,185,168,0.16) 0%, transparent 100%)' }} aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-sans text-[7px] tracking-[0.25em] uppercase text-[#C0A882]/48 select-none">dark chocolate</p>
          </div>
        </div>
      </motion.div>

      {!peeled && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: delay + 1.6, duration: 1 }}
          className="absolute -bottom-5 right-1 font-handwriting text-[7.5px] text-charcoal/18 italic pointer-events-none select-none"
        >
          peel open ↑
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Recipe card (flip interaction) ──────────────────────────────────────────
function RecipeCard({ delay }: { delay: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative cursor-pointer select-none"
      style={{ width: 174, height: 118, perspective: 800, rotate: '-1.5deg' }}
      onClick={() => setFlipped(v => !v)}
      role="button" tabIndex={0}
      aria-label={flipped ? 'Flip recipe card back' : 'Flip recipe card to see memory'}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(v => !v); } }}
    >
      {/* Washi tape */}
      <div
        className="absolute -top-2.5 left-1/2 z-20 h-4 w-12"
        style={{ backgroundColor: 'rgba(201,168,76,0.40)', transform: 'translateX(-50%) rotate(1deg)', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}
        aria-hidden="true"
      />

      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.88, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-[#FFFEF5] border border-[#C9A84C]/18 shadow-sm p-3 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="font-sans text-[6.5px] tracking-[0.3em] uppercase text-[#8B6020]/26">Mom's recipe</p>
          <p className="font-letter text-[15px] text-charcoal/65 mt-0.5 leading-tight">Fish Curry</p>
          <div className="mt-2 space-y-px">
            {['kokum', 'coconut', 'green chilli', 'curry leaves', 'ginger'].map(item => (
              <p key={item} className="font-handwriting text-[8px] text-charcoal/36">· {item}</p>
            ))}
          </div>
          <p className="absolute bottom-2 right-3 font-handwriting text-[7px] text-charcoal/16 italic">flip →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-[#FFFEF5] border border-[#C9A84C]/18 shadow-sm flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="font-letter text-[12.5px] text-charcoal/58 leading-relaxed text-center">
            We both in kitchen<br />
            <span className="text-charcoal/44 italic">cuddling</span><br />
            <span className="text-charcoal/38 italic">giggling</span><br />
            <span className="text-charcoal/33 italic text-[11px]">and cooking.</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Sticky note ─────────────────────────────────────────────────────────────
function StickyNote({
  children, color = '#FFF8DC', rotate = 0, delay = 0, width = 110, className = '',
}: {
  children: React.ReactNode; color?: string; rotate?: number;
  delay?: number; width?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9 }}
      className={`relative ${className}`}
      style={{
        backgroundColor: color, width, rotate: `${rotate}deg`,
        padding: '10px 10px 14px 10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Grocery note (torn paper scrap) ─────────────────────────────────────────
function GroceryNote({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 128, rotate: '2.5deg' }}
    >
      <svg width="128" height="10" viewBox="0 0 128 10" className="w-full block" aria-hidden="true">
        <path d="M0,8 C11,2 22,9 34,5 C46,1 58,8 70,4 C82,1 94,7 106,3 C118,0 123,6 128,4 L128,10 L0,10 Z"
          fill="#FDF6ED" />
      </svg>
      <div className="bg-[#FDFAF3] border border-charcoal/10 shadow-sm px-3 pb-3 pt-1.5">
        <p className="font-handwriting text-[7.5px] text-charcoal/28 mb-1.5 tracking-wider uppercase">this week</p>
        {[
          { text: 'fish curry 🐟', crossed: false },
          { text: 'coconut sambar', crossed: false },
          { text: 'curd rice', crossed: true },
          { text: 'paratha', crossed: false },
          { text: 'noodles', crossed: false },
          { text: 'momos? 🥟', crossed: false },
          { text: 'kulfi 🍦', crossed: false },
        ].map(({ text, crossed }, i) => (
          <p key={i} className={`font-handwriting text-[9px] leading-relaxed ${crossed ? 'line-through text-charcoal/22' : 'text-charcoal/48'}`}>
            {text}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Math notebook with hidden margin detail ──────────────────────────────────
function MathNotebook({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      style={{ width: 224, rotate: '1deg' }}
      className="relative bg-white border border-charcoal/12 shadow-sm overflow-hidden"
    >
      {/* Spiral holes */}
      <div className="absolute top-0 bottom-0 left-0 w-6 bg-[#EDE8DF] border-r border-charcoal/8 flex flex-col justify-around items-center py-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#D9D2C8] border border-charcoal/10" />
        ))}
      </div>
      {/* Margin line */}
      <div className="absolute top-0 bottom-0 left-10 border-l border-[#E8B4B4]/32" />

      <div className="pl-12 pr-3 pt-2 pb-3">
        <div className="space-y-0">
          {[
            { text: 'Probability — revision', opacity: 50 },
            { text: 'P(A∩B) = P(A) · P(B)', opacity: 35 },
            { text: 'Bayes theorem...', opacity: 28 },
            { text: '', opacity: 0 },
            { text: 'also send Maths PDF ←', opacity: 25, italic: true },
            { text: '', opacity: 0 },
            { text: 'alarm for 7am exam', opacity: 22, italic: true },
            { text: '', opacity: 0 },
          ].map((line, i) => (
            <div key={i} className="h-6 border-b border-[#C0CCE0]/18 flex items-center">
              {line.text ? (
                <p className={`font-handwriting text-[9px] text-charcoal/${line.opacity} ${line.italic ? 'italic' : ''}`}>
                  {line.text}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Hidden margin detail — "drink water." barely visible, rotated in margin */}
      <p
        className="absolute font-handwriting text-[6px] text-charcoal/10 pointer-events-none select-none"
        style={{ left: 1, top: '36%', transform: 'rotate(-90deg)', transformOrigin: 'left center', whiteSpace: 'nowrap' }}
        aria-hidden="true"
      >
        drink water.
      </p>
    </motion.div>
  );
}

// ─── WhatsApp-style chat strips ───────────────────────────────────────────────
const chatLines = [
  { text: 'had breakfast? 🥺', fromMe: true },
  { text: 'haan haan 😅', fromMe: false },
  { text: 'drink water.', fromMe: true },
  { text: 'ok ok', fromMe: false },
  { text: 'ride safe 🙏', fromMe: true },
  { text: 'reached PG ✓', fromMe: false },
  { text: 'good girl 🥺', fromMe: true },
  { text: 'good boy 🥺', fromMe: false },
];

function ChatStrips({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 204, rotate: '-1deg' }}
    >
      <div className="bg-[#EBE5DC]/35 border border-charcoal/8 shadow-sm px-3 py-3">
        <p className="font-sans text-[6.5px] tracking-[0.28em] uppercase text-charcoal/18 text-center mb-2.5">every day</p>
        <div className="space-y-1.5">
          {chatLines.map((line, i) => (
            <motion.div
              key={i}
              className={`flex ${line.fromMe ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, x: line.fromMe ? 8 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.15 + i * 0.14, duration: 0.45 }}
            >
              <div
                className="px-2.5 py-1 max-w-[80%]"
                style={{
                  backgroundColor: line.fromMe ? '#DCF8C6' : '#FFFFFF',
                  borderRadius: line.fromMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}
              >
                <p className="font-letter text-[10.5px] text-charcoal/68 leading-tight">{line.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tobby photo (lift to reveal) ────────────────────────────────────────────
function TobbyPhoto({ delay }: { delay: number }) {
  const [lifted, setLifted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 96 }}
    >
      {/* Revealed text */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center pointer-events-none" aria-hidden={!lifted}>
        <AnimatePresence>
          {lifted && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="font-handwriting text-[9px] text-charcoal/52 text-center whitespace-nowrap"
            >
              He is more handsome 😂
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Photo frame — paper-lift physics */}
      <motion.div
        className="bg-white border border-charcoal/5 cursor-pointer"
        style={{ padding: '5px 5px 24px 5px', transformOrigin: 'top center', transformPerspective: 600 }}
        initial={{ rotateZ: 2, rotateX: 0, y: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
        animate={!shouldReduceMotion ? {
          rotateZ: lifted ? 3.5 : 2,
          rotateX: lifted ? 8 : 0,
          y: lifted ? -12 : 0,
          boxShadow: lifted
            ? '0 28px 44px rgba(0,0,0,0.17), 0 8px 16px rgba(0,0,0,0.08)'
            : '0 4px 12px rgba(0,0,0,0.10)',
        } : { rotateZ: 2 }}
        transition={lifted ? { duration: 0.88, ease: [0.25, 0.1, 0.25, 1] } : { type: 'spring', stiffness: 60, damping: 14 }}
        onClick={() => setLifted(v => !v)}
        role="button" tabIndex={0}
        aria-label={lifted ? 'Set Tobby photo down' : 'Lift Tobby photo'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLifted(v => !v); } }}
      >
        <div className="absolute -top-2 left-1/2 z-10 h-4 w-10"
          style={{ backgroundColor: 'rgba(232,184,109,0.40)', transform: 'translateX(-50%) rotate(-1.5deg)', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}
          aria-hidden="true"
        />
        <div className="overflow-hidden bg-[#F5F0E8]" style={{ width: 86, height: 86 }}>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-4xl select-none" aria-label="Dog">🐶</p>
            <p className="font-handwriting text-[7px] text-charcoal/32 mt-1 tracking-wide">Tobby</p>
          </div>
        </div>
        <p className="font-handwriting text-[8px] text-charcoal/32 text-center mt-1.5">our boy.</p>
      </motion.div>

      {!lifted && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: delay + 1.4, duration: 1 }}
          className="absolute -bottom-5 right-0 font-handwriting text-[7.5px] text-charcoal/16 italic pointer-events-none select-none"
        >
          lift ↑
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Chapter Five ─────────────────────────────────────────────────────────────
export default function ChapterFive({ onNext, onPrev }: ChapterProps) {
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
      initial="initial" animate="animate" exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      aria-label="Chapter Five: The Little Things That Became Everything"
    >
      <div className="absolute inset-0 pointer-events-none paper-texture" aria-hidden="true" />
      <SunlightDrift />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE — breakfast table ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-10 py-8 z-10 relative flex flex-col">

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#8B6020]/36 mb-1">Chapter Five · May 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#7C4A10] leading-tight">
              The Little Things<br />That Became Everything
            </h2>
            <motion.svg className="w-44 h-4 mt-1.5" viewBox="0 0 180 12" aria-hidden="true">
              <motion.path d="M0 7 Q45 3 90 7 Q135 11 180 6"
                fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.7 }} />
            </motion.svg>
          </motion.div>

          {/* Scattered table objects */}
          <div className="relative flex-1 mt-4" style={{ minHeight: 480 }}>

            {/* Coffee mug + ring stain + steam */}
            <div className="absolute top-0 left-4">
              <CoffeeMug />
            </div>

            {/* "Had breakfast?" sticky — top right */}
            <div className="absolute top-4 right-6">
              <StickyNote color="#FFF9C4" rotate={-3} delay={0.8} width={112}>
                <p className="font-handwriting text-[11px] text-charcoal/62 leading-snug">
                  had breakfast?<br />
                  <span className="text-[9px] text-charcoal/38">🥺</span>
                </p>
              </StickyNote>
            </div>

            {/* "Drink water." — small, floats near top */}
            <div className="absolute top-[88px] right-12">
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="font-handwriting text-[9px] text-charcoal/28 italic select-none pointer-events-none"
                style={{ rotate: '3deg' }}
              >
                drink water.
              </motion.p>
            </div>

            {/* Chocolate wrapper */}
            <div className="absolute left-6" style={{ top: 148 }}>
              <ChocolateWrapper delay={0.9} />
            </div>

            {/* Recipe card */}
            <div className="absolute right-0" style={{ top: 176 }}>
              <RecipeCard delay={1.1} />
            </div>

            {/* Grocery note */}
            <div className="absolute left-0" style={{ top: 336 }}>
              <GroceryNote delay={1.4} />
            </div>

          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-6 mt-auto">
            <button onClick={onPrev}
              className="font-handwriting text-xl text-[#8B6020]/50 hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2"
              aria-label="Previous chapter"
            >← back</button>
            <button onClick={onNext}
              className="font-handwriting text-xl text-[#E8924A] hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2 ml-auto"
              aria-label="Next chapter"
            >next chapter →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE — study desk ═══════════ */}
        <div className="flex-1 md:pl-10 py-8 z-10">
          <div className="relative" style={{ minHeight: 660 }}>

            {/* Math notebook */}
            <div className="absolute top-0 left-0">
              <MathNotebook delay={0.7} />
            </div>

            {/* Tobby photo — top right, lifts to reveal */}
            <div className="absolute top-6 right-8">
              <TobbyPhoto delay={1} />
            </div>

            {/* Maths PDF / help sticky */}
            <div className="absolute" style={{ top: 220, right: 4 }}>
              <StickyNote color="#EEF5FF" rotate={2} delay={1.1} width={122}>
                <p className="font-handwriting text-[10px] text-charcoal/55 leading-relaxed">
                  ✓ Maths PDF<br />
                  ✓ Inscribe help<br />
                  ✓ SDC notes<br />
                  <span className="text-[7.5px] text-charcoal/28 italic">she asked. I sent.</span>
                </p>
              </StickyNote>
            </div>

            {/* Chat strips */}
            <div className="absolute" style={{ top: 242, left: 0 }}>
              <ChatStrips delay={1.3} />
            </div>

            {/* Exam alarm sticky */}
            <div className="absolute" style={{ top: 392, right: 0 }}>
              <StickyNote color="#FFF0F0" rotate={-2} delay={1.6} width={110}>
                <p className="font-handwriting text-[10px] text-charcoal/52 leading-relaxed">
                  alarm set ✓<br />
                  <span className="text-[8.5px] text-charcoal/32">for her exam 🕖</span>
                </p>
              </StickyNote>
            </div>

            {/* Tiny floating inside-jokes — barely there */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{ top: 500, left: 16 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 1.8 }}
            >
              <p className="font-handwriting text-[8px] text-charcoal/20 italic" style={{ rotate: '1.5deg' }}>delulu 😂</p>
              <p className="font-handwriting text-[8px] text-charcoal/15 italic mt-1" style={{ rotate: '-1.5deg' }}>kundapur mental 😂</p>
            </motion.div>

            <motion.div
              className="absolute pointer-events-none select-none"
              style={{ top: 500, right: 16 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1.8 }}
            >
              <p className="font-handwriting text-[8px] text-charcoal/15 italic" style={{ rotate: '-2deg' }}>witch magic ✨</p>
              <p className="font-handwriting text-[8px] text-charcoal/12 italic mt-1" style={{ rotate: '1deg' }}>idk idk idk 😂</p>
            </motion.div>

            {/* Ending */}
            <motion.div
              className="absolute left-0 right-0 text-center"
              style={{ bottom: 6 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2.2 }}
            >
              <p className="font-quote text-sm text-charcoal/26 italic">Somehow, this became normal.</p>
              <p className="font-quote text-xs text-charcoal/17 italic mt-0.5">
                And that's why it became unforgettable.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
