import React, { useState, useEffect, useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChapterProps } from '../App';

// Inline pressed-flower SVG — dried marigold/cosmo, no filter background bleed
function PressedFlower() {
  const uid = useId().replace(/:/g, '');
  const outerAngles = [0,30,60,90,120,150,180,210,240,270,300,330];
  const innerAngles = [15,45,75,105,135,165,195,225,255,285,315,345];
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-28 h-28"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
    >
      <defs>
        <radialGradient id={`pg-a-${uid}`} cx="50%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#EDD08A" />
          <stop offset="55%" stopColor="#C98D30" />
          <stop offset="100%" stopColor="#7A5018" stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id={`pg-b-${uid}`} cx="50%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#E0BC6A" />
          <stop offset="55%" stopColor="#B87820" />
          <stop offset="100%" stopColor="#6B4010" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id={`pg-c-${uid}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#4A2808" />
          <stop offset="100%" stopColor="#1E0E02" />
        </radialGradient>
      </defs>

      {/* Outer petals */}
      {outerAngles.map((deg, i) => (
        <ellipse
          key={`op-${i}`}
          cx="60" cy="42"
          rx="8.5" ry="20"
          fill={i % 2 === 0 ? `url(#pg-a-${uid})` : `url(#pg-b-${uid})`}
          transform={`rotate(${deg} 60 60)`}
          opacity={0.82 + (i % 3) * 0.06}
        />
      ))}

      {/* Vein lines on outer petals */}
      {outerAngles.map((deg, i) => (
        <line
          key={`vl-${i}`}
          x1="60" y1="57" x2="60" y2="37"
          stroke="#7A4A10"
          strokeWidth="0.5"
          opacity="0.3"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}

      {/* Inner petals */}
      {innerAngles.map((deg, i) => (
        <ellipse
          key={`ip-${i}`}
          cx="60" cy="46"
          rx="6.5" ry="15"
          fill={i % 2 === 0 ? `url(#pg-b-${uid})` : `url(#pg-a-${uid})`}
          transform={`rotate(${deg} 60 60)`}
          opacity={0.7 + (i % 3) * 0.06}
        />
      ))}

      {/* Centre disc */}
      <circle cx="60" cy="60" r="13.5" fill={`url(#pg-c-${uid})`} opacity="0.96" />
      {/* Centre seedhead dots */}
      {[
        [60,52],[56,54],[64,54],[58,57],[62,57],[55,59],[65,59],
        [57,62],[63,62],[60,65],[59,56],[61,56]
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.1" fill="#D4A040" opacity="0.55" />
      ))}
      {/* Centre highlight */}
      <ellipse cx="56.5" cy="54.5" rx="4.5" ry="2.8" fill="rgba(255,230,150,0.16)" transform="rotate(-25 56.5 54.5)" />
    </svg>
  );
}

