import React from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Tiny objects — each one a memory ─────────────────────────────────────────

function BreakfastSticky() {
  return (
    <div
      style={{
        backgroundColor: '#FFF9C4',
        width: 88,
        padding: '8px 10px 14px 10px',
        rotate: '-2deg',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      }}
    >
      <p className="font-handwriting text-[11px] text-charcoal/55 italic leading-snug">
        Had breakfast?
      </p>
    </div>
  );
}

function ChocolateWrapper() {
  return (
    <div style={{ width: 72, rotate: '3deg' }}>
      <div
        className="border border-charcoal/12 overflow-hidden shadow-sm"
        style={{ backgroundColor: '#3B1F0E', borderRadius: 1 }}
      >
        <div className="px-2 py-1.5">
          <p className="font-sans text-[5.5px] tracking-[0.22em] uppercase text-white/32 text-center">Dairy Milk</p>
          <div
            className="mt-1 grid grid-cols-3 gap-px"
            aria-hidden="true"
          >
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{ height: 8, backgroundColor: 'rgba(90,45,15,0.8)' }}
              />
            ))}
          </div>
        </div>
        <div
          className="h-1.5"
          style={{ background: 'linear-gradient(90deg, #C9A84C44, #FFF3CD55, #C9A84C44)' }}
        />
      </div>
    </div>
  );
}

function MovieTicket() {
  return (
    <div style={{ width: 110, rotate: '-1.5deg' }}>
      <div
        className="bg-[#FDFAF4] border border-charcoal/12 shadow-sm overflow-hidden"
        style={{ borderRadius: 2 }}
      >
        <div className="bg-[#1A3A5C] px-3 py-1.5">
          <p className="font-sans text-[6px] tracking-[0.28em] uppercase text-white/45 text-center">Cinema</p>
        </div>
        {/* Perforation */}
        <div className="relative flex items-center px-0 py-0">
          <div className="w-2 h-2 rounded-full bg-[#F6F8FA] border-r border-charcoal/10 -ml-1" />
          <div className="flex-1 border-t border-dashed border-charcoal/10 mx-1" />
          <div className="w-2 h-2 rounded-full bg-[#F6F8FA] border-l border-charcoal/10 -mr-1" />
        </div>
        <div className="px-3 py-2">
          <p className="font-letter text-[10px] text-charcoal/48 italic leading-snug">Good movie.</p>
          <p className="font-handwriting text-[8px] text-charcoal/28 mt-0.5">with you.</p>
          <p className="font-sans text-[5px] tracking-[0.2em] text-charcoal/18 mt-1.5 uppercase">Row D · Seat 4 &amp; 5</p>
        </div>
      </div>
    </div>
  );
}

function TinyRose() {
  return (
    <svg width="44" height="56" viewBox="0 0 44 56" aria-label="Pressed rose" role="img" style={{ rotate: '5deg' }}>
      {/* Stem */}
      <path d="M 22 54 C 20 46, 18 38, 20 28" stroke="#6B7C3A" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* Small leaf */}
      <ellipse cx="16" cy="38" rx="5" ry="2.5" transform="rotate(-40 16 38)" fill="#7B8C42" opacity="0.38" />
      {/* Petals — layered ellipses */}
      <ellipse cx="22" cy="20" rx="10" ry="7" fill="#C98A95" opacity="0.28" />
      <ellipse cx="22" cy="18" rx="8"  ry="6"  fill="#D4A0A8" opacity="0.32" />
      <ellipse cx="22" cy="16" rx="6"  ry="4.5" fill="#DDB0B8" opacity="0.38" />
      <ellipse cx="22" cy="15" rx="4"  ry="3.5" fill="#E8C0C6" opacity="0.45" />
      {/* Centre */}
      <circle cx="22" cy="14" r="2.5" fill="#C9A84C" opacity="0.50" />
    </svg>
  );
}

function TobbyPhoto() {
  return (
    <div
      className="bg-white border border-charcoal/10 shadow-sm"
      style={{ padding: '4px 4px 14px 4px', width: 62, rotate: '2.5deg' }}
    >
      <div
        className="flex flex-col items-center justify-center bg-[#EDE4D8]"
        style={{ width: 54, height: 50 }}
      >
        {/* Tobby silhouette — simple dog shape */}
        <svg width="32" height="30" viewBox="0 0 32 30" aria-label="Tobby" role="img">
          {/* Body */}
          <ellipse cx="16" cy="20" rx="9" ry="7" fill="#8B6914" opacity="0.30" />
          {/* Head */}
          <circle cx="16" cy="11" r="6" fill="#8B6914" opacity="0.30" />
          {/* Ears */}
          <ellipse cx="10" cy="8" rx="3" ry="4.5" fill="#7A5C10" opacity="0.28" />
          <ellipse cx="22" cy="8" rx="3" ry="4.5" fill="#7A5C10" opacity="0.28" />
          {/* Tail */}
          <path d="M 24 18 Q 30 12, 28 8" stroke="#8B6914" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.25" />
          {/* Paws */}
          <ellipse cx="10" cy="27" rx="3" ry="2" fill="#7A5C10" opacity="0.22" />
          <ellipse cx="22" cy="27" rx="3" ry="2" fill="#7A5C10" opacity="0.22" />
        </svg>
      </div>
      <p className="font-handwriting text-[7px] text-charcoal/30 text-center mt-1.5">Tobby</p>
    </div>
  );
}

