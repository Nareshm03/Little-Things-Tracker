import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

  const currentChapter = chapters[currentChapterIndex];
  const CurrentComponent = currentChapter.component;
  const isLastChapter = currentChapterIndex === chapters.length - 1;

  const nextChapter = () => {
    if (isLastChapter) {
      setIsClosing(true);
    } else if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  const goToChapter = (index: number) => {
    if (index >= 0 && index < chapters.length) {
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

      {/* Audio Toggle — vintage paper-tab style */}
      {hasStarted && !isClosing && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="fixed top-0 right-8 z-50 flex flex-col items-center pt-1 pb-2 px-3 bg-warm-white/80 border border-t-0 border-sandstone/30 shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:bg-warm-white transition-colors duration-300"
          style={{ borderRadius: '0 0 4px 4px' }}
        >
          {/* Vintage speaker SVG */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brown/60 mt-1" aria-hidden="true">
            {/* Speaker body */}
            <path d="M4 7H2a1 1 0 00-1 1v4a1 1 0 001 1h2l5 4V3L4 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* Sound waves — shown when unmuted */}
            {!isMuted && <>
              <path d="M13 7.5a3.5 3.5 0 010 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M15.5 5.5a6.5 6.5 0 010 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" fill="none"/>
            </>}
            {/* X mark — shown when muted */}
            {isMuted && <>
              <line x1="13" y1="7" x2="17" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="17" y1="7" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </>}
          </svg>
          <span className="font-handwriting text-[9px] text-brown/40 leading-none mt-0.5">
            {isMuted ? 'sound' : 'sound'}
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

      {/* Chapter content */}
      <AnimatePresence mode="wait">
        {!isClosing && (
          <CurrentComponent
            key={currentChapter.id}
            onNext={() => {
              if (!hasStarted) setHasStarted(true);
              nextChapter();
            }}
            onPrev={prevChapter}
          />
        )}
      </AnimatePresence>

      {/* Closing sequence — layered on top */}
      <AnimatePresence>
        {isClosing && (
          <ClosingSequence key="closing" onReadAgain={handleReadAgain} />
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
