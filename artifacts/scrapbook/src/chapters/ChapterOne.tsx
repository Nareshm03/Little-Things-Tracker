import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Tiny place doodles ───────────────────────────────────────────────────────

function HopeFarmDoodle() {
  return (
    <svg width="56" height="58" viewBox="0 0 56 58" fill="none" aria-hidden="true">
      <line x1="4" y1="46" x2="52" y2="46" stroke="#7C6A4F" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="25" y="34" width="5" height="12" rx="1.5" fill="#9E7B4E" />
      <ellipse cx="28" cy="27" rx="12" ry="10" fill="#8BAF72" />
      <ellipse cx="18" cy="30" rx="8" ry="7" fill="#7A9C63" />
      <ellipse cx="38" cy="30" rx="8" ry="7" fill="#7A9C63" />
      <text x="28" y="54" textAnchor="middle" fontSize="6.5" fill="#7C6A4F" fontFamily="Georgia, serif">Hope Farm</text>
    </svg>
  );
}

function CollegeGateDoodle() {
  return (
    <svg width="58" height="60" viewBox="0 0 58 60" fill="none" aria-hidden="true">
      <rect x="7" y="18" width="9" height="30" rx="2" fill="#C4B49A" />
      <rect x="42" y="18" width="9" height="30" rx="2" fill="#C4B49A" />
      <rect x="5" y="12" width="13" height="7" rx="2" fill="#A89278" />
      <rect x="40" y="12" width="13" height="7" rx="2" fill="#A89278" />
      <circle cx="11.5" cy="11" r="3" fill="#A89278" />
      <circle cx="46.5" cy="11" r="3" fill="#A89278" />
      {[18, 24, 30, 36].map(x => (
        <rect key={x} x={x} y="26" width="2" height="22" rx="1" fill="#7C6A4F" />
      ))}
      <path d="M 16 26 Q 29 16 42 26" stroke="#A89278" strokeWidth="1.5" fill="none" />
      <line x1="0" y1="48" x2="58" y2="48" stroke="#7C6A4F" strokeWidth="1" strokeLinecap="round" />
      <text x="29" y="56" textAnchor="middle" fontSize="6.5" fill="#7C6A4F" fontFamily="Georgia, serif">College Gate</text>
    </svg>
  );
}

function CanteenDoodle() {
  return (
    <svg width="62" height="58" viewBox="0 0 62 58" fill="none" aria-hidden="true">
      <rect x="9" y="22" width="44" height="24" rx="2" fill="#EDE3D8" />
      <polygon points="4,22 31,9 58,22" fill="#C4A882" />
      <rect x="25" y="32" width="12" height="14" rx="1" fill="#A89278" />
      <rect x="12" y="26" width="10" height="8" rx="1" fill="#B8D4E8" />
      <rect x="40" y="26" width="10" height="8" rx="1" fill="#B8D4E8" />
      <rect x="17" y="17" width="28" height="6" rx="1" fill="#A89278" />
      <text x="31" y="22" textAnchor="middle" fontSize="4.5" fill="#FFF8F0" fontFamily="Georgia, serif">CANTEEN</text>
      <line x1="2" y1="46" x2="60" y2="46" stroke="#7C6A4F" strokeWidth="1" strokeLinecap="round" />
      <text x="31" y="54" textAnchor="middle" fontSize="6.5" fill="#7C6A4F" fontFamily="Georgia, serif">Canteen</text>
    </svg>
  );
}

function BusStopDoodle() {
  return (
    <svg width="56" height="60" viewBox="0 0 56 60" fill="none" aria-hidden="true">
      <rect x="4" y="15" width="48" height="4" rx="2" fill="#C4B49A" />
      <rect x="7" y="18" width="4" height="28" rx="1" fill="#A89278" />
      <rect x="11" y="18" width="18" height="20" rx="1" fill="#EDE3D8" opacity="0.9" />
      <rect x="7" y="40" width="38" height="4" rx="2" fill="#C4B49A" />
      <rect x="10" y="44" width="3" height="5" rx="1" fill="#A89278" />
      <rect x="30" y="44" width="3" height="5" rx="1" fill="#A89278" />
      <rect x="42" y="13" width="3" height="33" rx="1" fill="#A89278" />
      <rect x="36" y="7" width="16" height="9" rx="2" fill="#5B8A6E" />
      <text x="44" y="14" textAnchor="middle" fontSize="5" fill="white" fontFamily="Georgia, serif">BUS</text>
      <line x1="0" y1="49" x2="56" y2="49" stroke="#7C6A4F" strokeWidth="1" strokeLinecap="round" />
      <text x="28" y="57" textAnchor="middle" fontSize="6.5" fill="#7C6A4F" fontFamily="Georgia, serif">Bus Stop</text>
    </svg>
  );
}

