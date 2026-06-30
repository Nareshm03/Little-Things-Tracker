import React from 'react';
import { motion } from 'framer-motion';
import { ChapterProps } from '../App';

// ─── Types ─────────────────────────────────────────────────────────────────────
type PieceSize = 'xl' | 'lg' | 'md' | 'sm';
type AnnotationSide = 'below-right' | 'below-left';

interface Piece {
  word: string;
  memory: string;
  annotation?: string;
  annotationSide?: AnnotationSide;
  size: PieceSize;
  top: string;
  left: string;
  rotate: number;
  tape: { rotate: number; left: string };
  accent: string;
  bg: string;
  delay: number;
}

// ─── Board pieces ──────────────────────────────────────────────────────────────
// Size controls the word's visual weight on the board.
// top / left are percentages of the board container.
// "memory" replaces dictionary definitions — a fragment, a moment, a feeling.

const PIECES: Piece[] = [
  {
    word: 'Bangara',
    memory: 'From that day...\nyou never called me\nanything else.',
    annotation: 'Sikkina Unde. 23 Feb.',
    annotationSide: 'below-right' as const,
    size: 'xl' as const,
    top: '5%', left: '4%',
    rotate: -2.5,
    tape: { rotate: -3, left: '22%' },
    accent: '#B8860B',
    bg: '#FFFDE7',
    delay: 0.35,
  },
  {
    word: 'Chinnu',
    memory: 'Still the first word\nevery morning.',
    size: 'lg' as const,
    top: '4%', left: '54%',
    rotate: 1.8,
    tape: { rotate: 2, left: '55%' },
    accent: '#8B3A2A',
    bg: '#FFF4EE',
    delay: 0.65,
  },
  {
    word: 'Muddu',
    memory: 'Both of you.\nConstantly.\nFor everything.',
    size: 'md' as const,
    top: '42%', left: '24%',
    rotate: -1.2,
    tape: { rotate: -4, left: '35%' },
    accent: '#9B3A4A',
    bg: '#FFF0F2',
    delay: 0.95,
  },
  {
    word: 'Kanmani',
    memory: 'Tamil.\nEye of my heart.',
    size: 'sm' as const,
    top: '34%', left: '63%',
    rotate: 2.5,
    tape: { rotate: 3, left: '45%' },
    accent: '#3A5C8B',
    bg: '#EEF4FF',
    delay: 1.25,
  },
  {
    word: 'Gubee',
    memory: '"Nooooo gubeeeeee 😂"\n\nNobody knows\nwhere it came from.',
    size: 'sm' as const,
    top: '60%', left: '4%',
    rotate: -3.5,
    tape: { rotate: -2, left: '30%' },
    accent: '#3A6B3A',
    bg: '#F0F8F0',
    delay: 1.55,
  },
  {
    word: 'Pookie',
    memory: '🫶\n\nmwah.',
    annotation: 'from the hands photo',
    annotationSide: 'below-left' as const,
    size: 'sm' as const,
    top: '57%', left: '62%',
    rotate: 1.2,
    tape: { rotate: 5, left: '65%' },
    accent: '#8B3A5C',
    bg: '#FFF5F8',
    delay: 1.85,
  },
] as const;

// ─── Size maps ─────────────────────────────────────────────────────────────────
const WORD_SIZE = {
  xl: 'text-[2.6rem]',
  lg: 'text-[2rem]',
  md: 'text-[1.5rem]',
  sm: 'text-[1.15rem]',
};
const CARD_WIDTH = {
  xl: '220px',
  lg: '185px',
  md: '160px',
  sm: '148px',
};
const MEMORY_SIZE = {
  xl: 'text-[12px]',
  lg: 'text-[11.5px]',
  md: 'text-[11px]',
  sm: 'text-[10.5px]',
};

