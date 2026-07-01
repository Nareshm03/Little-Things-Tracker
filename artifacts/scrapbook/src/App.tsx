import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Cover from './chapters/Cover';
import Dedication from './chapters/Dedication';
import BeforeWeBegin from './chapters/BeforeWeBegin';
import ChapterOne from './chapters/ChapterOne';
import ChapterTwo from './chapters/ChapterTwo';
import ChapterThree from './chapters/ChapterThree';
import ChapterFour from './chapters/ChapterFour';
import ChapterFive from './chapters/ChapterFive';
import ChapterSix from './chapters/ChapterSix';
import ChapterSeven from './chapters/ChapterSeven';
import ChapterNicknames from './chapters/ChapterNicknames';
import ChapterFuture from './chapters/ChapterFuture';
import ChapterEpilogue from './chapters/ChapterEpilogue';
import ClosingSequence from './chapters/ClosingSequence';
import NavigationBookmarks from './components/NavigationBookmarks';

export type ChapterProps = {
  onNext: () => void;
  onPrev: () => void;
};

// ─── Page-turn wrapper variants ───────────────────────────────────────────────
// Adds a 3-D rotateY tilt on top of each chapter's own x-slide.
// The chapters handle the horizontal movement; this wrapper adds the book-page
// rotation so it feels like turning a physical page rather than scrolling divs.
// We deliberately omit 'x' here to avoid doubling the slide distance.
const pageTurnVariants = {
  enter: (dir: number) => ({
    rotateY: dir > 0 ? 14 : -14,
    scale: 0.97,
    opacity: 0,
    transformPerspective: 1400,
  }),
  center: {
    rotateY: 0,
    scale: 1,
    opacity: 1,
    transformPerspective: 1400,
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -14 : 14,
    scale: 0.97,
    opacity: 0,
    transformPerspective: 1400,
  }),
};