export default function Cover({ onNext }: ChapterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up pending timer on unmount to prevent stale callbacks
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (isOpening) return; // ignore repeated clicks during animation
    setIsOpening(true);
    timerRef.current = setTimeout(() => {
      onNext();
    }, 3500);
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-cream w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Sunlight beam effect */}
      <motion.div
        className="absolute top-0 left-0 w-[200%] h-[200%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(232, 184, 109, 0.15) 0%, transparent 60%)',
        }}
        animate={{ x: ["-5%", "0%", "-5%"], y: ["-5%", "0%", "-5%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Dust Particles */}
      {[...Array(28)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-golden/20 pointer-events-none blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* The Book */}
      <motion.div
        className="relative cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Open the scrapbook"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        animate={isOpening ? {
          scale: 1.2,
          y: -50,
          rotateX: 10,
        } : {
          scale: 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: isOpening ? 3 : 0.8, ease: "easeInOut" }}
      >
        {/* Book shadow */}
        <motion.div
          className="absolute -bottom-8 left-10 right-10 h-10 bg-black/10 blur-xl rounded-[100%]"
          animate={{
            opacity: isOpening ? 0 : (isHovered ? 0.3 : 0.15),
            scale: isOpening ? 1.5 : (isHovered ? 1.05 : 1)
          }}
          transition={{ duration: isOpening ? 3 : 0.8, ease: "easeInOut" }}
        />

        {/* Book Cover — slightly thicker left border + right edge highlight */}
        <div className="relative w-[320px] md:w-[480px] h-[450px] md:h-[650px] bg-coffee rounded-r-3xl rounded-l-md shadow-2xl overflow-hidden border-l-[10px] border-[#3D2B1A]">

          {/* ── Texture layer 1: paper fibers (SVG turbulence noise) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 300 300\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'fibers\'%3E%3CfeTurbulence type=\'turbulence\' baseFrequency=\'0.65 0.15\' numOctaves=\'4\' seed=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'matrix\' values=\'0 0 0 0 0.18 0 0 0 0 0.1 0 0 0 0 0.04 0 0 0 0.04 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23fibers)\'/%3E%3C/svg%3E")',
              backgroundSize: '300px 300px',
              opacity: 1,
              mixBlendMode: 'overlay',
            }}
          />

          {/* ── Texture layer 2: tiny imperfection speckles ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
              opacity: 1,
              mixBlendMode: 'multiply',
            }}
          />

          {/* ── Edge vignette — darkens all four edges subtly ── */}
          <div
            className="absolute inset-0 pointer-events-none rounded-r-3xl"
            style={{
              background: 'radial-gradient(ellipse 85% 80% at 52% 50%, transparent 55%, rgba(20,10,4,0.18) 100%)',
            }}
          />

          {/* Leather sheen highlight — slow drift */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              background: 'linear-gradient(130deg, rgba(255,255,255,0.09) 0%, transparent 38%, rgba(255,255,255,0.05) 68%, transparent 100%)',
            }}
            animate={{ x: ['-6%', '6%', '-6%'], y: ['-4%', '4%', '-4%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          {/* Secondary warm highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 40% at 70% 25%, rgba(232,184,109,0.08) 0%, transparent 70%)',
            }}
            animate={{ x: ['0%', '8%', '0%'], y: ['0%', '6%', '0%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            aria-hidden="true"
          />

          {/* Right-edge highlight — adds 1-2px physical depth illusion */}
          <div
            className="absolute top-4 right-0 bottom-4 w-[2px] pointer-events-none rounded-r-3xl"
            style={{ background: 'linear-gradient(to bottom, rgba(255,220,150,0.18), rgba(255,220,150,0.08) 50%, transparent)' }}
          />

          {/* Golden foil border — subtle breathing pulse */}
          <motion.div
            className="absolute inset-4 border border-golden/40 rounded-r-2xl pointer-events-none"
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-6 border border-golden/20 rounded-r-xl pointer-events-none"
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Cover content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 1 }}
          >
            {/* Title — warm ivory tone, lighter shadow for readability on dark leather */}
            <motion.h1
              className="font-display text-4xl md:text-6xl font-medium tracking-wide mb-6 leading-tight"
              style={{
                color: '#EDD9A3',
                textShadow: '0 1px 2px rgba(0,0,0,0.18)',
              }}
            >
              The Little<br/>Things We<br/>Never Want<br/>To Forget
            </motion.h1>

            {/* Pressed flower — realistic inline SVG */}
            <motion.div
              className="relative my-8 drop-shadow-sm"
              animate={{ rotate: isHovered ? 2 : 0 }}
              transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
            >
              <PressedFlower />
            </motion.div>

            {/* Dedication note — 6° tilt, softer tape-on-cover shadow */}
            <motion.div
              className="absolute bottom-12 right-12 bg-warm-white px-4 py-2 origin-bottom-right"
              style={{
                rotate: '-6deg',
                boxShadow: '0 3px 12px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
              }}
              animate={{
                y: isHovered ? -4 : 0,
                rotate: isHovered ? -4 : -6,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 washi-tape rotate-[3deg]" />
              <span className="font-handwriting text-2xl text-navy">for Meghana</span>
            </motion.div>
          </motion.div>

          {/* Book opening page animation layer */}
          <motion.div
            className="absolute top-0 right-0 w-full h-full bg-cream rounded-r-3xl shadow-[-10px_0_20px_rgba(0,0,0,0.2)] origin-left"
            initial={{ rotateY: 0, opacity: 0 }}
            animate={isOpening ? {
              rotateY: -160,
              opacity: [0, 1, 1],
              zIndex: 50
            } : {
              rotateY: 0,
              opacity: 0
            }}
            transition={{ duration: 3, ease: [0.645, 0.045, 0.355, 1] }}
          />

          {/* Ribbon bookmark sticking out bottom */}
          <motion.div
            className="absolute -bottom-16 left-24 w-8 h-24 bg-golden shadow-md"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
            animate={{ rotate: [0, 2, 0, -1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