function PhotoGroupDoodle() {
  return (
    <svg width="54" height="60" viewBox="0 0 54 60" fill="none" aria-hidden="true">
      <rect x="11" y="6" width="32" height="48" rx="5" fill="#3D3D3D" />
      <rect x="13" y="11" width="28" height="38" rx="2" fill="#B8D4E8" />
      <rect x="17" y="14" width="20" height="14" rx="2" fill="#FFF8F0" />
      <circle cx="27" cy="21" r="4" fill="#8AAFC4" />
      <circle cx="27" cy="21" r="2" fill="#4A7FA5" />
      <rect x="17" y="30" width="9" height="9" rx="1" fill="#E8D5C4" />
      <rect x="28" y="30" width="9" height="9" rx="1" fill="#D4E8D0" />
      <circle cx="27" cy="7" r="2" fill="#5A5A5A" />
      <text x="27" y="56" textAnchor="middle" fontSize="6.5" fill="#7C6A4F" fontFamily="Georgia, serif">Our Album</text>
    </svg>
  );
}

// ─── Sticky note ──────────────────────────────────────────────────────────────

function StickyNote({ text, bg, rotate, delay, top, left, right }: {
  text: string; bg: string; rotate: number; delay: number;
  top?: string; left?: string; right?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, rotate: rotate - 4 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay, duration: 0.65, ease: 'easeOut' }}
      className="absolute px-3 py-2.5 shadow-md min-w-[96px]"
      style={{ backgroundColor: bg, top, left, right }}
    >
      <p className="font-letter text-base text-charcoal/90 leading-snug whitespace-pre-line">{text}</p>
    </motion.div>
  );
}

// ─── WhatsApp chat bubble ──────────────────────────────────────────────────────

