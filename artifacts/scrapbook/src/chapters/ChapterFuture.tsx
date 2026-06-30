import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Empty photo frame ─────────────────────────────────────────────────────────
function EmptyFrame({
  label, rotate, delay,
}: { label: string; rotate: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {/* Washi tape */}
      <div
        className="absolute -top-2.5 left-1/2 z-10 w-10 h-3.5"
        style={{
          backgroundColor: 'rgba(201,151,58,0.40)',
          transform: `translateX(-50%) rotate(${rotate * 0.5}deg)`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
        }}
        aria-hidden="true"
      />
      <div
        className="bg-white border-2 border-dashed border-charcoal/12 shadow-sm"
        style={{ padding: '7px 7px 20px 7px' }}
      >
        {/* Empty photo area */}
        <div
          className="flex flex-col items-center justify-center bg-[#F5F0EA]"
          style={{ width: 140, height: 108 }}
        >
          <svg viewBox="0 0 32 24" width="28" height="21" aria-hidden="true">
            <rect x="1" y="1" width="30" height="22" rx="2" fill="none" stroke="#9C8B6E" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="16" cy="11" r="4" fill="none" stroke="#9C8B6E" strokeWidth="0.9" />
            <path d="M10 17 L14 12 L18 15 L21 10 L28 18" fill="none" stroke="#9C8B6E" strokeWidth="0.9" strokeLinejoin="round" />
          </svg>
          <p className="font-handwriting text-[8px] text-charcoal/25 mt-1.5 tracking-wide">soon.</p>
        </div>
        {/* Caption */}
        <p className="font-handwriting text-[9px] text-charcoal/32 text-center mt-1 leading-snug">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Ink rule ──────────────────────────────────────────────────────────────────
function InkRule({ delay }: { delay: number }) {
  return (
    <svg className="w-20 h-3" viewBox="0 0 100 10" aria-hidden="true">
      <motion.path
        d="M 2 6 C 25 3, 50 8, 75 5 S 92 7, 98 5"
        fill="none" stroke="#6F4E37" strokeWidth="1.2" strokeLinecap="round"
        opacity={0.28}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Envelope button + handwritten letter ─────────────────────────────────────
const LETTER_TEXT = `Meghana,

I don't know what next year looks like.

I don't know if it's IELTS first, then abroad, or Tirupathi on the bike, or something we haven't even planned yet.

But I know this —

Whatever it is, I want to find out with you.

I want to be the one texting "had breakfast?" when you're nervous before something big. I want to be the one who knows your schedule better than his own. I want to keep collecting the small things — because that's how I knew I loved you. Not from one big moment. From a hundred tiny ones.

So yes. There's a future page in this scrapbook.

It's empty for now.

But we'll fill it.`;

function EnvelopeLetter({ delay }: { delay: number }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-start gap-4">
      {/* Envelope button */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay, duration: 1.2 }}
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 border border-[#B85C38]/25 px-4 py-2.5 font-letter text-sm text-[#B85C38]/70 hover:border-[#B85C38]/55 hover:text-[#B85C38] transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 bg-white/60"
        aria-expanded={open}
        aria-label={open ? 'Close letter' : 'Open letter from Naresh'}
      >
        <span aria-hidden="true">{open ? '✉' : '✉'}</span>
        <span>{open ? 'close letter' : 'open letter'}</span>
      </motion.button>

      {/* Letter */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : { duration: 0.85, ease: [0.4, 0, 0.2, 1] }
            }
            className="overflow-hidden w-full max-w-sm"
          >
            <div
              className="bg-[#FFFEF8] border border-[#C9A84C]/18 border-t-4 shadow-sm px-6 pt-5 pb-6"
              style={{ borderTopColor: '#B85C38' }}
            >
              <p className="font-letter text-[0.95rem] text-charcoal/65 leading-[2.1] whitespace-pre-line">
                {LETTER_TEXT}
              </p>
              <div className="mt-5 flex flex-col gap-0.5">
                <InkRule delay={0.1} />
                <p className="font-handwriting text-[1.4rem] text-coffee/55 italic mt-1.5">yours,</p>
                <p className="font-handwriting text-[1.55rem] text-coffee/68 italic">Naresh</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Chapter Future ────────────────────────────────────────────────────────────
export default function ChapterFuture({ onNext, onPrev }: ChapterProps) {
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit:    { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#FDF6EE' }}
      variants={slideVariants}
      initial="initial" animate="animate" exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      aria-label="What's Next — a future chapter"
    >
      {/* Lined paper — very faint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.033) 27px, rgba(0,0,0,0.033) 28px)',
          backgroundPosition: '0 40px',
        }}
        aria-hidden="true"
      />

      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 py-8 z-10 flex flex-col">

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            <p className="font-sans text-[9px] tracking-[0.42em] uppercase text-[#8B6020]/36 mb-1">
              what's next
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-[#7C4A10] leading-tight">
              The Future<br /><em>We're Planning</em>
            </h2>
            <motion.svg className="w-44 h-4 mt-1.5" viewBox="0 0 180 12" aria-hidden="true">
              <motion.path
                d="M0 7 Q45 3 90 7 Q135 11 180 6"
                fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.7 }}
              />
            </motion.svg>
          </motion.div>

          {/* Bucket list items */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-8 space-y-0"
          >
            <p className="font-handwriting text-[8.5px] text-charcoal/28 uppercase tracking-[0.28em] mb-3">
              in some order, probably
            </p>
            {[
              { label: 'Tirupathi — on the bike', checked: false },
              { label: 'IELTS — both of us', checked: false },
              { label: 'Abroad — still planning ❤️', checked: false },
              { label: 'Momos after exams', checked: false },
              { label: 'Show dancing skills — no one watching', checked: false },
              { label: 'A bedtime story. Actually told.', checked: false },
            ].map(({ label, checked }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.14, duration: 0.7 }}
                className="flex items-center gap-2.5 py-2 border-b border-charcoal/7"
              >
                <span className="font-handwriting text-[14px] text-charcoal/32">{checked ? '☑' : '☐'}</span>
                <p className="font-handwriting text-[13px] text-charcoal/58 leading-tight">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Letter */}
          <div className="mt-8">
            <EnvelopeLetter delay={2.0} />
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-8 mt-auto">
            <button
              onClick={onPrev}
              className="font-handwriting text-xl text-[#8B6020]/50 hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2"
              aria-label="Previous chapter"
            >← back</button>
            <button
              onClick={onNext}
              className="font-handwriting text-xl text-[#E8924A] hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2 ml-auto"
              aria-label="Next — Epilogue"
            >the letter →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE — empty frames ═══════════ */}
        <div className="flex-1 md:pl-10 py-8 z-10">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-6"
          >
            <p className="font-quote text-base text-charcoal/38 italic leading-relaxed max-w-xs">
              A scrapbook isn't finished.<br />
              It's ongoing.
            </p>
          </motion.div>

          {/* 2 × 2 grid of empty frames */}
          <div className="grid grid-cols-2 gap-6">
            <EmptyFrame label="Tirupathi" rotate={-2}   delay={1.0} />
            <EmptyFrame label="somewhere new" rotate={1.5}  delay={1.2} />
            <EmptyFrame label="this year" rotate={-1}   delay={1.4} />
            <EmptyFrame label="us, eventually" rotate={2}    delay={1.6} />
          </div>

          {/* Handwritten note at bottom */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1.6 }}
            className="mt-8 text-right"
          >
            <p className="font-handwriting text-sm text-charcoal/25 italic leading-relaxed">
              We'll print these one day.<br />
              <span className="text-charcoal/18 text-xs">And stick them here.</span>
            </p>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