// ─── Mouse-reactive paper-curl corner ─────────────────────────────────────────
function PageCurlCorner({ visible }: { visible: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [nearCorner, setNearCorner] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible || shouldReduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const dx = window.innerWidth  - e.clientX;
        const dy = window.innerHeight - e.clientY;
        setNearCorner(Math.sqrt(dx * dx + dy * dy) < 110);
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, shouldReduceMotion]);

  if (!visible || shouldReduceMotion) return null;

  return (
    <div
      className="fixed bottom-0 right-0 z-40 pointer-events-none"
      style={{ width: 64, height: 64 }}
      aria-hidden="true"
    >
      {/* Shadow cast by curling page */}
      <motion.div
        className="absolute bottom-0 right-0"
        style={{
          width: nearCorner ? 52 : 28,
          height: nearCorner ? 52 : 28,
          background: 'radial-gradient(circle at bottom right, rgba(0,0,0,0.08) 0%, transparent 70%)',
          borderRadius: '50% 0 0 0',
          filter: 'blur(4px)',
        }}
        animate={{ width: nearCorner ? 52 : 28, height: nearCorner ? 52 : 28 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Curled corner */}
      <motion.div
        className="absolute bottom-0 right-0"
        style={{ transformOrigin: 'bottom right' }}
        animate={{
          scale: nearCorner ? 1.45 : 1,
          rotate: nearCorner ? -4 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="curlG" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D8CCBA" />
              <stop offset="60%" stopColor="#C8B89A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#B8A888" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M 32 0 L 32 32 L 0 32 Z" fill="url(#curlG)" />
          <path d="M 32 6 L 32 32 L 6 32 Z" fill="rgba(255,255,255,0.14)" />
        </svg>
      </motion.div>
    </div>
  );
}

const chapters = [
  { id: 'cover',      component: Cover,           isDark: false },
  { id: 'dedication', component: Dedication,       isDark: false },
  { id: 'before',     component: BeforeWeBegin,    isDark: false },
  { id: 'ch1',        component: ChapterOne,       isDark: false },
  { id: 'nicknames',  component: ChapterNicknames, isDark: false },
  { id: 'ch2',        component: ChapterTwo,       isDark: false },
  { id: 'ch3',        component: ChapterThree,     isDark: false },
  { id: 'ch4',        component: ChapterFour,      isDark: false },
  { id: 'ch5',        component: ChapterFive,      isDark: false },
  { id: 'ch6',        component: ChapterSix,       isDark: false },
  { id: 'ch7',        component: ChapterSeven,     isDark: false },
  { id: 'future',     component: ChapterFuture,    isDark: false },
  { id: 'epilogue',   component: ChapterEpilogue,  isDark: false },
];

function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const shouldReduceMotion = useReducedMotion();

  const currentChapter = chapters[currentChapterIndex];
  const CurrentComponent = currentChapter.component;
  const isLastChapter = currentChapterIndex === chapters.length - 1;

  const nextChapter = () => {
    setDirection(1);
    if (isLastChapter) {
      setIsClosing(true);
    } else if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    }
  };

  const prevChapter = () => {
    setDirection(-1);
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  const goToChapter = (index: number) => {
    if (index >= 0 && index < chapters.length && index !== currentChapterIndex) {
      setDirection(index > currentChapterIndex ? 1 : -1);
      setCurrentChapterIndex(index);
    }
  };

  const handleReadAgain = () => {
    setIsClosing(false);
    setCurrentChapterIndex(0);
    setHasStarted(false);
  };

  // Keyboard navigation — disabled during closing sequence
  useEffect(() => {
    if (isClosing) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire if user is interacting with an input or modal
      if ((e.target as HTMLElement).closest('[role="dialog"]')) return;
      if (e.key === 'ArrowRight') nextChapter();
      else if (e.key === 'ArrowLeft') prevChapter();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIndex, isClosing]);

  // Handle dark mode class
  useEffect(() => {
    if (isClosing) {
      document.documentElement.classList.remove('dark');
      return;
    }
    if (currentChapter.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentChapter.isDark, isClosing]);

  return (
    <div className="min-h-[100dvh] w-full overflow-hidden relative selection:bg-golden selection:text-white">

      {/* Audio Toggle — looks like a handwritten corner note */}
      {hasStarted && !isClosing && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="fixed top-5 right-5 z-50 group flex flex-col items-center gap-0.5 opacity-30 hover:opacity-60 transition-opacity duration-500"
        >
          {/* Minimal hand-drawn speaker */}
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="text-brown" aria-hidden="true"
            style={{ filter: 'url(#rough)' }}>
            <defs>
              <feTurbulence id="turb" type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.6" xChannelSelector="R" yChannelSelector="G"/>
            </defs>
            <path d="M4 7.5H2.5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5H4l4.5 3.5V4L4 7.5z"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="rgba(111,78,55,0.08)"/>
            {!isMuted ? (
              <>
                <path d="M12.5 8a2.5 2.5 0 010 4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
                <path d="M14.5 6a5.5 5.5 0 010 8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.55"/>
              </>
            ) : (
              <>
                <line x1="13" y1="8" x2="16.5" y2="12" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
                <line x1="16.5" y1="8" x2="13" y2="12" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
              </>
            )}
          </svg>
          {/* Tiny handwritten label */}
          <span className="font-handwriting text-[8px] text-brown/70 leading-none tracking-wide">
            {isMuted ? 'muted' : 'on'}
          </span>
        </button>
      )}

      {/* Navigation Bookmarks — hidden during closing */}
      {hasStarted && !isClosing && (
        <NavigationBookmarks
          chapters={chapters}
          currentIndex={currentChapterIndex}
          onSelect={goToChapter}
        />
      )}

      {/* Chapter content — wrapped in direction-aware page-turn transition */}
      <AnimatePresence mode="wait" custom={direction}>
        {!isClosing && (
          <motion.div
            key={currentChapter.id}
            className="absolute inset-0"
            custom={direction}
            variants={shouldReduceMotion ? undefined : pageTurnVariants}
            initial={shouldReduceMotion ? { opacity: 0 } : 'enter'}
            animate={shouldReduceMotion ? { opacity: 1 } : 'center'}
            exit={shouldReduceMotion ? { opacity: 0 } : 'exit'}
            transition={shouldReduceMotion
              ? { duration: 0.25 }
              : { duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
          >
            <CurrentComponent
              onNext={() => {
                if (!hasStarted) setHasStarted(true);
                nextChapter();
              }}
              onPrev={prevChapter}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closing sequence — layered on top */}
      <AnimatePresence>
        {isClosing && (
          <ClosingSequence key="closing" onReadAgain={handleReadAgain} />
        )}
      </AnimatePresence>

      {/* Paper curl corner — micro-detail, appears once in the scrapbook */}
      <PageCurlCorner visible={hasStarted && !isClosing} />

    </div>
  );
}

export default App;