function TempleReceipt() {
  return (
    <div style={{ width: 78, rotate: '-3deg' }}>
      {/* Torn top */}
      <svg width="78" height="8" viewBox="0 0 78 8" className="w-full block" aria-hidden="true">
        <path d="M0,6 C8,1 16,6 24,3 C32,0 40,5 48,2 C56,0 64,5 78,4 L78,8 L0,8 Z" fill="#FDFAF4" />
      </svg>
      <div className="bg-[#FDFAF4] border-x border-b border-charcoal/8 px-3 pb-3 pt-1.5">
        <p className="font-sans text-[5.5px] tracking-[0.3em] uppercase text-charcoal/20 mb-1.5 text-center">Tirupati</p>
        <div className="space-y-0.5">
          <p className="font-handwriting text-[8px] text-charcoal/32">Laddu prasad × 2</p>
          <p className="font-handwriting text-[8px] text-charcoal/32">Darshan ticket</p>
          <p className="font-handwriting text-[8px] text-charcoal/32">Safe ride ❤️</p>
        </div>
        <div className="border-t border-dashed border-charcoal/10 mt-2 pt-1.5">
          <p className="font-handwriting text-[7px] text-charcoal/22 italic text-right">2025</p>
        </div>
      </div>
      {/* Torn bottom */}
      <svg width="78" height="8" viewBox="0 0 78 8" className="w-full block" aria-hidden="true">
        <path d="M0,0 C10,5 20,1 30,4 C40,7 50,2 60,5 C68,7 72,3 78,2 L78,0 Z" fill="#FDFAF4" />
      </svg>
    </div>
  );
}