function ChatBubble({ text, from, delay }: { text: string; from: 'n' | 'm'; delay: number }) {
  const isNaresh = from === 'n';
  return (
    <motion.div
      initial={{ opacity: 0, x: isNaresh ? 12 : -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className={`flex ${isNaresh ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`px-3 py-1.5 rounded-xl text-sm leading-snug max-w-[80%] shadow-sm ${
          isNaresh
            ? 'bg-[#D9FDD3] text-[#111] rounded-tr-sm'
            : 'bg-white text-[#111] rounded-tl-sm border border-gray-100'
        }`}
      >
        {text}
        <span className={`block text-[9px] mt-0.5 text-right ${isNaresh ? 'text-green-700/50' : 'text-gray-400'}`}>
          {isNaresh ? '✓✓' : ''}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Chapter One ──────────────────────────────────────────────────────────────

export default function ChapterOne({ onNext, onPrev }: ChapterProps) {
  const [easterEggRevealed, setEasterEggRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
      {/* Soft morning light wash */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#FFF9F0]/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-1/3 bg-gradient-to-bl from-[#FEF4E4]/40 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto h-full p-6 md:p-12 flex flex-col md:flex-row gap-0 min-h-full">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-10 flex flex-col gap-6 pb-8 md:pb-0 z-10">

          {/* Chapter label */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="pt-4"
          >
            <p className="font-sans text-xs tracking-[0.38em] uppercase text-brown/50 mb-1">Chapter One</p>
            <p className="font-handwriting text-base text-coffee/60 mb-0.5">February 2026</p>
            <h2 className="font-display text-4xl md:text-5xl text-coffee leading-tight font-light">
              Where It All Began
            </h2>
            {/* Decorative pen-stroke underline */}
            <motion.svg className="w-52 h-4 mt-1" viewBox="0 0 210 14" aria-hidden="true">
              <motion.path
                d="M 0 9 C 50 4, 100 13, 150 7 S 190 11, 210 8"
                fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
              />
            </motion.svg>
          </motion.div>

          {/* Introduction */}
          <motion.div
            className="space-y-3 max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.2 }}
          >
            <p className="font-quote text-base text-charcoal/80 leading-relaxed">
              Nobody tells you the exact moment someone slowly becomes your favourite person.
            </p>
            <p className="font-quote text-base text-charcoal/80 leading-relaxed">
              Maybe it was somewhere between a simple "Good morning," a worried "Had breakfast?", and waiting for each other's replies a little longer than we wanted to admit.
            </p>
            <p className="font-quote text-base text-charcoal/75 leading-relaxed italic">
              This chapter isn't about grand moments. It's about the smallest conversations that quietly became our everyday life.
            </p>
          </motion.div>

          {/* ── WhatsApp conversation ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="max-w-xs"
          >
            {/* Phone chrome */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200/60" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {/* WhatsApp header */}
              <div className="bg-[#128C7E] px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFF8F0] flex items-center justify-center text-xs font-bold text-[#128C7E]">M</div>
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Meghana</p>
                  <p className="text-green-200 text-[9px] leading-none mt-0.5">online</p>
                </div>
              </div>
              {/* Chat background */}
              <div
                className="px-2 py-3 space-y-1.5"
                style={{ backgroundColor: '#E5DDD5', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8bfb8' fill-opacity='0.25'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20Z'/%3E%3C/g%3E%3C/svg%3E\")" }}
              >
                {/* Date stamp */}
                <div className="flex justify-center">
                  <span className="bg-[#E2D5CB] text-[#7A6657] text-[9px] px-2 py-0.5 rounded-full">8 February 2026</span>
                </div>
                <ChatBubble text="Had breakfast???" from="n" delay={1.7} />
                <ChatBubble text="Noooooo" from="m" delay={2.0} />
                <ChatBubble text="Eat knowww" from="n" delay={2.3} />
                <ChatBubble text="Ur in cllge now ?" from="n" delay={2.5} />
                <ChatBubble text="Just now I came" from="m" delay={2.8} />
                <ChatBubble text="Then breakfast who ll eat" from="n" delay={3.1} />
              </div>
            </div>
          </motion.div>

          {/* Spacer grows to push things down */}
          <div className="flex-1" />

          {/* ── Hidden Easter Egg ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1.5 }}
            className="relative"
          >
            <button
              onClick={() => setEasterEggRevealed(v => !v)}
              className="font-handwriting text-sm text-charcoal/30 hover:text-coffee/60 transition-colors duration-500 cursor-pointer bg-transparent border-none p-0 underline underline-offset-4 decoration-dotted"
              aria-label="Reveal hidden memory"
            >
              Turn back and see.
            </button>

            <AnimatePresence>
              {easterEggRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10, rotate: -3 }}
                  animate={{ opacity: 1, y: -8, rotate: -3 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-8 left-0 bg-[#FEFCE8] p-4 shadow-lg w-56 z-20"
                >
                  <div className="absolute -top-2 left-6 w-10 h-4 washi-tape rotate-[1deg]" />
                  <p className="font-handwriting text-base text-charcoal/80 leading-snug">
                    The first photo we saved together — the one that started our album. 📸
                  </p>
                  <p className="font-handwriting text-xs text-coffee/50 mt-2 text-right">Feb 2026</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setEasterEggRevealed(false); }}
                    className="absolute top-1 right-2 text-charcoal/30 hover:text-charcoal/60 text-xs bg-transparent border-none cursor-pointer"
                    aria-label="Close"
                  >✕</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onPrev}
              className="font-sans text-xs text-charcoal/40 hover:text-coffee transition-colors tracking-widest uppercase"
            >
              ← Before We Begin
            </button>
            <button
              onClick={onNext}
              className="font-sans text-xs text-charcoal/50 hover:text-coffee transition-colors tracking-widest uppercase"
            >
              Next →
            </button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE ═══════════ */}
        <div className="flex-1 md:pl-10 relative flex flex-col gap-8 min-h-[60vh]">

          {/* ── Sticky notes cluster ── */}
          <div className="relative h-72 md:h-80 mt-6">
            <StickyNote text="Had breakfast?" bg="#FEF08A" rotate={-4}  delay={1.2} top="0"    left="0" />
            <StickyNote text="Drink water."   bg="#BAE6FD" rotate={3}   delay={1.5} top="10px"  left="160px" />
            <StickyNote text="Ride safe."     bg="#FBCFE8" rotate={-2}  delay={1.8} top="80px"  left="30px" />
            <StickyNote text="Reached home?"  bg="#D9F99D" rotate={5}   delay={2.1} top="90px"  left="190px" />
            <StickyNote text={"Sleep early\ntoday."} bg="#DDD6FE" rotate={-3} delay={2.4} top="170px" left="10px" />
            <StickyNote text="Good boy 🥺"    bg="#FED7AA" rotate={4}   delay={2.7} top="175px" left="175px" />
          </div>

          {/* ── Place doodles ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="flex flex-wrap gap-4 items-end justify-center px-4"
          >
            {shouldReduceMotion ? null : (
              <>
                <motion.div whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <HopeFarmDoodle />
                </motion.div>
                <motion.div whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <CollegeGateDoodle />
                </motion.div>
                <motion.div whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <CanteenDoodle />
                </motion.div>
                <motion.div whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <BusStopDoodle />
                </motion.div>
                <motion.div whileHover={{ scale: 1.12 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <PhotoGroupDoodle />
                </motion.div>
              </>
            )}
            {shouldReduceMotion && (
              <>
                <HopeFarmDoodle />
                <CollegeGateDoodle />
                <CanteenDoodle />
                <BusStopDoodle />
                <PhotoGroupDoodle />
              </>
            )}
          </motion.div>

          {/* ── Meghana's quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="relative bg-[#FEFCE8]/80 border-l-4 border-golden/50 pl-5 pr-4 py-4 mx-2 shadow-sm"
            style={{ rotate: '0.5deg' }}
          >
            <div className="absolute -top-3 left-8 w-12 h-5 washi-tape" />
            <p className="font-quote text-base text-charcoal/85 leading-relaxed italic">
              "Even I miss you so much…<br />
              I used to remember yesterday's cute moments and blush myself."
            </p>
            <p className="font-handwriting text-sm text-coffee/60 text-right mt-2">— Meghana</p>
          </motion.div>

          {/* ── Page turn hint ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1.5 }}
            className="mt-auto flex items-center justify-end gap-2 pr-2 pb-2"
          >
            <span className="font-handwriting text-sm text-charcoal/35 italic">Next →</span>
            <span className="font-handwriting text-sm text-coffee/50 italic">Our First Outing</span>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
