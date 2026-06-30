import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import photoTempleTogether from '@assets/IMG_2441_1782795136760.jpg';
import photoMeghanaTemple  from '@assets/IMG_2438_1782795136761.jpg';
import photoGreenSareeLawn from '@assets/IMG_1739_Original_1782795136761.jpg';
import photoTempleOutdoor  from '@assets/IMG_1497_1782795167756.JPG';
import tobbyPhoto          from '@assets/00009077-STICKER-2026-04-20-10-59-12_1782736777144.webp';

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

// ─── Coffee mug — ring stain, tiny spill, smaller steam ──────────────────────
function CoffeeMug() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="relative" style={{ width: 100, height: 110 }}>
      {/* Coffee ring stain — left on the page, not floating */}
      <svg
        width="80" height="22"
        viewBox="0 0 80 22"
        className="absolute"
        style={{ bottom: -4, left: '50%', transform: 'translateX(-52%) rotate(-4deg)' }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <ellipse cx="40" cy="11" rx="37" ry="9"
          fill="none" stroke="rgba(101,67,33,0.14)" strokeWidth="2.5" />
        {/* Inner ring — slight offset for realism */}
        <ellipse cx="40" cy="11" rx="29" ry="6.5"
          fill="none" stroke="rgba(101,67,33,0.07)" strokeWidth="1.2" />
        {/* Tiny spill — drip to the right */}
        <path d="M 72 12 C 76 14, 78 17, 76 20 C 74 22, 72 21, 73 18"
          fill="rgba(101,67,33,0.09)" />
        {/* Smear */}
        <path d="M 42 19 C 50 20, 58 19.5, 63 18"
          fill="none" stroke="rgba(101,67,33,0.06)" strokeWidth="1.5" />
      </svg>

      {/* One small steam wisp — much reduced from before */}
      {!shouldReduceMotion && (
        <div className="absolute left-1/2" style={{ top: 2, width: 14, transform: 'translateX(-50%)' }}>
          <div
            className="absolute animate-steam"
            style={{
              left: '30%', bottom: 4,
              width: 2, height: 9,
              borderRadius: 4,
              background: 'rgba(180,150,120,0.22)',
              animationDelay: '0s',
            }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Mug body */}
      <svg
        width="52" height="52"
        viewBox="0 0 52 52"
        className="absolute left-1/2"
        style={{ bottom: 10, transform: 'translateX(-50%)' }}
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

// ─── Chocolate wrapper — torn, crumpled, silver foil peek ─────────────────────
function ChocolateWrapper({ delay }: { delay: number }) {
  const [peeled, setPeeled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative"
      style={{ width: 162, height: 58 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
    >
      {/* Content revealed beneath wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" aria-hidden={!peeled}>
        <p className="font-letter text-[12px] text-charcoal/52 italic text-center leading-snug">
          I think dark chocolate...<br />
          <span className="text-charcoal/35 text-[11px]">you?</span>
        </p>
      </div>

      {/* Wrapper — now looks torn and crumpled */}
      <motion.div
        className="absolute inset-0 z-10 cursor-pointer"
        style={{ transformOrigin: 'top center', transformPerspective: 600 }}
        animate={!shouldReduceMotion ? { rotateX: peeled ? -155 : 0 } : {}}
        transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => setPeeled(v => !v)}
        role="button" tabIndex={0}
        aria-label={peeled ? 'Close chocolate wrapper' : 'Peel open chocolate wrapper'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPeeled(v => !v); } }}
      >
        {/* Silver foil strip at top */}
        <div
          className="absolute top-0 left-0 right-0 z-20"
          style={{
            height: 7,
            background: 'linear-gradient(90deg, rgba(192,192,200,0.55) 0%, rgba(230,230,238,0.72) 35%, rgba(192,192,200,0.50) 70%, rgba(210,210,220,0.62) 100%)',
            borderRadius: '1px 1px 0 0',
          }}
          aria-hidden="true"
        />
        {/* Wrapper body */}
        <div
          className="w-full h-full overflow-hidden relative"
          style={{
            background: 'linear-gradient(148deg, #2c1810 0%, #3d2410 45%, #2c1810 78%, #3a2010 100%)',
            border: '1px solid rgba(15,8,3,0.38)',
          }}
        >
          {/* Crinkle lines — not perfectly spaced */}
          <div className="absolute top-0 bottom-0" style={{ left: '18%', width: 1, background: 'rgba(255,255,255,0.035)', transform: 'rotate(0.8deg)' }} aria-hidden="true" />
          <div className="absolute top-0 bottom-0" style={{ left: '41%', width: 1, background: 'rgba(255,255,255,0.028)', transform: 'rotate(-0.5deg)' }} aria-hidden="true" />
          <div className="absolute top-0 bottom-0" style={{ left: '67%', width: 1, background: 'rgba(255,255,255,0.022)', transform: 'rotate(1deg)' }} aria-hidden="true" />
          {/* Folded corner — bottom right */}
          <svg className="absolute bottom-0 right-0" width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
            <path d="M 0 16 L 18 0 L 18 16 Z" fill="rgba(0,0,0,0.28)" />
            <path d="M 0 16 L 18 0" stroke="rgba(192,192,200,0.20)" strokeWidth="0.8" />
          </svg>
          {/* Shiny highlight along left edge */}
          <div className="absolute top-0 bottom-0 left-0 w-2.5" style={{ background: 'linear-gradient(90deg, rgba(192,185,168,0.14) 0%, transparent 100%)' }} aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center pt-1">
            <p className="font-sans text-[7px] tracking-[0.25em] uppercase text-[#C0A882]/40 select-none">dark chocolate</p>
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

// ─── Handwritten recipe paper — torn, with checkmarks ─────────────────────────
function HandwrittenRecipe({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative"
      style={{ width: 154, rotate: '-1.5deg' }}
    >
      {/* Torn top edge */}
      <svg width="154" height="11" viewBox="0 0 154 11" className="w-full block" aria-hidden="true">
        <path d="M0,9 C9,2 22,10 36,6 C50,2 62,9 78,5 C94,1 108,8 122,4 C136,0 146,6 154,5 L154,11 L0,11 Z"
          fill="#FFFEF6" />
      </svg>
      {/* Paper body */}
      <div
        className="border-x border-b border-charcoal/10 shadow-sm px-4 pb-4 pt-2"
        style={{ backgroundColor: '#FFFEF6' }}
      >
        {/* Ruled lines */}
        <div className="absolute left-4 right-4" style={{ top: 11, height: '100%', backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 19px, rgba(180,160,140,0.12) 19px, rgba(180,160,140,0.12) 20px)', backgroundPosition: '0 24px' }} aria-hidden="true" />
        <p className="font-sans text-[6px] tracking-[0.32em] uppercase text-charcoal/20 mb-2 relative">Mom's recipe</p>
        <p className="font-handwriting text-[15px] text-charcoal/70 leading-tight mb-2.5 relative">Fish Curry</p>
        <div className="space-y-1 relative">
          {[
            { item: 'coconut', checked: true },
            { item: 'chilli', checked: true },
            { item: 'curry leaves', checked: true },
            { item: 'kokum', checked: false },
          ].map(({ item, checked }) => (
            <p key={item} className="font-handwriting text-[11px] text-charcoal/55 flex items-center gap-1.5 leading-tight">
              <span
                className="font-handwriting text-[13px] leading-none"
                style={{ color: checked ? 'rgba(60,120,60,0.65)' : 'rgba(80,60,40,0.30)' }}
              >
                {checked ? '✓' : '○'}
              </span>
              <span style={{ textDecoration: checked ? 'none' : 'none' }}>{item}</span>
            </p>
          ))}
        </div>
        {/* Divider */}
        <div className="border-t border-dashed border-charcoal/12 mt-3 pt-2.5 relative">
          <p className="font-handwriting text-[11px] text-[#8B6020]/65 italic leading-snug">
            We'll cook together.
          </p>
        </div>
      </div>
      {/* Washi tape strip holding it down */}
      <div
        className="absolute -top-2.5 left-1/2 z-20 h-3.5 w-14"
        style={{ backgroundColor: 'rgba(201,168,76,0.38)', transform: 'translateX(-50%) rotate(1deg)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        aria-hidden="true"
      />
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

// ─── Math notebook — messy, crossed, circled, underlined ─────────────────────
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

      <div className="pl-12 pr-3 pt-2 pb-3 relative">
        {/* SVG annotations overlaid */}
        <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ left: 48 }} aria-hidden="true">
          {/* Underline on first line */}
          <line x1="0" y1="18" x2="130" y2="18" stroke="rgba(60,40,20,0.22)" strokeWidth="1.2" />
          {/* Circle around Bayes theorem */}
          <ellipse cx="60" cy="68" rx="58" ry="9" fill="none" stroke="rgba(60,40,20,0.15)" strokeWidth="1" strokeDasharray="2 1.5" />
          {/* Squiggly underline on alarm line */}
          <path d="M 0 176 C 8 172, 16 180, 24 176 C 32 172, 40 180, 48 176" fill="none" stroke="rgba(60,40,20,0.12)" strokeWidth="1" />
        </svg>

        <div className="space-y-0">
          {[
            { text: 'Probability — revision', opacity: 50, underline: false },
            { text: 'P(A∩B) = P(A) · P(B)', opacity: 35 },
            { text: 'Bayes theorem...', opacity: 28 },
            { text: '', opacity: 0 },
            { text: 'ask Meghana', opacity: 30, italic: true, strikethrough: true },
            { text: 'also send Maths PDF ←', opacity: 25, italic: true },
            { text: '', opacity: 0 },
            { text: 'alarm for 7am exam', opacity: 22, italic: true },
            { text: '', opacity: 0 },
          ].map((line, i) => (
            <div key={i} className="h-6 border-b border-[#C0CCE0]/18 flex items-center">
              {line.text ? (
                <p className={`font-handwriting text-[9px] text-charcoal/${line.opacity} ${line.italic ? 'italic' : ''}`}
                  style={{ textDecoration: line.strikethrough ? 'line-through' : 'none', textDecorationColor: 'rgba(60,40,20,0.35)' }}>
                  {line.text}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        {/* Small annotation bubble — "??" */}
        <p
          className="absolute font-handwriting text-[9px] text-charcoal/22 pointer-events-none select-none"
          style={{ right: 6, top: 46 }}
          aria-hidden="true"
        >
          ??
        </p>
      </div>

      {/* "drink water." — faint, rotated vertically */}
      <p
        className="absolute font-handwriting text-[6px] text-charcoal/10 pointer-events-none select-none"
        style={{ left: 1, top: '36%', transform: 'rotate(-90deg)', transformOrigin: 'left center', whiteSpace: 'nowrap' }}
        aria-hidden="true"
      >
        drink water.
      </p>

      {/* "delulu 😂" — doodled in margin corner */}
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

// ─── Printed message slip ─────────────────────────────────────────────────────
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
      }}
    >
      <p className="font-letter text-[11px] text-charcoal/60 leading-tight whitespace-nowrap">{text}</p>
    </motion.div>
  );
}

// ─── Tiny torn sticky note ─────────────────────────────────────────────────────
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
        <path d="M0,5 C5,1 12,6 20,3 C28,0 35,5 43,3 C51,1 58,5 70,4 L70,7 L0,7 Z" fill={color} />
      </svg>
      <div style={{ backgroundColor: color, padding: '2px 8px 6px 8px', boxShadow: '0 1px 5px rgba(0,0,0,0.08)' }}>
        <p className="font-handwriting text-[10px] text-charcoal/55 leading-tight">{text}</p>
      </div>
    </motion.div>
  );
}

// ─── Tobby photo — real photo, lift to reveal ────────────────────────────────
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
        {/* Real Tobby photo */}
        <img
          src={tobbyPhoto}
          alt="Tobby"
          style={{
            width: 86, height: 86,
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            filter: 'sepia(0.08) contrast(1.04)',
          }}
        />
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

            {/* Coffee mug — with ring stain grounded beneath it */}
            <div className="absolute top-0 left-4">
              <CoffeeMug />
            </div>

            {/* "Had breakfast?" — printed slip */}
            <div className="absolute top-6 right-10">
              <PrintedSlip text="had breakfast? 🥺" rotate={-2.5} delay={0.8} />
            </div>

            {/* "drink water." — printed slip */}
            <div className="absolute top-[78px] right-4">
              <PrintedSlip text="drink water." rotate={1.5} delay={1.0} />
            </div>

            {/* Chocolate wrapper — now torn/crumpled */}
            <div className="absolute left-6" style={{ top: 148 }}>
              <ChocolateWrapper delay={0.9} />
            </div>

            {/* Handwritten recipe paper — replaces old flip card */}
            <div className="absolute right-0" style={{ top: 176 }}>
              <HandwrittenRecipe delay={1.1} />
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

            {/* Math notebook — messier: crossed, underlined, "ask Meghana" struck */}
            <div className="absolute top-0 left-0">
              <MathNotebook delay={0.7} />
            </div>

            {/* Tobby — real photo, not emoji */}
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

            {/* ── Message slips — scattered with overlaps, one tucked under notebook ── */}
            {/* One peeking from UNDER the notebook (lower z, overlaps top-left of notebook) */}
            <div className="absolute z-0" style={{ top: 188, left: -8 }}>
              <PrintedSlip text="ok ok" rotate={-5} delay={1.3} />
            </div>
            {/* The rest scattered irregularly */}
            <div className="absolute" style={{ top: 254, left: 22 }}>
              <PrintedSlip text="haan haan 😅" rotate={3.5} delay={1.5} />
            </div>
            <div className="absolute" style={{ top: 298, left: -4 }}>
              <PrintedSlip text="ride safe 🙏" rotate={-2} delay={1.7} />
            </div>
            <div className="absolute" style={{ top: 322, left: 38 }}>
              <PrintedSlip text="reached PG ✓" rotate={4} delay={1.9} />
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

            {/* "good boy 🥺" — tiny torn sticky */}
            <div className="absolute" style={{ top: 470, right: 14 }}>
              <TinyTornNote text="good boy 🥺" color="#FFF9C4" rotate={-4} delay={3.0} />
            </div>

            {/* Inside-jokes, barely there */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{ top: 510, left: 6 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 1.8 }}
            >
              <p className="font-handwriting text-[7.5px] text-charcoal/14 italic" style={{ rotate: '-1.5deg' }}>kundapur mental 😂</p>
              <p className="font-handwriting text-[7px] text-charcoal/10 italic mt-1" style={{ rotate: '1deg' }}>witch magic ✨</p>
            </motion.div>

            {/* Ending */}
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

            {/* Temple photo polaroids */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 1.4 }}
              className="grid grid-cols-2 gap-3 mt-4"
            >
              {[
                { src: photoGreenSareeLawn,  caption: 'the lawn.', rotate: -2,   objectPos: 'center top' },
                { src: photoTempleTogether,  caption: 'April 12–13.', rotate: 1.5, objectPos: 'center top' },
                { src: photoMeghanaTemple,   caption: 'her smile.', rotate: 2,   objectPos: 'center' },
                { src: photoTempleOutdoor,   caption: 'together.', rotate: -1.5, objectPos: 'center top' },
              ].map(({ src, caption, rotate, objectPos }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 + i * 0.18, duration: 0.9 }}
                  className="relative"
                  style={{ rotate: `${rotate}deg` }}
                >
                  <div
                    className="absolute -top-2 left-1/2 z-10 w-8 h-3"
                    style={{ backgroundColor: 'rgba(201,151,58,0.42)', transform: 'translateX(-50%)' }}
                    aria-hidden="true"
                  />
                  <div className="bg-white shadow-sm border border-charcoal/5" style={{ padding: '5px 5px 18px 5px' }}>
                    <img
                      src={src}
                      alt={caption}
                      style={{
                        width: '100%', height: 90,
                        objectFit: 'cover',
                        objectPosition: objectPos,
                        filter: 'sepia(0.07) contrast(1.02)',
                        display: 'block',
                      }}
                    />
                    <p className="font-handwriting text-[8px] text-charcoal/38 text-center mt-1 leading-none">
                      {caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

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
