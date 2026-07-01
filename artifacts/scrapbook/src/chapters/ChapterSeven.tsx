import React from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { ChapterProps } from '../App';
import usPhoto          from '@assets/00003349-PHOTO-2026-03-11-20-20-02_1782729987549.jpg';
import photoTemple      from '@assets/IMG_2441_1782795136760.jpg';
import photoGreenSaree  from '@assets/IMG_1739_Original_1782795136761.jpg';
import tobbyPhoto       from '@assets/00009077-STICKER-2026-04-20-10-59-12_1782736777144.webp';

// ─── Tiny objects — each one a memory ─────────────────────────────────────────

function BreakfastSticky() {
  return (
    <div
      style={{
        backgroundColor: '#FFF9C4',
        width: 115,
        padding: '10px 13px 18px 13px',
        rotate: '-2deg',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      }}
    >
      <p className="font-handwriting text-[14px] text-charcoal/55 italic leading-snug">
        Had breakfast?
      </p>
    </div>
  );
}

function ChocolateWrapper() {
  return (
    <div style={{ width: 100, rotate: '3.5deg' }}>
      {/* Silver foil peek at top */}
      <div
        style={{
          height: 5,
          background: 'linear-gradient(90deg, rgba(192,192,200,0.55) 0%, rgba(230,230,238,0.70) 40%, rgba(192,192,200,0.50) 100%)',
          borderRadius: '1px 1px 0 0',
        }}
        aria-hidden="true"
      />
      <div
        className="border border-charcoal/12 overflow-hidden shadow-sm relative"
        style={{ backgroundColor: '#3B1F0E', borderRadius: '0 0 1px 1px' }}
      >
        <div className="px-2 py-1.5">
          <p className="font-sans text-[5.5px] tracking-[0.22em] uppercase text-white/30 text-center">Dairy Milk</p>
          <div className="mt-1 grid grid-cols-3 gap-px" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="rounded-sm" style={{ height: 8, backgroundColor: 'rgba(90,45,15,0.8)' }} />
            ))}
          </div>
        </div>
        {/* Folded corner */}
        <svg className="absolute bottom-0 right-0" width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
          <path d="M 0 10 L 12 0 L 12 10 Z" fill="rgba(0,0,0,0.25)" />
        </svg>
        <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #C9A84C44, #FFF3CD55, #C9A84C44)' }} />
      </div>
    </div>
  );
}

function TinyRose() {
  return (
    <svg width="58" height="74" viewBox="0 0 44 56" aria-label="Pressed rose" role="img" style={{ rotate: '5deg' }}>
      <path d="M 22 54 C 20 46, 18 38, 20 28" stroke="#6B7C3A" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="16" cy="38" rx="5" ry="2.5" transform="rotate(-40 16 38)" fill="#7B8C42" opacity="0.38" />
      <ellipse cx="22" cy="20" rx="10" ry="7" fill="#C98A95" opacity="0.28" />
      <ellipse cx="22" cy="18" rx="8"  ry="6"  fill="#D4A0A8" opacity="0.32" />
      <ellipse cx="22" cy="16" rx="6"  ry="4.5" fill="#DDB0B8" opacity="0.38" />
      <ellipse cx="22" cy="15" rx="4"  ry="3.5" fill="#E8C0C6" opacity="0.45" />
      <circle cx="22" cy="14" r="2.5" fill="#C9A84C" opacity="0.50" />
    </svg>
  );
}

function TobbyPolaroid() {
  return (
    <div
      className="bg-white border border-charcoal/10 shadow-sm"
      style={{ padding: '4px 4px 18px 4px', width: 90, rotate: '2.5deg' }}
    >
      <img
        src={tobbyPhoto}
        alt="Tobby"
        style={{
          width: 78, height: 72,
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          filter: 'sepia(0.10) contrast(1.03)',
        }}
      />
      <p className="font-handwriting text-[14px] text-charcoal/30 text-center mt-1.5">Tobby</p>
    </div>
  );
}

