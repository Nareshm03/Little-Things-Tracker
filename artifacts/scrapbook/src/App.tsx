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
import Ending from './chapters/Ending';
import NavigationBookmarks from './components/NavigationBookmarks';

export type ChapterProps = {
  onNext: () => void;
  onPrev: () => void;
};

const chapters = [
  { id: 'cover', component: Cover, isDark: false },
  { id: 'dedication', component: Dedication, isDark: false },
  { id: 'before', component: BeforeWeBegin, isDark: false },
  { id: 'ch1', component: ChapterOne, isDark: false },
  { id: 'ch2', component: ChapterTwo, isDark: false },
  { id: 'ch3', component: ChapterThree, isDark: false },
  { id: 'ch4', component: ChapterFour, isDark: false },
  { id: 'ch5', component: ChapterFive, isDark: false },
  { id: 'ch6', component: ChapterSix, isDark: true }, // The Nights We Never Forgot
  { id: 'ch7', component: ChapterSeven, isDark: false },
  { id: 'ending', component: Ending, isDark: false },
];

function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const currentChapter = chapters[currentChapterIndex];
  const CurrentComponent = currentChapter.component;

  const nextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextChapter();
      } else if (e.key === 'ArrowLeft') {
        prevChapter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIndex]);

  // Handle Dark mode class
  useEffect(() => {
    if (currentChapter.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentChapter.isDark]);

  return (
    <div className="min-h-[100dvh] w-full overflow-hidden relative selection:bg-golden selection:text-white">
      
      {/* Audio Toggle */}
      {hasStarted && (
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="fixed top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/80 transition-all text-brown hover:text-coffee"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {/* Navigation Bookmarks */}
      {hasStarted && (
        <NavigationBookmarks 
          chapters={chapters} 
          currentIndex={currentChapterIndex} 
          onSelect={goToChapter} 
        />
      )}

      {/* Chapter Content container */}
      <AnimatePresence mode="wait">
        <CurrentComponent 
          key={currentChapter.id} 
          onNext={() => {
            if (!hasStarted) setHasStarted(true);
            nextChapter();
          }} 
          onPrev={prevChapter} 
        />
      </AnimatePresence>

    </div>
  );
}

export default App;