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