function TempleReceipt() {
  return (
    <div style={{ width: 106, rotate: '-3deg' }}>
      <svg width="78" height="8" viewBox="0 0 78 8" className="w-full block" aria-hidden="true">
        <path d="M0,6 C8,1 16,6 24,3 C32,0 40,5 48,2 C56,0 64,5 78,4 L78,8 L0,8 Z" fill="#FDFAF4" />
      </svg>
      <div className="bg-[#FDFAF4] border-x border-b border-charcoal/8 px-3 pb-3 pt-1.5">
        <p className="font-sans text-[5.5px] tracking-[0.3em] uppercase text-charcoal/20 mb-1.5 text-center">Tirupati</p>
        <div className="space-y-0.5">
          <p className="font-handwriting text-[14px] text-charcoal/32">Laddu prasad × 2</p>
          <p className="font-handwriting text-[14px] text-charcoal/32">Darshan ticket</p>
          <p className="font-handwriting text-[14px] text-charcoal/32">Safe ride ❤️</p>
        </div>
        <div className="border-t border-dashed border-charcoal/10 mt-2 pt-1.5">
          <p className="font-handwriting text-[14px] text-charcoal/22 italic text-right">2025</p>
        </div>
      </div>
      <svg width="78" height="8" viewBox="0 0 78 8" className="w-full block" aria-hidden="true">
        <path d="M0,0 C10,5 20,1 30,4 C40,7 50,2 60,5 C68,7 72,3 78,2 L78,0 Z" fill="#FDFAF4" />
      </svg>
    </div>
  );
}

function LittleNote() {
  return (
    <div
      style={{
        backgroundColor: '#FFF0F0',
        width: 108,
        padding: '9px 12px 16px 12px',
        rotate: '1.5deg',
        boxShadow: '0 2px 7px rgba(0,0,0,0.06)',
      }}
    >
      <p className="font-handwriting text-[16px] text-charcoal/50 italic leading-snug">
        ride safe 🙏<br />
        <span className="text-[15px] text-charcoal/32">— always</span>
      </p>
    </div>
  );
}

