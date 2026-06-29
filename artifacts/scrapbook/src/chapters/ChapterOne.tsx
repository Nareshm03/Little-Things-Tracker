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
      <div className="flex-1 h-px bg-charcoal/12" />
      <p className="font-handwriting text-xs text-charcoal/38 whitespace-nowrap tracking-wide">
        {date}
      </p>
      <div className="flex-1 h-px bg-charcoal/12" />
    </motion.div>
  );
}

// ─── Disappearing Messages Card ───────────────────────────────────────────────

function DisappearingMessagesCard({ delay }: { delay: number }) {
  const [isOn, setIsOn] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleToggle() {
    if (!isOn) return;
    setIsOn(false);
    setTimeout(() => setRevealed(true), 700);
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -1.5, y: 8 }}
      animate={{ opacity: 1, rotate: -1.5, y: 0 }}
      transition={{ delay, duration: 1 }}
      className="relative max-w-[248px]"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 washi-tape" />
      <div className="bg-[#F9F6F0] border border-charcoal/10 p-4 shadow-sm">
        <p className="text-[9px] tracking-widest uppercase text-charcoal/28 mb-2.5 font-sans">
          Chat settings
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <motion.span
              animate={isOn && !shouldReduceMotion ? { rotate: [0, 12, -12, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="text-base"
              aria-hidden="true"
            >
              ⏱
            </motion.span>
            <div>
              <p className="text-xs font-medium text-charcoal/80">Disappearing messages</p>
              <motion.p
                className="text-[10px] text-charcoal/40 font-sans"
                animate={{ opacity: isOn ? 1 : 0.45 }}
              >
                {isOn ? '7 days' : 'Off'}
              </motion.p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            disabled={!isOn}
            aria-label={isOn ? 'Turn off disappearing messages' : 'Already off'}
            className="relative w-10 h-5 rounded-full flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-coffee/40 transition-colors duration-500"
            style={{ backgroundColor: isOn ? '#25D366' : '#C8C8C8' }}
          >
            <motion.div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
              animate={{ left: isOn ? '22px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
        <AnimatePresence>
          {revealed && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-handwriting text-sm text-coffee/70 mt-3 pt-3 border-t border-charcoal/10 leading-snug"
            >
              "Some conversations deserved to stay forever."
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Printed Chat Screenshot ──────────────────────────────────────────────────

function ChatPrintout({ delay }: { delay: number }) {
  const messages: Array<{ from: 'n' | 'm'; text: string }> = [
    { from: 'n', text: 'Had breakfast???' },
    { from: 'm', text: 'Noooooo' },
    { from: 'n', text: 'Eat knowww' },
    { from: 'n', text: 'Ur in cllge now ?' },
    { from: 'm', text: 'Just now I came' },
    { from: 'n', text: 'Then breakfast who ll eat' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 1.5 }}
      transition={{ delay, duration: 1 }}
      className="relative max-w-[252px]"
    >
      <div className="absolute -top-3 left-3 w-14 h-5 washi-tape -rotate-[2deg]" />
      <div className="absolute -top-3 right-3 w-14 h-5 washi-tape rotate-[3deg]" />
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm overflow-hidden">
        <div className="bg-charcoal/5 text-center py-1.5">
          <span className="text-[9px] tracking-widest uppercase text-charcoal/38 font-sans">
            8 February 2026
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
                transition={{ delay: delay + 0.3 + i * 0.22, duration: 0.4 }}
                className={`flex ${isNaresh ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-2.5 py-1 rounded-lg text-[11px] leading-snug max-w-[78%] ${
                    isNaresh
                      ? 'bg-[#DCF8C6] text-[#111] rounded-tr-sm'
                      : 'bg-white border border-gray-100 text-[#111] rounded-tl-sm'
                  }`}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {msg.text}
                  {isNaresh && (
                    <span className="ml-1 text-[8px] text-green-600/50">✓✓</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.6, duration: 1 }}
        className="font-handwriting text-[11px] text-coffee/45 mt-1.5 text-right mr-1 italic"
      >
        this became every morning ↑
      </motion.p>
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
              <span className="text-[9px] text-charcoal/35 font-sans tracking-wide">tap to open</span>
            </div>
          )}
        </div>
        <p className="font-handwriting text-sm text-center mt-2 text-charcoal/70">
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
            <p className="font-handwriting text-sm text-charcoal/65 leading-snug">
              This was the beginning of our collection.
            </p>
            <p className="font-handwriting text-xs text-coffee/50 mt-1 italic">
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
      <p className="text-[9px] tracking-widest uppercase text-charcoal/30 mb-3 font-sans text-center">
        same afternoon, different rooms
      </p>
      <div className="grid grid-cols-2 gap-4 text-center mb-3">
        <div>
          <p className="font-handwriting text-xs text-charcoal/45 mb-0.5">Her</p>
          <p className="font-sans text-xs font-medium text-charcoal/80">Maths Exam</p>
        </div>
        <div>
          <p className="font-handwriting text-xs text-charcoal/45 mb-0.5">His</p>
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
    { time: '2:47 PM', label: 'Bus Stop', note: '' },
    { time: '',        label: '3 hours',  note: '' },
    { time: '6:28 PM', label: 'Reached PG', note: '' },
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
              <p className="font-handwriting text-xs text-charcoal/38 leading-none">
                {stop.time}
              </p>
            )}
            <p className={`font-sans text-sm text-charcoal/75 ${stop.time ? 'mt-0.5' : 'mt-0'}`}>
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
            className="space-y-6 max-w-xs mb-10"
          >
            <p className="font-display text-2xl text-charcoal font-light leading-[1.75]">
              Nobody tells you<br />
              the exact moment<br />
              someone slowly becomes<br />
              your favourite person.
            </p>

            <div className="space-y-2 pt-2">
              <p className="font-quote text-sm text-charcoal/55 leading-loose">
                Maybe it was somewhere between
              </p>
              <p className="font-handwriting text-xl text-coffee pl-3">"Had breakfast?"</p>
              <p className="font-quote text-sm text-charcoal/45 pl-1">and</p>
              <p className="font-handwriting text-xl text-coffee pl-3">"Drink water."</p>
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

          <div className="space-y-4">
            <ChatPrintout delay={2.4} />
            <DisappearingMessagesCard delay={4.4} />
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

          {/* Single sticky note — prominent */}
          <motion.div
            initial={{ opacity: 0, y: -8, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="inline-block self-start mb-2"
          >
            <div className="bg-[#FEF08A] px-6 py-5 shadow-md">
              <p className="font-letter text-[1.65rem] text-charcoal/85">Had breakfast?</p>
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
            <PhotoAlbumCard delay={2.5} />
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
              <p className="font-handwriting text-sm text-charcoal/30 italic text-right">
                Next → The First Kiss
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