// ─── Washi tape strip ─────────────────────────────────────────────────────────
function WashiTape({ rotate, left }: { rotate: number; left: string }) {
  return (
    <div
      className="absolute z-10 h-[18px]"
      style={{
        width: '52px',
        top: '-9px',
        left,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: 'rgba(201,168,76,0.38)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Ink squiggle divider ──────────────────────────────────────────────────────
function InkSquiggle({ delay }: { delay: number }) {
  return (
    <motion.svg width="48" height="8" viewBox="0 0 48 8" aria-hidden="true" className="mt-1.5 mb-0.5">
      <motion.path
        d="M2 5 C8 2, 14 7, 20 4 S34 2, 46 5"
        fill="none" stroke="#6F4E37" strokeWidth="1" strokeLinecap="round"
        opacity={0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

// ─── Single nickname paper ─────────────────────────────────────────────────────
function NicknamePaper({
  word, memory, annotation, annotationSide,
  size, top, left, rotate, tape, accent, bg, delay,
}: Piece) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: rotate - 4 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay, duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute"
      style={{ top, left, width: CARD_WIDTH[size], zIndex: size === 'xl' ? 4 : size === 'lg' ? 3 : 2 }}
    >
      <div className="relative">
        <WashiTape rotate={tape.rotate} left={tape.left} />
        <div
          className="pt-5 pb-4 px-4 border border-charcoal/8 shadow-sm"
          style={{
            backgroundColor: bg,
            boxShadow: '2px 4px 18px rgba(0,0,0,0.09)',
          }}
        >
          {/* The nickname — handwriting, sized by importance */}
          <p
            className={`font-handwriting ${WORD_SIZE[size]} leading-none mb-2`}
            style={{ color: accent }}
          >
            {word}
          </p>

          {/* The memory, not the definition */}
          <p
            className={`font-letter ${MEMORY_SIZE[size]} text-charcoal/52 leading-relaxed whitespace-pre-line`}
          >
            {memory}
          </p>
        </div>

        {/* Tiny annotation — like a pencilled note added later */}
        {annotation && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.9, duration: 1 }}
            className="font-handwriting text-[9.5px] text-charcoal/32 italic absolute whitespace-nowrap"
            style={
              annotationSide === 'below-right'
                ? { bottom: '-18px', right: '0px' }
                : { bottom: '-18px', left: '0px' }
            }
          >
            {annotation}
          </motion.p>
        )}
      </div>
    </motion.div>
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

      {/* Warm glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(201,151,58,0.07) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto min-h-full flex flex-col px-6 md:px-12 py-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 1 }}
          className="mb-4 flex-shrink-0"
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
              transition={{ duration: 1.3, delay: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        {/* ── Subtitle — intimate, not descriptive ── */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="font-quote text-base text-charcoal/42 italic mb-10 max-w-xs leading-relaxed flex-shrink-0"
        >
          Some words only make sense<br />
          to two people.
        </motion.p>

        {/* ── Scattered board ── */}
        {/* Board is relative-positioned; pieces are absolute within it */}
        <div className="relative flex-1" style={{ minHeight: '620px' }}>
          {PIECES.map((piece) => (
            <NicknamePaper key={piece.word} {...piece} />
          ))}

          {/* Tiny hidden detail: small heart near Muddu, barely visible */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.8 }}
            className="absolute font-handwriting text-[11px] text-[#9B3A4A]/22 select-none pointer-events-none"
            style={{ top: '53%', left: '34%', rotate: '-8deg' } as React.CSSProperties}
            aria-hidden="true"
          >
            ♡
          </motion.p>

          {/* Tiny hidden detail: pencil note near Gubee */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1.8 }}
            className="absolute font-handwriting text-[9px] text-charcoal/20 italic select-none pointer-events-none"
            style={{ top: '74%', left: '18%' }}
            aria-hidden="true"
          >
            appeared May–June
          </motion.p>
        </div>

        {/* ── Closing note ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.4 }}
          className="flex flex-col gap-1 pt-8 flex-shrink-0"
        >
          <InkSquiggle delay={2.3} />
          <p className="font-handwriting text-base text-coffee/35 italic mt-1 leading-relaxed">
            Some words exist in exactly one conversation in the world.
          </p>
        </motion.div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between pt-8 mt-4 flex-shrink-0">
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
