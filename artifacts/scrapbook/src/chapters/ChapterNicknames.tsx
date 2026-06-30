import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Nickname data ─────────────────────────────────────────────────────────────
const NICKNAMES = [
  {
    word: 'Chinnu',
    meaning: 'her nickname for him · means sweet baby · used from day 1',
    color: '#FFF0E8',
    accent: '#B85C38',
    rotate: -2,
  },
  {
    word: 'Bangara',
    meaning: 'gold / precious · born after sikkina unde · 23 Feb 2026',
    color: '#FFFBEE',
    accent: '#C9973A',
    rotate: 1.5,
  },
  {
    word: 'Gubee',
    meaning: 'appeared May–June · nobody knows where it came from · means everything',
    color: '#F0F8F0',
    accent: '#6B8F6B',
    rotate: -1,
  },
  {
    word: 'Muddu',
    meaning: 'Kannada for cute / kiss · both used it constantly',
    color: '#FFF0F2',
    accent: '#C06070',
    rotate: 2,
  },
  {
    word: 'Kanmani',
    meaning: 'Tamil · eye of my heart · his name for her',
    color: '#EEF4FF',
    accent: '#5C7EC9',
    rotate: -1.5,
  },
  {
    word: 'Pookie',
    meaning: 'from the hands photo together · 🫶 · mwah',
    color: '#FFF8F5',
    accent: '#B85C38',
    rotate: 1,
  },
];

// ─── Washi tape strip ─────────────────────────────────────────────────────────
function WashiTape({ rotate = -1.5 }: { rotate?: number }) {
  return (
    <div
      className="absolute -top-2.5 left-1/2 z-10 w-9 h-4"
      style={{
        backgroundColor: 'rgba(201,151,58,0.42)',
        transform: `translateX(-50%) rotate(${rotate}deg)`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Single nickname card ──────────────────────────────────────────────────────
function NicknameCard({
  word, meaning, color, accent, rotate, delay,
}: (typeof NICKNAMES)[0] & { delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate }}
      animate={{ opacity: 1, y: 0, rotate: hovered ? 0 : rotate }}
      transition={{ delay, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative"
    >
      <WashiTape rotate={rotate * 0.4} />
      <div
        className="pt-5 pb-4 px-4 border border-charcoal/8 shadow-sm transition-shadow duration-300"
        style={{
          backgroundColor: color,
          borderTop: `3px solid ${accent}`,
          boxShadow: hovered
            ? '0 12px 32px rgba(0,0,0,0.12)'
            : '0 4px 16px rgba(0,0,0,0.07)',
        }}
      >
        <p
          className="font-handwriting text-[1.55rem] mb-2 leading-none"
          style={{ color: accent }}
        >
          {word}
        </p>
        <p className="font-letter text-[11px] text-charcoal/52 leading-relaxed">
          {meaning}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Ink rule ─────────────────────────────────────────────────────────────────
function InkRule({ delay }: { delay: number }) {
  return (
    <motion.svg className="w-20 h-3" viewBox="0 0 100 10" aria-hidden="true">
      <motion.path
        d="M 2 6 C 25 3, 50 8, 75 5 S 92 7, 98 5"
        fill="none" stroke="#6F4E37" strokeWidth="1.2" strokeLinecap="round"
        opacity={0.28}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

// ─── Chapter Nicknames ─────────────────────────────────────────────────────────
export default function ChapterNicknames({ onNext, onPrev }: ChapterProps) {
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit:    { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF5E8 0%, #FDE8D0 100%)' }}
      variants={slideVariants}
      initial="initial" animate="animate" exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      aria-label="Names Only We Know"
    >
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Warm glow top-right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(201,151,58,0.08) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto min-h-full flex flex-col px-6 md:px-12 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mb-8"
        >
          <p className="font-sans text-[9px] tracking-[0.42em] uppercase text-[#8B6020]/36 mb-2">
            our language
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-[#7C4A10] leading-tight">
            Names Only <em>We</em> Know
          </h2>
          <motion.svg className="w-44 h-4 mt-2" viewBox="0 0 180 12" aria-hidden="true">
            <motion.path
              d="M0 7 Q45 3 90 7 Q135 11 180 6"
              fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, delay: 0.6 }}
            />
          </motion.svg>
        </motion.div>

        {/* Intro line */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="font-quote text-base text-charcoal/48 italic mb-8 max-w-sm leading-relaxed"
        >
          Every relationship builds its own vocabulary.<br />
          Ours started with a sweet dish from Kundapur.
        </motion.p>

        {/* 3 × 2 cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {NICKNAMES.map((n, i) => (
            <NicknameCard key={n.word} {...n} delay={0.7 + i * 0.18} />
          ))}
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1.4 }}
          className="flex flex-col gap-1.5 mt-auto pt-4"
        >
          <InkRule delay={2.0} />
          <p className="font-handwriting text-base text-coffee/38 italic mt-1 leading-relaxed">
            Some words exist in exactly one conversation in the world.<br />
            These are ours.
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 mt-6">
          <button
            onClick={onPrev}
            className="font-handwriting text-xl text-[#8B6020]/50 hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2"
            aria-label="Previous chapter"
          >← back</button>
          <button
            onClick={onNext}
            className="font-handwriting text-xl text-[#E8924A] hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2"
            aria-label="Next chapter"
          >next chapter →</button>
        </div>

      </div>
    </motion.div>
  );
}
