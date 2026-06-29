import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Disappearing Messages Card ───────────────────────────────────────────────

function DisappearingMessagesCard() {
  const [isOn, setIsOn] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleToggle() {
    if (isOn) {
      setIsOn(false);
      setTimeout(() => setRevealed(true), 800);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -1.5 }}
      animate={{ opacity: 1, rotate: -1.5 }}
      transition={{ delay: 2.8, duration: 1 }}
      className="relative max-w-[260px]"
    >
      {/* Washi tape top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 washi-tape" />

      {/* Printed-paper style card */}
      <div
        className="bg-[#F9F6F0] border border-charcoal/10 p-4 shadow-sm"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {/* "Chat settings" header */}
        <p className="text-[10px] tracking-widest uppercase text-charcoal/30 mb-2">Chat settings</p>

        {/* Disappearing messages row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Timer icon */}
            <motion.div
              animate={isOn ? { rotate: [0, 10, -10, 0] } : { rotate: 0, opacity: 0.3 }}
              transition={{ duration: shouldReduceMotion ? 0 : 2, repeat: isOn ? Infinity : 0, repeatDelay: 3 }}
              className="text-lg"
              aria-hidden="true"
            >
              ⏱
            </motion.div>
            <div>
              <p className="text-xs font-medium text-charcoal/80">Disappearing messages</p>
              <motion.p
                className="text-[10px] text-charcoal/40"
                animate={{ opacity: isOn ? 1 : 0.4 }}
              >
                {isOn ? '7 days' : 'Off'}
              </motion.p>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={handleToggle}
            disabled={!isOn}
            aria-label={isOn ? 'Turn off disappearing messages' : 'Already off'}
            className="relative w-10 h-5 rounded-full transition-colors duration-500 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-coffee/40"
            style={{ backgroundColor: isOn ? '#25D366' : '#C8C8C8' }}
          >
            <motion.div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
              animate={{ left: isOn ? '50%' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Revealed annotation */}
        <AnimatePresence>
          {revealed && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
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

// ─── Printed chat screenshot ───────────────────────────────────────────────────

function ChatPrintout() {
  const messages = [
    { from: 'n', text: 'Had breakfast???' },
    { from: 'm', text: 'Noooooo' },
    { from: 'n', text: 'Eat knowww' },
    { from: 'n', text: 'Ur in cllge now ?' },
    { from: 'm', text: 'Just now I came' },
    { from: 'n', text: 'Then breakfast who ll eat' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, rotate: 1.8 }}
      animate={{ opacity: 1, y: 0, rotate: 1.8 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="relative max-w-[260px]"
    >
      {/* Tape strips */}
      <div className="absolute -top-3 left-4 w-14 h-5 washi-tape rotate-[-2deg]" />
      <div className="absolute -top-3 right-4 w-14 h-5 washi-tape rotate-[3deg]" />

      {/* Printed screenshot */}
      <div className="bg-[#F9F6F0] border border-charcoal/10 shadow-sm overflow-hidden">
        {/* Date badge */}
        <div className="bg-charcoal/5 text-center py-1.5">
          <span className="text-[9px] tracking-widest uppercase text-charcoal/40">8 February 2026</span>
        </div>

        {/* Messages */}
        <div className="px-3 py-3 space-y-1.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {messages.map((msg, i) => {
            const isNaresh = msg.from === 'n';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 + i * 0.25, duration: 0.4 }}
                className={`flex ${isNaresh ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-2.5 py-1 rounded-lg text-[11px] leading-snug max-w-[75%] ${
                    isNaresh
                      ? 'bg-[#DCF8C6] text-[#111] rounded-tr-sm'
                      : 'bg-white border border-gray-100 text-[#111] rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                  {isNaresh && <span className="ml-1 text-[8px] text-green-600/50">✓✓</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Handwritten annotation beside */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="font-handwriting text-xs text-coffee/50 mt-1.5 text-right mr-1 italic"
      >
        this became every morning ↑
      </motion.p>
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
      {/* Ambient morning light */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FFF9F0]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 flex flex-col justify-between py-8 z-10">

          {/* Top section */}
          <div className="space-y-0">

            {/* Chapter label + date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2 }}
            >
              <p className="font-sans text-xs tracking-[0.38em] uppercase text-brown/40 mb-6">Chapter One</p>
              <p className="font-handwriting text-xl text-coffee/50 mb-10">5 February 2026</p>
            </motion.div>

            {/* Poem — minimal, with lots of breathing space */}
            <div className="space-y-6 max-w-xs">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.4 }}
                className="font-display text-2xl text-charcoal font-light leading-[1.7]"
              >
                Nobody tells you<br />
                the exact moment<br />
                someone slowly becomes<br />
                your favourite person.
              </motion.p>

              {/* Breathing space */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.2 }}
                className="space-y-3"
              >
                <p className="font-quote text-base text-charcoal/60 leading-loose">
                  Maybe it was somewhere between
                </p>
                <p className="font-handwriting text-2xl text-coffee pl-4">
                  "Had breakfast?"
                </p>
                <p className="font-quote text-base text-charcoal/50 pl-2">
                  and
                </p>
                <p className="font-handwriting text-2xl text-coffee pl-4">
                  "Drink water."
                </p>
              </motion.div>
            </div>

            {/* Generous space before the disappearing message card */}
            <div className="mt-12">
              <DisappearingMessagesCard />
            </div>

          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 mt-auto">
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
        <div className="flex-1 md:pl-12 flex flex-col justify-between py-8">

          {/* Top: single sticky note, prominent */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
              className="inline-block"
            >
              <div
                className="bg-[#FEF08A] px-6 py-5 shadow-md"
                style={{ rotate: '-3deg' }}
              >
                <p className="font-letter text-3xl text-charcoal/85">Had breakfast?</p>
              </div>
            </motion.div>

            {/* Annotation below the sticky */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="font-handwriting text-sm text-charcoal/35 italic mt-3 ml-2"
            >
              this was message 1. and 2. and 3.
            </motion.p>
          </div>

          {/* Chat printout — printed + taped style */}
          <div className="mt-8">
            <ChatPrintout />
          </div>

          {/* Meghana's quote — pull quote style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-8 relative"
          >
            <div
              className="bg-[#FEFCE8]/70 border-l-4 border-golden/40 pl-5 pr-4 py-4 shadow-sm"
              style={{ rotate: '0.5deg' }}
            >
              <div className="absolute -top-3 left-6 w-12 h-5 washi-tape" />
              <p className="font-quote text-sm text-charcoal/80 leading-relaxed italic">
                "Even I miss you so much…<br />
                I used to remember yesterday's cute moments<br />
                and blush myself."
              </p>
              <p className="font-handwriting text-sm text-coffee/55 text-right mt-2">— Meghana</p>
            </div>
          </motion.div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1.5 }}
            className="mt-auto pt-8 flex justify-end"
          >
            <p className="font-handwriting text-sm text-charcoal/30 italic">
              Next → Our First Outing
            </p>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