// ─── Real photo — polaroid ────────────────────────────────────────────────────
function RealPhoto() {
  return (
    <div
      className="bg-white shadow-md"
      style={{
        padding: '5px 5px 28px 5px',
        width: 218,
        rotate: '-2.5deg',
        boxShadow: '0 6px 22px rgba(0,0,0,0.13)',
      }}
      aria-label="A candid photo of the two of us"
    >
      <img
        src={usPhoto}
        alt="Naresh and Meghana — a natural moment together"
        style={{ width: '100%', height: 178, objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
      />
      <p className="font-handwriting text-[14px] text-charcoal/28 text-center mt-1.5">us.</p>
    </div>
  );
}

// ─── Right page photos ────────────────────────────────────────────────────────
function RightPhoto({ src, caption, rotate, objectPos }: {
  src: string; caption: string; rotate: number; objectPos: string;
}) {
  return (
    <div
      className="bg-white shadow-sm"
      style={{ padding: '4px 4px 18px 4px', width: 148, rotate: `${rotate}deg`, boxShadow: '0 3px 10px rgba(0,0,0,0.09)' }}
    >
      <img
        src={src}
        alt={caption}
        style={{ width: '100%', height: 116, objectFit: 'cover', objectPosition: objectPos, display: 'block', filter: 'sepia(0.06) contrast(1.02)' }}
      />
      <p className="font-handwriting text-[14px] text-charcoal/30 text-center mt-1.5">{caption}</p>
    </div>
  );
}

// ─── Reflections — the poem ────────────────────────────────────────────────────
type ReflectionLine = {
  text: string;
  font: 'display' | 'letter' | 'handwriting';
  delay: number;
  dim?: boolean;
  pause?: boolean;
};

const REFLECTIONS: ReflectionLine[] = [
  { text: 'We thought', font: 'letter', delay: 3.8 },
  { text: 'the important memories', font: 'letter', delay: 4.3 },
  { text: 'would be', font: 'letter', delay: 4.7 },
  { text: 'birthdays... trips...', font: 'letter', delay: 5.2, dim: true },
  { text: 'big surprises.', font: 'letter', delay: 5.6, dim: true },
  { pause: true, text: '', font: 'letter', delay: 6.0 },
  { text: 'Instead...', font: 'handwriting', delay: 6.8 },
  { pause: true, text: '', font: 'letter', delay: 7.0 },
  { text: 'drink water.', font: 'handwriting', delay: 7.6 },
  { text: 'ride safe.', font: 'handwriting', delay: 8.1 },
  { text: 'had breakfast.', font: 'handwriting', delay: 8.6 },
  { text: 'good night.', font: 'handwriting', delay: 9.1 },
  { pause: true, text: '', font: 'letter', delay: 9.6 },
  { text: 'Love', font: 'display', delay: 10.4 },
  { text: 'was never', font: 'letter', delay: 10.9 },
  { text: 'one big moment.', font: 'letter', delay: 11.3, dim: true },
  { pause: true, text: '', font: 'letter', delay: 11.7 },
  { text: 'It was', font: 'letter', delay: 12.3 },
  { text: 'thousands of tiny ones.', font: 'display', delay: 12.9 },
];

// ─── Chapter Seven ────────────────────────────────────────────────────────────
export default function ChapterSeven({ onNext, onPrev }: ChapterProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = (delay: number, duration = 2.2): { initial: { opacity: number }; animate: { opacity: number }; transition: Transition } =>
    shouldReduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration, ease: [0.25, 0.1, 0.25, 1] } };

  const paperDrop = (delay: number) =>
    shouldReduceMotion
      ? { initial: { opacity: 0, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } as Transition }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: {
            opacity: { delay, duration: 0.5 },
            y: { type: 'spring', stiffness: 40, damping: 10, delay },
          } as Transition,
        };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#F5F0E8' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8, ease: 'easeInOut' }}
      aria-label="Chapter Seven: The Little Things We Never Want To Forget"
    >
      {/* Very soft morning warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 60% 10%, rgba(232,184,109,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-14 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE — objects scattered like an emptied backpack ═════ */}
        <div
          className="flex-1 md:border-r md:border-charcoal/8 md:pr-14 py-10"
          style={{ minHeight: '100%', position: 'relative' }}
        >
          {/* Chapter label */}
          <motion.p
            {...fadeIn(0.3, 1.6)}
            className="font-sans text-[15px] tracking-[0.42em] uppercase text-coffee/28 mb-5"
          >
            Chapter Seven
          </motion.p>

          {/* Large handwritten title */}
          <motion.h2
            {...fadeIn(0.7, 2.4)}
            className="font-handwriting text-[2.4rem] md:text-[2.8rem] text-charcoal/72 leading-snug"
            style={{ maxWidth: 340 }}
          >
            The Little Things<br />
            We Never Want<br />
            To Forget
          </motion.h2>

          {/* Objects — scattered absolutely across the page */}
          <div className="relative mt-10" style={{ minHeight: 750 }}>

            {/* Pressed rose — top left, arrives early */}
            <motion.div
              {...paperDrop(1.4)}
              className="absolute"
              style={{ top: 0, left: 8 }}
              aria-label="Pressed rose"
            >
              <TinyRose />
            </motion.div>

            {/* Real photo — top area, slightly overlapping rose */}
            <motion.div
              {...paperDrop(2.2)}
              className="absolute"
              style={{ top: 10, left: 48 }}
              aria-label="A photo of the two of us"
            >
              <RealPhoto />
            </motion.div>

            {/* Temple receipt / old ticket */}
            <motion.div
              {...paperDrop(3.6)}
              className="absolute"
              style={{ top: 8, right: 6 }}
              aria-label="Temple receipt from Tirupati"
            >
              <TempleReceipt />
            </motion.div>

            {/* Tobby polaroid — mid left */}
            <motion.div
              {...paperDrop(5.0)}
              className="absolute"
              style={{ top: 156, left: 0 }}
              aria-label="Tobby photo"
            >
              <TobbyPolaroid />
            </motion.div>

            {/* Breakfast sticky — mid, overlapping Tobby a little */}
            <motion.div
              {...paperDrop(6.4)}
              className="absolute"
              style={{ top: 148, left: 66 }}
              aria-label="Breakfast sticky — Had breakfast?"
            >
              <BreakfastSticky />
            </motion.div>

            {/* Little note — lower right of cluster */}
            <motion.div
              {...paperDrop(7.8)}
              className="absolute"
              style={{ top: 162, right: 4 }}
              aria-label="Ride safe note"
            >
              <LittleNote />
            </motion.div>

            {/* Chocolate wrapper — lower left, standalone */}
            <motion.div
              {...paperDrop(9.2)}
              className="absolute"
              style={{ top: 290, left: 14 }}
              aria-label="Chocolate wrapper"
            >
              <ChocolateWrapper />
            </motion.div>

            {/* Ghost handwriting — barely visible, near bottom */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{ bottom: 32, left: 6 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0.4 : 11.0, duration: 3.0 }}
              aria-hidden="true"
            >
              <p className="font-handwriting text-[14px] text-charcoal/12 italic" style={{ rotate: '-1deg' }}>
                every ordinary day...
              </p>
            </motion.div>

          </div>
        </div>

        {/* ═══════════ RIGHT PAGE — three photos + quote + hidden interaction ══════ */}
        <div className="flex-1 md:pl-14 py-10 flex flex-col">

          <motion.p
            {...fadeIn(0.3, 1.6)}
            className="font-sans text-[15px] tracking-[0.42em] uppercase text-coffee/28 mb-5"
          >
            June 2026
          </motion.p>

          {/* Three scattered photos at the top of the right page */}
          <div className="relative mb-8" style={{ minHeight: 280 }}>
            {/* Photo 1 — far left, tilted left */}
            <motion.div
              {...fadeIn(1.2, 2.4)}
              className="absolute"
              style={{ top: 0, left: 0 }}
            >
              <RightPhoto
                src={photoGreenSaree}
                caption="green saree."
                rotate={-3}
                objectPos="center top"
              />
            </motion.div>
            {/* Photo 2 — centre, rotated right, overlapping first */}
            <motion.div
              {...fadeIn(1.8, 2.4)}
              className="absolute"
              style={{ top: 20, left: 120 }}
            >
              <RightPhoto
                src={usPhoto}
                caption="us."
                rotate={2}
                objectPos="top center"
              />
            </motion.div>
            {/* Photo 3 — right, tilted left, overlapping second */}
            <motion.div
              {...fadeIn(2.4, 2.4)}
              className="absolute"
              style={{ top: 4, right: 0 }}
            >
              <RightPhoto
                src={photoTemple}
                caption="together."
                rotate={-1.5}
                objectPos="center top"
              />
            </motion.div>
          </div>

          {/* Reflections poem */}
          <div className="flex flex-col gap-0.5 max-w-sm" role="article" aria-label="Reflections">
            {REFLECTIONS.map((line, i) => {
              if (line.pause) {
                return <div key={i} className="h-4" aria-hidden="true" />;
              }
              const fontClass =
                line.font === 'display'
                  ? 'font-display text-3xl md:text-4xl text-charcoal/78'
                  : line.font === 'handwriting'
                  ? 'font-handwriting text-2xl md:text-3xl text-coffee/72 italic'
                  : `font-letter text-xl md:text-2xl ${line.dim ? 'text-charcoal/35' : 'text-charcoal/55'}`;
              return (
                <motion.p
                  key={i}
                  {...fadeIn(line.delay, 2.4)}
                  className={`leading-snug ${fontClass}`}
                >
                  {line.text}
                </motion.p>
              );
            })}
          </div>

          {/* Breathing space */}
          <div className="flex-1" style={{ minHeight: 48 }} aria-hidden="true" />

          {/* Final lines */}
          <motion.div
            {...fadeIn(14.8, 3.0)}
            className="max-w-xs"
          >
            <div className="w-16 border-t border-charcoal/12 mb-5" aria-hidden="true" />
            <p className="font-letter text-xl text-charcoal/38 leading-relaxed italic">
              Maybe...
            </p>
            <p className="font-letter text-xl text-charcoal/38 leading-relaxed italic">
              these were never
            </p>
            <p className="font-letter text-xl text-charcoal/38 leading-relaxed italic">
              little things
            </p>
            <p className="font-letter text-xl text-charcoal/38 leading-relaxed italic">
              after all.
            </p>
          </motion.div>

          {/* Hidden interaction — whispered, barely visible */}
          <motion.div
            {...fadeIn(17.0, 3.5)}
            className="mt-12 mb-2"
          >
            <button
              onClick={onNext}
              className="font-handwriting text-[14px] text-charcoal/16 hover:text-charcoal/40 transition-colors duration-700 tracking-wide leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-golden focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              aria-label="Turn one last page to the epilogue"
            >
              I think there's<br />
              one last page...
            </button>
          </motion.div>

          {/* Back — barely visible */}
          <motion.div {...fadeIn(17.5, 2.0)}>
            <button
              onClick={onPrev}
              className="font-sans text-[15px] tracking-widest uppercase text-charcoal/14 hover:text-charcoal/32 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-golden"
              aria-label="Go back to previous chapter"
            >
              ← back
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
