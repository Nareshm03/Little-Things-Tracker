import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';
import { chapter5Data, JournalPhoto } from '../data/chapters/chapter5';

import polaroid1 from '@assets/generated_images/polaroid-1.jpg';
import polaroid2 from '@assets/generated_images/polaroid-2.jpg';
import polaroid3 from '@assets/generated_images/polaroid-3.jpg';
import polaroid4 from '@assets/generated_images/polaroid-4.jpg';
import pressedFlower from '@assets/generated_images/pressed-flower.png';

const assetMap: Record<string, string> = {
  'polaroid-1': polaroid1,
  'polaroid-2': polaroid2,
  'polaroid-3': polaroid3,
  'polaroid-4': polaroid4,
};

// ─── Page transition: slow, gentle fade ─────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(8px)', scale: 1.015 },
};

// ─── Stable seeded pseudo-random ────────────────────────────────────────────
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Floating flower petals ──────────────────────────────────────────────────
function FloatingPetals({
  colors,
  count = 12,
}: {
  colors: string[];
  count?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: seededRand(i * 7) * 100,
        top: seededRand(i * 11) * 100,
        size: 6 + seededRand(i * 3) * 8,
        color: colors[i % colors.length],
        duration: 16 + seededRand(i * 5) * 14,
        delay: seededRand(i * 13) * 12,
        driftX: (seededRand(i * 17) - 0.5) * 60,
        rotate: seededRand(i * 19) * 360,
      })),
    [count, colors]
  );

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            rotate: p.rotate,
          }}
          animate={{
            y: [0, -90, -40, -130],
            x: [0, p.driftX * 0.3, p.driftX, p.driftX * 0.6],
            opacity: [0, 0.7, 0.5, 0],
            rotate: [p.rotate, p.rotate + 45, p.rotate + 120, p.rotate + 200],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Sunlight drift ──────────────────────────────────────────────────────────
function SunlightDrift() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 w-3/4 h-full"
        style={{
          background:
            'radial-gradient(ellipse at 15% 25%, rgba(232,184,109,0.11) 0%, transparent 60%)',
        }}
        animate={{ x: [0, 22, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background:
            'radial-gradient(ellipse at 85% 55%, rgba(201,168,76,0.07) 0%, transparent 55%)',
        }}
        animate={{ x: [0, -14, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      {/* Diagonal light ray */}
      <div
        className="absolute top-0 left-[20%] w-[8%] h-full opacity-[0.035] mix-blend-overlay"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, transparent 80%)',
          transform: 'skewX(-8deg)',
        }}
      />
    </div>
  );
}

// ─── Incense smoke ───────────────────────────────────────────────────────────
function IncenseSmoke() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '30px', left: '50%', transform: 'translateX(-50%)', width: 40, height: 80 }}
      viewBox="0 0 40 80"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M ${18 + i * 2} 70 C ${14 + i * 3} 55, ${22 + i * 2} 40, ${16 + i * 4} 25 C ${12 + i * 3} 10, ${20 + i * 2} 5, ${18 + i * 2} 0`}
          fill="none"
          stroke="rgba(180,160,140,0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.5, 0], y: [-4, -10, -20] }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 1.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </svg>
  );
}

// ─── Temple illustration ─────────────────────────────────────────────────────
function TempleIllustration() {
  return (
    <svg
      width="160"
      height="120"
      viewBox="0 0 160 120"
      className="opacity-30"
      aria-label="Temple illustration"
      role="img"
    >
      {/* Base platform */}
      <rect x="20" y="100" width="120" height="8" rx="1" fill="#8B6F47" />
      <rect x="30" y="95" width="100" height="6" rx="1" fill="#A0785A" />

      {/* Columns */}
      {[40, 60, 80, 100, 120].map((x) => (
        <rect key={x} x={x - 3} y="62" width="6" height="34" fill="#8B6F47" opacity="0.8" />
      ))}

      {/* Lower roof / eave */}
      <path d="M 15 65 Q 80 50 145 65 L 140 72 Q 80 60 20 72 Z" fill="#6F4E37" />
      {/* Lower roof curve */}
      <path d="M 10 62 Q 80 44 150 62" fill="none" stroke="#6F4E37" strokeWidth="2" />

      {/* Upper roof */}
      <path d="M 30 50 Q 80 28 130 50 L 128 58 Q 80 38 32 58 Z" fill="#8B6F47" />
      <path d="M 25 47 Q 80 24 135 47" fill="none" stroke="#8B6F47" strokeWidth="2" />

      {/* Top finial */}
      <rect x="76" y="14" width="8" height="28" rx="2" fill="#6F4E37" />
      <ellipse cx="80" cy="12" rx="6" ry="4" fill="#C9A84C" opacity="0.8" />

      {/* Steps */}
      <rect x="55" y="108" width="50" height="5" rx="1" fill="#A0785A" opacity="0.6" />
      <rect x="62" y="113" width="36" height="5" rx="1" fill="#A0785A" opacity="0.5" />
    </svg>
  );
}

// ─── Brass bell ──────────────────────────────────────────────────────────────
function BrassBell() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { rotate: [-2, 2, -1.5, 1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
      style={{ transformOrigin: 'top center' }}
      aria-label="Brass bell"
      role="img"
    >
      <svg width="38" height="52" viewBox="0 0 38 52" className="opacity-55">
        {/* Rope */}
        <line x1="19" y1="0" x2="19" y2="8" stroke="#8B6F47" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bell top knob */}
        <ellipse cx="19" cy="10" rx="5" ry="3" fill="#C9A84C" />
        {/* Bell body */}
        <path d="M 8 12 Q 5 22 4 34 Q 3 42 2 46 L 36 46 Q 35 42 34 34 Q 33 22 30 12 Z" fill="#C9A84C" />
        {/* Bell sheen */}
        <path d="M 11 14 Q 9 24 8 34 Q 7 40 7 44" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
        {/* Bell rim */}
        <ellipse cx="19" cy="46" rx="17" ry="4" fill="#B8971F" />
        {/* Clapper */}
        <line x1="19" y1="42" x2="19" y2="50" stroke="#8B6F47" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="19" cy="51" r="2.5" fill="#8B6F47" />
      </svg>
    </motion.div>
  );
}

// ─── Torn paper edge SVG ─────────────────────────────────────────────────────
function TornEdge({ position }: { position: 'top' | 'bottom' }) {
  const path =
    position === 'top'
      ? 'M0,0 L0,8 C20,2 40,10 60,4 C80,0 100,8 120,3 C140,0 160,7 180,2 C200,0 220,6 240,3 C260,0 280,7 300,4 L300,0 Z'
      : 'M0,16 L0,10 C20,14 40,8 60,13 C80,16 100,9 120,14 C140,16 160,10 180,14 C200,16 220,11 240,14 C260,16 280,10 300,13 L300,16 Z';
  return (
    <div
      className={`absolute left-0 right-0 overflow-hidden pointer-events-none ${position === 'top' ? 'top-0' : 'bottom-0'}`}
      style={{ height: '16px' }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="16"
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <path d={path} fill="#EDE8DF" />
      </svg>
    </div>
  );
}

// ─── Journal photo card ──────────────────────────────────────────────────────
function JournalPhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: JournalPhoto;
  index: number;
  onOpen: (p: JournalPhoto) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const src = photo.assetKey ? assetMap[photo.assetKey] : null;
  const [imgError, setImgError] = useState(false);
  const delay = 0.3 + index * 0.22;

  return (
    <motion.div
      className="relative group cursor-pointer focus-visible:outline-none"
      initial={shouldReduceMotion ? false : { y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotate: photo.rotate }}
    >
      {/* Washi tape */}
      <motion.div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10"
        style={{
          width: 56,
          height: 20,
          backgroundColor: photo.tapeColor,
          transform: `translateX(-50%) rotate(${photo.tapeAngle}deg)`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
          maskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 20' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,20 L0,20 Z' opacity='0.8'/%3E%3Cpath d='M-2,2 C10,5 20,-2 30,3 C40,8 50,0 60,4 C70,8 80,1 90,5 C100,9 102,0 102,0 L102,20 L-2,20 Z' fill='black'/%3E%3Cpath d='M-2,18 C10,15 20,22 30,17 C40,12 50,20 60,16 C70,12 80,19 90,15 C100,11 102,20 102,20 L102,0 L-2,0 Z' fill='black'/%3E%3C/svg%3E\")",
        }}
        initial={shouldReduceMotion ? false : { rotate: photo.tapeAngle * 2, y: -6, opacity: 0 }}
        whileInView={{ rotate: photo.tapeAngle, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.9, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* Photo card with torn edges */}
      <motion.div
        className="relative bg-warm-white overflow-hidden focus-visible:ring-2 focus-visible:ring-orange"
        style={{
          boxShadow: '0 3px 14px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.07)',
          paddingBottom: '8px',
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : { scale: 1.025, boxShadow: '0 10px 28px rgba(0,0,0,0.16)' }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={() => onOpen(photo)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(photo); }
        }}
        aria-label={`Open photo memory: ${photo.caption}`}
      >
        <TornEdge position="top" />

        {/* Photo image */}
        <div className="w-full aspect-[4/3] overflow-hidden relative bg-soft-beige">
          {/* Photo develop overlay */}
          <motion.div
            className="absolute inset-0 bg-warm-white pointer-events-none z-10"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: delay + 0.5, ease: 'easeOut' }}
          />
          {src && !imgError ? (
            <motion.img
              src={src}
              alt={photo.caption}
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.1) contrast(1.04) brightness(1.02)' }}
              initial={{ filter: 'brightness(1.8) contrast(0.5) sepia(0.8)', scale: 1.05 }}
              whileInView={{ filter: 'brightness(1.02) contrast(1.04) sepia(0.1)', scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3.5, delay: delay + 0.6, ease: 'easeOut' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 2 }}
                className="text-center"
              >
                <span className="text-3xl opacity-20">🌸</span>
                <p className="font-handwriting text-sm text-coffee/30 mt-1">still developing…</p>
              </motion.div>
            </div>
          )}
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.10) 100%)',
            }}
          />
        </div>

        <TornEdge position="bottom" />

        {/* Date chip + caption */}
        <div className="px-3 pt-3 pb-2 flex items-start justify-between gap-2">
          <motion.p
            className="font-handwriting text-lg text-navy/80 leading-snug flex-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 2.2, duration: 1, ease: 'easeOut' }}
          >
            {photo.caption}
          </motion.p>
          <motion.span
            className="flex-shrink-0 font-sans text-[9px] tracking-widest uppercase text-coffee/35 bg-soft-beige/80 px-1.5 py-0.5 rounded-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 2.5, duration: 0.8 }}
          >
            {photo.date.split(',')[0]}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Lightbox modal ──────────────────────────────────────────────────────────
function PhotoModal({
  photo,
  onClose,
}: {
  photo: JournalPhoto;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const src = photo.assetKey ? assetMap[photo.assetKey] : null;
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo memory: ${photo.caption}`}
    >
      <div className="absolute inset-0 bg-[#1A1810]/60 backdrop-blur-lg" />

      <motion.div
        className="relative bg-warm-white max-w-md w-full overflow-hidden"
        style={{
          boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.12)',
        }}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Washi tape */}
        <div
          className="absolute -top-2 left-1/2 z-10"
          style={{
            width: 64,
            height: 20,
            backgroundColor: photo.tapeColor,
            transform: `translateX(-50%) rotate(${photo.tapeAngle}deg)`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
          }}
          aria-hidden="true"
        />

        {/* Photo */}
        <div className="relative w-full aspect-[4/3] bg-soft-beige overflow-hidden">
          <TornEdge position="top" />
          {src && !imgError ? (
            <img
              src={src}
              alt={photo.caption}
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.1) contrast(1.05)' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="text-4xl opacity-20">🌸</span>
              <p className="font-handwriting text-sm text-coffee/30">still developing…</p>
            </div>
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.10) 100%)' }}
          />
          <TornEdge position="bottom" />
        </div>

        {/* Details */}
        <div className="px-6 pt-4 pb-6 space-y-4">
          {/* Date + Caption */}
          <div>
            <motion.p
              className="font-sans text-[10px] tracking-widest uppercase text-coffee/38"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {photo.date}
            </motion.p>
            <motion.p
              className="font-handwriting text-2xl text-navy mt-0.5"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {photo.caption}
            </motion.p>
          </div>

          {/* Chat snippet */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            role="log"
            aria-label="Chat snippet"
          >
            {photo.chatSnippet.map((line, i) => (
              <motion.div
                key={i}
                className={`flex ${line.speaker === 'me' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, x: line.speaker === 'me' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42 + i * 0.12, duration: 0.45 }}
              >
                <div
                  className={`px-3 py-1.5 max-w-[80%] border border-charcoal/8 ${
                    line.speaker === 'me'
                      ? 'bg-orange/8 rounded-2xl rounded-tr-sm'
                      : 'bg-soft-beige/60 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  <p className="font-letter text-lg text-charcoal/80 leading-snug">{line.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Handwritten memory */}
          <motion.div
            className="pt-3 border-t border-charcoal/8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            {/* Drawn line */}
            <svg className="w-full h-4 mb-2" viewBox="0 0 260 12" aria-hidden="true">
              <motion.path
                d="M 4 8 Q 65 3 130 8 Q 195 13 256 6"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.7, ease: 'easeOut' }}
              />
            </svg>
            <p className="font-letter text-lg text-coffee/75 italic leading-relaxed text-center">
              "{photo.memory}"
            </p>
          </motion.div>
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 bg-soft-beige/80 text-coffee/50 flex items-center justify-center rounded-full text-sm hover:bg-orange hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          aria-label="Close photo"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Hidden flower note ──────────────────────────────────────────────────────
function FlowerNoteModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { hiddenFlowerNote } = chapter5Data;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Hidden note"
    >
      <div className="absolute inset-0 bg-[#1a1408]/50 backdrop-blur-sm" />

      <motion.div
        className="relative max-w-sm w-full bg-[#FEFCE8] px-8 py-10 overflow-hidden"
        style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}
        initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 14 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ruled lines */}
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{ top: `${56 + i * 36}px`, backgroundColor: 'rgba(147,197,253,0.3)' }}
            aria-hidden="true"
          />
        ))}

        {/* Pressed flower watermark */}
        <div className="absolute right-4 bottom-4 opacity-15 pointer-events-none rotate-[20deg]">
          <img src={pressedFlower} alt="" className="w-20 h-24 object-contain" aria-hidden="true"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        <div className="relative z-10">
          <motion.p
            className="font-handwriting text-2xl text-coffee mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {hiddenFlowerNote.title}
          </motion.p>

          <motion.p
            className="font-letter text-xl text-charcoal/80 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            {hiddenFlowerNote.body}
          </motion.p>

          {/* Drawn underline */}
          <svg className="w-full h-5 mb-2" viewBox="0 0 260 14" aria-hidden="true">
            <motion.path
              d="M 4 9 C 50 4, 110 13, 170 7 S 230 11, 256 8"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
            />
          </svg>

          <motion.p
            className="font-handwriting text-xl text-coffee/65 italic text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {hiddenFlowerNote.signOff}
          </motion.p>
        </div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 bg-golden/15 text-coffee/50 flex items-center justify-center rounded-full text-sm hover:bg-orange hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          aria-label="Close note"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ChapterFive({ onNext, onPrev }: ChapterProps) {
  const [openPhoto, setOpenPhoto] = useState<JournalPhoto | null>(null);
  const [flowerFound, setFlowerFound] = useState(false);
  const [showFlowerNote, setShowFlowerNote] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { journalPhotos, petalColors, quote, attribution } = chapter5Data;

  return (
    <>
      <motion.div
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
        style={{ backgroundColor: '#EDE4D8' }}
        variants={shouldReduceMotion ? {} : pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        aria-label="Chapter Five: Days That Felt Peaceful"
      >
        {/* Paper texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(201,168,76,0.018) 1px, transparent 1px),
              linear-gradient(rgba(201,168,76,0.018) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />

        <SunlightDrift />
        <FloatingPetals colors={petalColors} count={14} />

        <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-0 min-h-full">

          {/* ═══════════ LEFT PAGE ═══════════ */}
          <div className="flex-1 lg:border-r lg:border-charcoal/10 lg:pr-10 flex flex-col gap-7 pb-8 lg:pb-0">

            {/* Chapter header */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
            >
              <p className="font-sans text-xs tracking-[0.38em] uppercase text-coffee/40 mb-1">
                {chapter5Data.chapterNumber}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-coffee leading-tight font-light">
                {chapter5Data.title}
              </h2>
              {/* Gentle drawn line */}
              <motion.svg className="w-48 h-5 mt-1" viewBox="0 0 200 14" aria-hidden="true">
                <motion.path
                  d="M 0 9 C 40 4, 80 13, 120 7 S 175 11, 200 8"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }}
                />
              </motion.svg>
            </motion.div>

            {/* Introduction */}
            <motion.p
              className="font-quote text-xl text-charcoal/75 leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.4, ease: 'easeOut' }}
            >
              {chapter5Data.intro}
            </motion.p>

            {/* Handwritten paragraph */}
            <motion.div
              className="relative max-w-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
            >
              <div
                className="bg-[#FEFCE8]/80 p-5 shadow-sm"
                style={{ rotate: '-0.4deg', boxShadow: '1px 2px 8px rgba(0,0,0,0.06)' }}
              >
                <p className="font-letter text-[1.35rem] text-charcoal/80 leading-relaxed">
                  {chapter5Data.handwrittenParagraph}
                </p>
                <motion.svg className="w-full h-4 mt-3" viewBox="0 0 260 12" aria-hidden="true">
                  <motion.path
                    d="M 4 8 Q 65 3 130 8 Q 195 13 256 6"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.6, ease: 'easeOut' }}
                  />
                </motion.svg>
                <p className="font-handwriting text-sm text-golden/60 italic mt-0.5 text-right">
                  {chapter5Data.annotation}
                </p>
              </div>
            </motion.div>

            {/* Temple + Bell + Incense cluster */}
            <motion.div
              className="relative flex items-end gap-6 self-start ml-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.4, ease: 'easeOut' }}
            >
              <div className="relative">
                <TempleIllustration />
                <IncenseSmoke />
              </div>
              <div className="mb-2">
                <BrassBell />
                <p className="font-handwriting text-xs text-coffee/30 mt-1 text-center">ring once</p>
              </div>
            </motion.div>

            {/* Pressed flower + hidden bookmark */}
            <motion.div
              className="relative flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1.2 }}
            >
              <div className="relative">
                <motion.img
                  src={pressedFlower}
                  alt="Pressed flower decoration"
                  className="w-16 h-20 object-contain opacity-65"
                  style={{ filter: 'sepia(0.25) brightness(0.95)', rotate: '8deg' }}
                  animate={shouldReduceMotion ? {} : { rotate: [8, 10, 7, 9, 8] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Hidden flower bookmark — peek out from edge */}
                <motion.button
                  className="absolute -right-3 top-3 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                  onClick={() => { setFlowerFound(true); setShowFlowerNote(true); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlowerFound(true); setShowFlowerNote(true); }
                  }}
                  aria-label="A pressed flower bookmark — peek behind"
                  title="Something tucked away…"
                  whileHover={shouldReduceMotion ? {} : { x: 4, rotate: 5 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-5 h-14 bg-[#FEFCE8] border border-golden/25 flex flex-col items-center justify-end pb-1.5 gap-0.5 rounded-b-sm opacity-0 hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.08)' }}
                    aria-hidden="true"
                  >
                    <div className="w-2 h-2 rounded-full bg-golden/40" />
                    <div className="w-1 h-3 bg-green-400/40 rounded-full" />
                  </div>
                </motion.button>
              </div>
              <div>
                <p className="font-handwriting text-lg text-coffee/45 italic">
                  {flowerFound ? 'you found it 🌸' : 'something tucked away…'}
                </p>
              </div>
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              className="mt-auto border-l-2 border-golden/40 pl-5 py-1 max-w-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.2 }}
            >
              <p className="font-quote text-lg text-charcoal/60 italic leading-relaxed">
                {quote}
              </p>
              <footer className="font-handwriting text-base text-coffee/40 mt-2">{attribution}</footer>
            </motion.blockquote>

            {/* Navigation */}
            <div className="flex gap-4 pt-2 pb-2">
              <button
                onClick={onPrev}
                className="font-handwriting text-xl text-coffee/50 hover:text-coffee transition-colors duration-500 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
                aria-label="Previous chapter"
              >
                ← back
              </button>
              <button
                onClick={onNext}
                className="font-handwriting text-xl text-orange/80 hover:text-coffee transition-colors duration-500 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 ml-auto"
                aria-label="Next chapter"
              >
                next chapter →
              </button>
            </div>
          </div>

          {/* Gutter */}
          <div className="hidden lg:flex flex-col items-center px-3 py-8 gap-1.5" aria-hidden="true">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="w-px h-3 bg-charcoal/7" />
            ))}
          </div>

          {/* ═══════════ RIGHT PAGE — Photo journal ═══════════ */}
          <div className="flex-1 lg:pl-8 flex flex-col gap-2 pb-8">
            <motion.div
              className="pt-6 mb-1 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <p className="font-handwriting text-2xl text-coffee/50 italic">the quiet roll</p>
              <p className="font-sans text-[10px] tracking-widest text-coffee/28 uppercase">tap to remember</p>
            </motion.div>

            <div
              className="flex flex-col gap-5"
              role="list"
              aria-label="Photo memories"
            >
              {journalPhotos.map((photo, i) => (
                <div key={photo.id} role="listitem">
                  <JournalPhotoCard
                    photo={photo}
                    index={i}
                    onOpen={setOpenPhoto}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Photo lightbox ── */}
      <AnimatePresence>
        {openPhoto && (
          <PhotoModal photo={openPhoto} onClose={() => setOpenPhoto(null)} />
        )}
      </AnimatePresence>

      {/* ── Flower note ── */}
      <AnimatePresence>
        {showFlowerNote && (
          <FlowerNoteModal onClose={() => setShowFlowerNote(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