function TinyBucketList() {
  return (
    <div
      className="bg-[#FDFCF8] border border-charcoal/10 shadow-sm px-3 py-2.5"
      style={{ width: 92, rotate: '1.5deg' }}
    >
      <p className="font-sans text-[5px] tracking-[0.3em] uppercase text-charcoal/18 mb-1.5">Bucket List</p>
      <div className="space-y-1">
        {[
          { text: 'Tirupati ride', done: true },
          { text: 'IELTS', done: false },
          { text: 'Abroad together', done: false },
        ].map(({ text, done }, i) => (
          <p key={i} className="font-handwriting text-[8.5px] text-charcoal/42 flex items-center gap-1.5">
            <span className="text-[10px] text-charcoal/28">{done ? '☑' : '☐'}</span>
            <span className={done ? 'line-through text-charcoal/22' : ''}>{text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── The seven tiny objects, each arriving at its own pace ────────────────────
const OBJECTS: Array<{ el: React.ReactNode; delay: number; label: string }> = [
  { el: <BreakfastSticky />,  delay: 1.4,  label: 'Breakfast sticky — Had breakfast?' },
  { el: <ChocolateWrapper />, delay: 2.8,  label: 'Chocolate wrapper' },
  { el: <MovieTicket />,      delay: 4.2,  label: 'Movie ticket' },
  { el: <TinyRose />,         delay: 5.6,  label: 'Pressed rose' },
  { el: <TobbyPhoto />,       delay: 7.0,  label: 'Tobby photo' },
  { el: <TempleReceipt />,    delay: 8.4,  label: 'Temple receipt from Tirupati' },
  { el: <TinyBucketList />,   delay: 9.8,  label: 'Tiny bucket list' },
];

// ─── Right page — reflections ─────────────────────────────────────────────────
// Each block is a poem fragment: [text, font class, delay, opacity class]
type ReflectionLine = {
  text: string;
  font: 'display' | 'letter' | 'handwriting';
  delay: number;
  dim?: boolean;
  pause?: boolean;
};

const REFLECTIONS: ReflectionLine[] = [
  { text: 'We thought', font: 'letter', delay: 2.0 },
  { text: 'the important memories', font: 'letter', delay: 2.6 },
  { text: 'would be', font: 'letter', delay: 3.0 },
  { text: 'birthdays... trips...', font: 'letter', delay: 3.6, dim: true },
  { text: 'big surprises.', font: 'letter', delay: 4.0, dim: true },
  { pause: true, text: '', font: 'letter', delay: 4.4 },
  { text: 'Instead...', font: 'handwriting', delay: 5.4 },
  { pause: true, text: '', font: 'letter', delay: 5.6 },
  { text: 'they became', font: 'letter', delay: 6.4 },
  { pause: true, text: '', font: 'letter', delay: 6.6 },
  { text: 'drink water.', font: 'handwriting', delay: 7.2 },
  { text: 'ride safe.', font: 'handwriting', delay: 7.8 },
  { text: 'had breakfast.', font: 'handwriting', delay: 8.4 },
  { text: 'good night.', font: 'handwriting', delay: 9.0 },
  { text: 'see you tomorrow.', font: 'handwriting', delay: 9.6 },
  { pause: true, text: '', font: 'letter', delay: 10.0 },
  { text: 'Love', font: 'display', delay: 11.0 },
  { text: 'was never', font: 'letter', delay: 11.6 },
  { text: 'one big moment.', font: 'letter', delay: 12.0, dim: true },
  { pause: true, text: '', font: 'letter', delay: 12.4 },
  { text: 'It was', font: 'letter', delay: 13.0 },
  { text: 'thousands of tiny ones.', font: 'display', delay: 13.6 },
];

// ─── Chapter Seven ────────────────────────────────────────────────────────────
export default function ChapterSeven({ onNext, onPrev }: ChapterProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = (delay: number, duration = 2.2): { initial: { opacity: number }; animate: { opacity: number }; transition: Transition } =>
    shouldReduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration, ease: [0.25, 0.1, 0.25, 1] } };

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
      {/* Very soft morning warmth — barely there */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 60% 10%, rgba(232,184,109,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Paper texture — cream noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-14 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div
          className="flex-1 md:border-r md:border-charcoal/8 md:pr-14 py-10 flex flex-col"
          style={{ minHeight: '100%' }}
        >
          {/* Chapter label */}
          <motion.p
            {...fadeIn(0.3, 1.6)}
            className="font-sans text-[9px] tracking-[0.42em] uppercase text-coffee/28 mb-5"
          >
            Chapter Seven
          </motion.p>

          {/* Large handwritten title — the whole chapter name */}
          <motion.h2
            {...fadeIn(0.7, 2.4)}
            className="font-handwriting text-[2.4rem] md:text-[2.8rem] text-charcoal/72 leading-snug"
            style={{ maxWidth: 340 }}
          >
            The Little Things<br />
            We Never Want<br />
            To Forget
          </motion.h2>

          {/* Breathing space */}
          <div className="flex-1" style={{ minHeight: 48 }} aria-hidden="true" />

          {/* Seven tiny objects — appear one by one, no interaction */}
          <div
            className="flex flex-wrap gap-5 items-end"
            role="list"
            aria-label="Seven little memories"
          >
            {OBJECTS.map(({ el, delay, label }, i) => (
              <motion.div
                key={i}
                {...fadeIn(delay, 2.8)}
                role="listitem"
                aria-label={label}
              >
                {el}
              </motion.div>
            ))}
          </div>

          {/* Breathing space below */}
          <div className="h-10" aria-hidden="true" />
        </div>

        {/* ═══════════ RIGHT PAGE ═══════════ */}
        <div className="flex-1 md:pl-14 py-10 flex flex-col">

          {/* Chapter byline — matches left page rhythm */}
          <motion.p
            {...fadeIn(0.3, 1.6)}
            className="font-sans text-[9px] tracking-[0.42em] uppercase text-coffee/28 mb-5"
          >
            June 2026
          </motion.p>

          {/* Reflections — each line arrives in its own time */}
          <div className="flex flex-col gap-0.5 max-w-sm" role="article" aria-label="Reflections">
            {REFLECTIONS.map((line, i) => {
              if (line.pause) {
                return <div key={i} className="h-5" aria-hidden="true" />;
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
          <div className="flex-1" style={{ minHeight: 60 }} aria-hidden="true" />

          {/* Final line — before the turn */}
          <motion.div
            {...fadeIn(15.5, 3.0)}
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

          {/* Hidden interaction — almost invisible, very bottom */}
          <motion.div
            {...fadeIn(18.0, 3.5)}
            className="mt-12 mb-2"
          >
            <button
              onClick={onNext}
              className="font-handwriting text-[13px] text-charcoal/18 hover:text-charcoal/42 transition-colors duration-700 tracking-wide focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-golden focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              aria-label="Turn one last page to the epilogue"
            >
              turn one last page →
            </button>
          </motion.div>

          {/* Back — barely visible */}
          <motion.div {...fadeIn(18.5, 2.0)}>
            <button
              onClick={onPrev}
              className="font-sans text-[9px] tracking-widest uppercase text-charcoal/14 hover:text-charcoal/32 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-golden"
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
