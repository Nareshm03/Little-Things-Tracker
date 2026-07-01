import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Date Divider ─────────────────────────────────────────────────────────────

function DateDivider({ date, delay }: { date: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className="flex items-center gap-3 my-5"
    >
      <div className="w-5 h-px bg-charcoal/10" />
      <p className="font-handwriting text-xs text-charcoal/38 whitespace-nowrap tracking-wide">
        {date}
      </p>
      <div className="flex-1 h-px bg-charcoal/12" />
    </motion.div>
  );
}

// ─── Disappearing Messages Card ───────────────────────────────────────────────

function DisappearingMessagesCard({ delay }: { delay: number }) {
  const [turnedOff, setTurnedOff] = useState(false);
  const [revealed, setRevealed] = useState(false);

  function handleToggle() {
    if (turnedOff) return;
    setTurnedOff(true);
    setTimeout(() => setRevealed(true), 600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -1.5, y: 8 }}
      animate={{ opacity: 1, rotate: -1.5, y: 0 }}
      transition={{ delay, duration: 1 }}
      className="relative max-w-[248px]"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 washi-tape" />
      {/* Printed-screenshot style — no UI toggle */}
      <button
        onClick={handleToggle}
        disabled={turnedOff}
        aria-label={turnedOff ? 'Already turned off' : 'Turn off disappearing messages'}
        className="w-full text-left bg-[#F9F6F0] border border-charcoal/10 p-4 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coffee/40"
      >
        <p className="text-[15px] tracking-widest uppercase text-charcoal/28 mb-3 font-sans">
          Chat settings
        </p>
        <div className="space-y-1.5">
          <p className="text-[14px] font-medium text-charcoal/70 font-sans">Disappearing Messages</p>
          <div className="flex items-center justify-between">
            <p className="text-[16px] text-charcoal/40 font-sans">7 Days</p>
            <motion.p
              className="text-[16px] font-sans font-medium"
              animate={{ color: turnedOff ? 'rgba(111,78,55,0.7)' : 'rgba(45,45,45,0.3)' }}
              transition={{ duration: 0.5 }}
            >
              {turnedOff ? '✓ OFF' : '· · ·'}
            </motion.p>
          </div>
        </div>
        <AnimatePresence>
          {revealed && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-handwriting text-base text-coffee/70 mt-3 pt-3 border-t border-charcoal/10 leading-snug"
            >
              "Some conversations deserved to stay forever."
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

// ─── Printed Chat Screenshot ──────────────────────────────────────────────────

function ChatPrintout({ delay }: { delay: number }) {
  const messages: Array<{ from: 'n' | 'm'; text: string; time: string }> = [
    { from: 'n', text: 'Had breakfast?', time: '8:04 AM' },
    { from: 'm', text: 'Not yet 😅', time: '8:06 AM' },
    { from: 'n', text: 'Uta madu 🫂💗', time: '8:07 AM' },
    { from: 'm', text: 'Drink water mam 🙏', time: '1:14 PM' },
    { from: 'n', text: 'Reached home?', time: '6:41 PM' },
    { from: 'n', text: 'Good boii 🥺', time: '8:55 PM' },
    { from: 'm', text: 'Good gurl 🥺', time: '9:02 PM' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: -1 }}
      transition={{ delay, duration: 1 }}
      className="relative max-w-[252px]"
    >
      <div className="absolute -top-3 left-3 w-14 h-5 washi-tape -rotate-[2deg]" />
      <div className="absolute -top-3 right-3 w-14 h-5 washi-tape rotate-[3deg]" />
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm overflow-hidden">
        <div className="bg-charcoal/5 text-center py-1.5">
          <span className="text-[15px] tracking-widest uppercase text-charcoal/38 font-sans">
            a day in our chat
          </span>
        </div>
        <div className="px-3 py-3 space-y-1.5">
          {messages.map((msg, i) => {
            const isNaresh = msg.from === 'n';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 + i * 0.2, duration: 0.4 }}
                className={`flex flex-col ${isNaresh ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`px-2.5 py-1 rounded-lg text-[14px] leading-snug max-w-[78%] ${
                    isNaresh
                      ? 'bg-[#DCF8C6] text-[#111] rounded-tr-sm'
                      : 'bg-white border border-gray-100 text-[#111] rounded-tl-sm'
                  }`}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {msg.text}
                  {isNaresh && (
                    <span className="ml-1 text-[14px] text-green-600/50">✓✓</span>
                  )}
                </div>
                <span className="text-[14px] text-charcoal/22 mt-0.5 font-sans px-0.5">
                  {msg.time}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.8, duration: 1 }}
        className="font-handwriting text-[14px] text-coffee/45 mt-1.5 text-right mr-1 italic"
      >
        this became every day ↑
      </motion.p>
    </motion.div>
  );
}

// ─── Meghana's quote slip ─────────────────────────────────────────────────────

function MeghanaQuoteSlip({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ delay, duration: 1 }}
      className="relative max-w-[232px]"
    >
      <div className="absolute -top-2.5 left-4 w-12 h-4 washi-tape rotate-[1deg]" />
      <div
        className="bg-[#FFFEF8] border-l-[3px] border-[#C9A84C]/55 shadow-sm px-4 py-3"
        style={{ borderLeftColor: '#C9A84C' }}
      >
        <p className="font-quote text-[14px] text-charcoal/65 italic leading-relaxed">
          "Even I miss you so much… I used to remember yesterday's cute moments and blush myself 🥰"
        </p>
        <p className="font-sans text-[14px] tracking-[0.2em] text-charcoal/28 uppercase mt-2">
          — Meghana · 8 Feb 2026 · before we even met that day
        </p>
      </div>
    </motion.div>
  );
}

// ─── Photo Album Polaroid ─────────────────────────────────────────────────────

function PhotoAlbumCard({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ delay, duration: 0.9 }}
      className="relative"
    >
      <motion.button
        onClick={() => setOpened(v => !v)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-white p-2.5 pb-8 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coffee/40"
        style={{ boxShadow: '2px 3px 12px rgba(0,0,0,0.12)' }}
        aria-label="Open shared album"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 washi-tape rotate-[1deg]" />
        {/* Photo area */}
        <div className="w-36 h-28 bg-[#EDE3D8] flex items-center justify-center relative overflow-hidden">
          <span className="text-3xl" aria-hidden="true">📸</span>
          {!opened && (
            <div className="absolute inset-0 flex items-end justify-center pb-1.5">
              <span className="text-[15px] text-charcoal/35 font-sans tracking-wide">tap to open</span>
            </div>
          )}
        </div>
        <p className="font-handwriting text-base text-center mt-2 text-charcoal/70">
          Shared Album
        </p>
      </motion.button>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.7 }}
            className="mt-3 pl-2"
          >
            <p className="font-handwriting text-base text-charcoal/65 leading-snug">
              This was the beginning of our collection.
            </p>
            <p className="font-handwriting text-sm text-coffee/50 mt-1 italic">
              First photo. Definitely not the last.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Hackathon × Maths Exam Timeline ─────────────────────────────────────────

function HackathonCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9 }}
      className="bg-[#F9F6F0] border border-charcoal/10 p-4 shadow-sm max-w-[248px]"
      style={{ rotate: '1deg' }}
    >
      <div className="absolute -top-3 right-4 w-12 h-5 washi-tape rotate-[2deg]" />
      <p className="text-[15px] tracking-widest uppercase text-charcoal/30 mb-3 font-sans text-center">
        same afternoon, different rooms
      </p>
      <div className="grid grid-cols-2 gap-4 text-center mb-3">
        <div>
          <p className="font-handwriting text-xs text-charcoal/45 mb-0.5">Meghana</p>
          <p className="font-sans text-xs font-medium text-charcoal/80">Maths Exam</p>
        </div>
        <div>
          <p className="font-handwriting text-xs text-charcoal/45 mb-0.5">Naresh</p>
          <p className="font-sans text-xs font-medium text-charcoal/80">Hackathon</p>
        </div>
      </div>
      <div className="border-t border-charcoal/10 pt-3 text-center">
        <p className="font-handwriting text-base text-coffee/70">4:30 PM</p>
        <p className="font-quote text-xs text-charcoal/60 mt-1 italic leading-snug">
          "Come to canteen entrance."
        </p>
      </div>
    </motion.div>
  );
}

// ─── First Outing Timeline ────────────────────────────────────────────────────

function FirstOutingTimeline({ delay }: { delay: number }) {
  const stops = [
    { time: '2:47 PM', label: 'Bus Stop — we met' },
    { time: '',        label: '3 hours together' },
    { time: '6:28 PM', label: 'She reached PG' },
    { time: '7:10 PM', label: 'I reached home' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="relative pl-7"
    >
      {/* Vertical line */}
      <div className="absolute left-2.5 top-2 bottom-2 w-px bg-charcoal/15" />

      <div className="space-y-4">
        {stops.map((stop, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 + i * 0.35, duration: 0.6 }}
            className="relative"
          >
            {/* Dot */}
            <div className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-golden/50 border border-golden/30" />
            {stop.time && (
              <p className="font-handwriting text-[15px] text-charcoal/38 leading-none">
                {stop.time}
              </p>
            )}
            <p className={`font-sans text-base text-charcoal/75 ${stop.time ? 'mt-0.5' : 'mt-0'}`}>
              {stop.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Chapter One ──────────────────────────────────────────────────────────────

export default function ChapterOne({ onNext, onPrev }: ChapterProps) {
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 bg-cream w-full h-full overflow-y-auto overflow-x-hidden paper-texture"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
    >
      {/* Soft morning light */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FFF9F0]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 flex flex-col py-8 z-10">

          {/* Chapter label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-sans text-xs tracking-[0.38em] uppercase text-brown/38 mb-8"
          >
            Chapter One
          </motion.p>

          {/* Poem intro — lots of breathing space */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.4 }}
            className="space-y-6 max-w-sm mb-10"
          >
            <p className="font-display text-3xl text-charcoal font-light leading-[2.1]">
              Nobody tells you<br />
              the exact moment<br />
              someone slowly becomes<br />
              your favourite person.
            </p>

            <div className="space-y-3 pt-3">
              <p className="font-quote text-base text-charcoal/55 leading-[2.0]">
                Maybe it was somewhere between
              </p>
              <p className="font-handwriting text-2xl text-coffee pl-3">"Had breakfast?"</p>
              <p className="font-quote text-base text-charcoal/45 pl-1">and</p>
              <p className="font-handwriting text-2xl text-coffee pl-3">"Drink water."</p>
            </div>
          </motion.div>

          {/* ── 5 February ── */}
          <DateDivider date="5 February 2026" delay={1.4} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 1.2 }}
            className="space-y-1 mb-2 pl-1"
          >
            <p className="font-handwriting text-base text-charcoal/55 leading-relaxed">
              First message.
            </p>
            <p className="font-handwriting text-sm text-charcoal/35 italic">
              Everything after that was inevitable.
            </p>
          </motion.div>

          {/* ── 8 February ── */}
          <DateDivider date="8 February 2026" delay={2.1} />

          <div className="flex flex-col">
            <ChatPrintout delay={2.4} />
            <div className="mt-7 ml-2">
              <MeghanaQuoteSlip delay={4.0} />
            </div>
            <div className="mt-2">
              <DisappearingMessagesCard delay={5.2} />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1 min-h-[32px]" />

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6">
            <button
              onClick={onPrev}
              className="font-sans text-xs text-charcoal/35 hover:text-coffee transition-colors tracking-widest uppercase"
            >
              ← Before We Begin
            </button>
            <button
              onClick={onNext}
              className="font-sans text-xs text-charcoal/45 hover:text-coffee transition-colors tracking-widest uppercase"
            >
              Next →
            </button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE ═══════════ */}
        <div className="flex-1 md:pl-12 flex flex-col py-8">

          {/* HERO: yellow sticky — dominant first impression */}
          <motion.div
            initial={{ opacity: 0, y: -8, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="inline-block self-start mb-2"
          >
            <div className="bg-[#FEF08A] px-10 py-8 shadow-lg">
              <p className="font-letter text-[3.8rem] text-charcoal/88 leading-none">Had breakfast?</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="font-handwriting text-xs text-charcoal/32 italic mb-2 ml-2"
          >
            ↑ this was message 1. and 2. and 3.
          </motion.p>

          {/* ── 9 February ── */}
          <DateDivider date="9 February 2026" delay={2.2} />

          <div className="space-y-5">
            {/* Shared Album crosses the center fold by ~20px — feels naturally placed */}
            <div style={{ marginLeft: '-20px' }}>
              <PhotoAlbumCard delay={2.5} />
            </div>
            <div className="relative">
              <HackathonCard delay={3.2} />
            </div>
          </div>

          {/* ── 12 February ── */}
          <DateDivider date="12 February 2026" delay={4.0} />

          <div className="space-y-4">
            <FirstOutingTimeline delay={4.3} />

            {/* End of chapter pull */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.2, duration: 1.5 }}
              className="pt-2"
            >
              <p className="font-handwriting text-base text-charcoal/28 italic text-right">
                ...and then, 14 February.
              </p>
            </motion.div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

        </div>
      </div>
    </motion.div>
  );
}
