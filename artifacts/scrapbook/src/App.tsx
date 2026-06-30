import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
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

      {/* Audio Toggle — hidden during closing */}
      {hasStarted && !isClosing && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/80 transition-all text-brown hover:text-coffee"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
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
