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
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" aria-hidden={!peeled}>
        <p className="font-letter text-[12px] text-charcoal/52 italic text-center leading-snug">
          I think dark chocolate...<br />
          <span className="text-charcoal/35 text-[11px]">you?</span>
        </p>
      </div>

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

// ─── Grocery note — handwritten checklist on torn paper ───────────────────────
function GroceryNote({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 136, rotate: '2.5deg' }}
    >
      {/* torn top edge */}
      <svg width="136" height="12" viewBox="0 0 136 12" className="w-full block" aria-hidden="true">
        <path d="M0,9 C8,3 18,10 30,6 C42,2 54,9 66,5 C78,1 90,8 102,4 C114,0 126,7 136,5 L136,12 L0,12 Z"
          fill="#FDFAF3" />
      </svg>
      <div className="bg-[#FDFAF3] border-x border-b border-charcoal/10 shadow-sm px-3 pb-4 pt-2">
        <p className="font-handwriting text-[8px] text-charcoal/30 mb-2 tracking-wider">this week —</p>
        <div className="space-y-1">
          {[
            { text: 'fish curry 🐟', checked: true },
            { text: 'coconut sambar', checked: true },
            { text: 'paratha', checked: true },
            { text: 'curd rice', checked: false },
          ].map(({ text, checked }, i) => (
            <p key={i} className="font-handwriting text-[11px] text-charcoal/55 leading-relaxed flex items-center gap-1.5">
              <span className="text-charcoal/38 text-[13px]">{checked ? '☑' : '☐'}</span>
              <span style={{ textDecoration: checked ? 'line-through' : 'none', textDecorationColor: 'rgba(60,40,20,0.25)' }}>{text}</span>
            </p>
          ))}
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <p className="font-handwriting text-[11px] text-charcoal/50 flex items-center gap-1.5">
              <span className="text-[13px]">☐</span> momos 🥟
            </p>
            <p className="font-handwriting text-[8px] text-[#C9A84C]/70 italic">(after exams!!)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Math notebook — with "delulu" doodled in the margin ─────────────────────
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

      {/* "drink water." — faint, rotated vertically in the outer margin */}
      <p
        className="absolute font-handwriting text-[6px] text-charcoal/10 pointer-events-none select-none"
        style={{ left: 1, top: '36%', transform: 'rotate(-90deg)', transformOrigin: 'left center', whiteSpace: 'nowrap' }}
        aria-hidden="true"
      >
        drink water.
      </p>

      {/* "delulu 😂" — doodled in margin corner, like an idle scribble */}
      <motion.p
        className="absolute font-handwriting text-[8.5px] text-charcoal/22 pointer-events-none select-none"
        style={{ left: 28, bottom: 10, rotate: '-8deg', transformOrigin: 'left bottom' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 2.2, duration: 1.4 }}
        aria-hidden="true"
      >
        delulu 😂
      </motion.p>
    </motion.div>
  );
}

// ─── Printed message slip — looks like a paper strip cut from a printer ───────
function PrintedSlip({
  text, rotate = 0, delay = 0,
}: {
  text: string; rotate?: number; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9 }}
      style={{
        rotate: `${rotate}deg`,
        backgroundColor: '#FEFEFE',
        border: '1px solid rgba(60,40,20,0.09)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        padding: '5px 10px 6px 10px',
        display: 'inline-block',
        // subtle printer-paper dot texture via outline
      }}
    >
      <p className="font-letter text-[11px] text-charcoal/60 leading-tight whitespace-nowrap">{text}</p>
    </motion.div>
  );
}

// ─── Tiny torn sticky note for good boy / good girl ───────────────────────────
function TinyTornNote({
  text, color = '#FFFDE7', rotate = 0, delay = 0,
}: {
  text: string; color?: string; rotate?: number; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.4 }}
      className="relative"
      style={{ rotate: `${rotate}deg`, display: 'inline-block' }}
    >
      {/* torn top */}
      <svg width="70" height="7" viewBox="0 0 70 7" style={{ display: 'block' }} aria-hidden="true">
        <path
          d="M0,5 C5,1 12,6 20,3 C28,0 35,5 43,3 C51,1 58,5 70,4 L70,7 L0,7 Z"
          fill={color}
        />
      </svg>
      <div
        style={{
          backgroundColor: color,
          padding: '2px 8px 6px 8px',
          boxShadow: '0 1px 5px rgba(0,0,0,0.08)',
        }}
      >
        <p className="font-handwriting text-[10px] text-charcoal/55 leading-tight">{text}</p>
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

            {/* Coffee mug */}
            <div className="absolute top-0 left-4">
              <CoffeeMug />
            </div>

            {/* "Had breakfast?" — printed slip, left side */}
            <div className="absolute top-6 right-10">
              <PrintedSlip text="had breakfast? 🥺" rotate={-2.5} delay={0.8} />
            </div>

            {/* "drink water." — printed slip, slightly lower */}
            <div className="absolute top-[78px] right-4">
              <PrintedSlip text="drink water." rotate={1.5} delay={1.0} />
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

            {/* "good girl 🥺" — tiny torn sticky, tucked near grocery list */}
            <div className="absolute" style={{ top: 338, right: 8 }}>
              <TinyTornNote text="good girl 🥺" color="#FFF9C4" rotate={3.5} delay={2.6} />
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

        {/* ═══════════ RIGHT PAGE — study desk + temple + messages ═══════════ */}
        <div className="flex-1 md:pl-10 py-8 z-10">
          <div className="relative" style={{ minHeight: 660 }}>

            {/* Math notebook — now has "delulu" doodled in margin */}
            <div className="absolute top-0 left-0">
              <MathNotebook delay={0.7} />
            </div>

            {/* Tobby photo */}
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

            {/* ── Printed message slips — scattered, not grouped ── */}
            <div className="absolute" style={{ top: 242, left: 0 }}>
              <PrintedSlip text="ok ok" rotate={-3} delay={1.3} />
            </div>
            <div className="absolute" style={{ top: 282, left: 24 }}>
              <PrintedSlip text="haan haan 😅" rotate={2} delay={1.5} />
            </div>
            <div className="absolute" style={{ top: 316, left: 4 }}>
              <PrintedSlip text="ride safe 🙏" rotate={-1.5} delay={1.7} />
            </div>
            <div className="absolute" style={{ top: 356, left: 18 }}>
              <PrintedSlip text="reached PG ✓" rotate={2.5} delay={1.9} />
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

            {/* "good boy 🥺" — tiny torn sticky, discovered quietly */}
            <div className="absolute" style={{ top: 470, right: 14 }}>
              <TinyTornNote text="good boy 🥺" color="#FFF9C4" rotate={-4} delay={3.0} />
            </div>

            {/* Other inside-jokes, barely there */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{ top: 510, left: 6 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 1.8 }}
            >
              <p className="font-handwriting text-[7.5px] text-charcoal/14 italic" style={{ rotate: '-1.5deg' }}>kundapur mental 😂</p>
              <p className="font-handwriting text-[7px] text-charcoal/10 italic mt-1" style={{ rotate: '1deg' }}>witch magic ✨</p>
            </motion.div>

            {/* Ending — quieter, more poetic */}
            <motion.div
              className="absolute left-0 right-0 text-center"
              style={{ bottom: 6 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2.4 }}
            >
              <p className="font-quote text-sm text-charcoal/28 italic leading-relaxed">
                One day...<br />
                <span className="text-charcoal/22">we stopped noticing</span><br />
                <span className="text-charcoal/18 text-xs">these little things.</span>
              </p>
            </motion.div>

          </div>

          {/* ── Temple moment — Halasuru ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1.4 }}
            className="mt-8 pt-6 border-t border-charcoal/8"
          >
            <p className="font-sans text-[7.5px] tracking-[0.3em] uppercase text-[#C9A84C]/55 mb-3 text-center">
              April 12–13, 2026 · Halasuru Temple, Bangalore
            </p>
            <p className="font-display text-xl text-charcoal/60 text-center italic mb-4 leading-snug">
              "Some days didn't need words."
            </p>
            <div className="space-y-2 text-center">
              <p className="font-letter text-[11.5px] text-charcoal/42 leading-loose">
                vibhuti on foreheads<br />
                temple bells, quiet prayers<br />
                <em>you, beside me</em>
              </p>
              <div className="w-8 h-px bg-[#C9A84C]/25 mx-auto my-3" />
              <p className="font-letter text-[11.5px] text-charcoal/38 leading-loose">
                green saree, morning sun<br />
                the lawn never looked so good<br />
                <em>I forgot to breathe</em>
              </p>
            </div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 1.6 }}
              className="font-handwriting text-xs text-[#C9A84C]/55 text-center mt-3 italic"
            >
              "You were looking like a wowwww 🫶 — still true."
            </motion.p>
          </motion.div>

          {/* ── Beautiful Messages ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1.4 }}
            className="mt-8 pt-6 border-t border-charcoal/8 space-y-4"
          >
            <p className="font-sans text-[7.5px] tracking-[0.3em] uppercase text-[#8B6020]/30 mb-1">
              words that stayed
            </p>
            {[
              {
                text: '"Every night before I sleep, I think about you….. and suddenly the whole day feels your presence… love you so deeply that sometimes I don\'t even have the right words for it. It\'s not just love… it\'s comfort, peace and that feeling of home with you… I crave every single minute."',
                attr: '— Naresh · 2 March 2026 · 11:17 PM',
                accent: '#B85C38',
              },
              {
                text: '"Your birthday may be ending tonight but honestly? Every single day with you feels like a celebration. I want to make every ordinary day feel special for you."',
                attr: '— Naresh · 11 March 2026 · 11:43 PM · her birthday',
                accent: '#6B8F6B',
              },
              {
                text: '"I love you sooooo much my chinnu muddu everything 😘🫣🥰💋" — Meghana. "Love you sweetheart" — Naresh. Every single night. Without fail.',
                attr: '— Both · Every night · February → June 2026',
                accent: '#C9A84C',
              },
            ].map(({ text, attr, accent }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 + i * 0.3, duration: 1 }}
                className="bg-white/65 shadow-sm relative pl-4 pr-3 py-3"
                style={{ borderLeft: `3px solid ${accent}40` }}
              >
                <span
                  className="absolute top-0 left-2 font-display text-4xl leading-none pointer-events-none select-none"
                  style={{ color: `${accent}12` }}
                  aria-hidden="true"
                >"</span>
                <p className="font-quote text-[11px] text-charcoal/62 italic leading-relaxed relative z-10">
                  {text}
                </p>
                <p className="font-sans text-[7px] tracking-[0.2em] uppercase mt-2" style={{ color: `${accent}80` }}>
                  {attr}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
