import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChapterProps } from '../App';

import photoSareeDhoti   from '@assets/00009664-DSC_0241_1782736874058.jpg';
import photoRose         from '@assets/00005738-PHOTO-2026-04-06-19-19-23_1782736326994.jpg';
import photoFitcheckThem from '@assets/00005874-PHOTO-2026-04-07-17-58-34_1782736498331.jpg';
import photoKurta        from '@assets/00007197-PHOTO-2026-04-14-16-03-52_1782736685949.jpg';
import photoDesignTeam   from '@assets/00004675-PHOTO-2026-04-01-21-16-37_1782736224375.jpg';
import photoSwayam       from '@assets/00011504-PHOTO-2026-04-26-03-39-46_1782736935016.jpg';
import photoMirrorSelfie from '@assets/IMG_1154_1782795167755.JPG';
import photoKundapur     from '@assets/IMG20250813134534_Original_1782795167756.JPG';

// ─── Sunlight drift ──────────────────────────────────────────────────────────
function SunlightDrift() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-0 left-0 w-[55%] h-full"
        style={{ background: 'radial-gradient(ellipse at 15% 25%, rgba(232,184,109,0.13) 0%, transparent 60%)' }}
        animate={{ x: [0, 14, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─── Tiny handwriting annotation ─────────────────────────────────────────────
function Note({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className={`font-handwriting text-[9px] text-[#8B2020]/48 pointer-events-none select-none ${className}`}
    >
      {children}
    </motion.p>
  );
}

// ─── Photo slot ───────────────────────────────────────────────────────────────
type PhotoVariant = 'normal' | 'bent' | 'creased' | 'yellowed' | 'faded';

type PhotoSlotProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  rotate: number;
  delay: number;
  caption: string;
  captionDelay?: number;
  liftReveal?: boolean;
  liftText?: React.ReactNode;
  tapeColor?: string;
  objectPosition?: string;
  photoVariant?: PhotoVariant;
};

function variantImgFilter(v: PhotoVariant): string {
  if (v === 'yellowed') return 'sepia(0.22) contrast(1.01) brightness(1.02)';
  if (v === 'faded')    return 'saturate(0.68) brightness(1.06) contrast(0.93)';
  return 'sepia(0.06) contrast(1.02)';
}

function PhotoSlot({
  src, alt, width, height, rotate, delay, caption, captionDelay,
  liftReveal = false, liftText, tapeColor = 'rgba(232,184,109,0.5)',
  objectPosition = 'center', photoVariant = 'normal',
}: PhotoSlotProps) {
  const [lifted, setLifted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.1 }}
      className="relative"
      style={{ width }}
    >
      {/* Hidden text beneath — revealed as bottom edge lifts */}
      {liftReveal && liftText && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none" aria-hidden={!lifted}>
          <AnimatePresence>
            {lifted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="text-center"
              >
                {liftText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Photo frame — paper-lift physics */}
      <motion.div
        className={`bg-white border border-charcoal/5 ${liftReveal ? 'cursor-pointer' : ''}`}
        style={{ padding: '8px 8px 32px 8px', transformOrigin: 'top center', transformPerspective: 700 }}
        initial={{ rotateZ: rotate, rotateX: 0, y: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.11), 0 1px 4px rgba(0,0,0,0.07)' }}
        animate={
          liftReveal && !shouldReduceMotion
            ? {
                rotateZ: lifted ? rotate + 1.5 : rotate,
                rotateX: lifted ? 9 : 0,
                y: lifted ? -16 : 0,
                zIndex: lifted ? 30 : 1,
                boxShadow: lifted
                  ? '0 32px 52px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.10)'
                  : '0 4px 14px rgba(0,0,0,0.11), 0 1px 4px rgba(0,0,0,0.07)',
              }
            : { rotateZ: rotate, rotateX: 0, y: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.11), 0 1px 4px rgba(0,0,0,0.07)' }
        }
        transition={lifted ? { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } : { type: 'spring', stiffness: 60, damping: 14 }}
        onClick={liftReveal ? () => setLifted(v => !v) : undefined}
        role={liftReveal ? 'button' : undefined}
        tabIndex={liftReveal ? 0 : undefined}
        aria-label={liftReveal ? (lifted ? 'Set photo down' : 'Lift photo') : undefined}
        onKeyDown={liftReveal ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLifted(v => !v); } } : undefined}
      >
        {/* Washi tape */}
        <div
          className="absolute -top-2.5 left-1/2 z-10 h-5 w-14"
          style={{ backgroundColor: tapeColor, transform: `translateX(-50%) rotate(${rotate * 0.4}deg)`, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
          aria-hidden="true"
        />

        {/* Image */}
        <div className="overflow-hidden bg-[#F0EAE0] relative" style={{ width: width - 16, height }}>
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover"
              style={{ filter: variantImgFilter(photoVariant), objectPosition }} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-40">
              <svg viewBox="0 0 32 24" width="32" height="24" aria-hidden="true">
                <rect x="1" y="1" width="30" height="22" rx="2" fill="none" stroke="#9C7B4F" strokeWidth="1.2" strokeDasharray="3 2" />
                <circle cx="16" cy="11" r="4" fill="none" stroke="#9C7B4F" strokeWidth="1" />
                <path d="M10 16 L14 11 L18 14 L21 10 L28 18" fill="none" stroke="#9C7B4F" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <p className="font-handwriting text-[9px] text-[#9C7B4F]">{alt}</p>
            </div>
          )}

          {/* Crease — faint diagonal line across the image */}
          {photoVariant === 'creased' && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
              style={{ background: 'linear-gradient(34deg, transparent 46%, rgba(0,0,0,0.045) 47.5%, rgba(255,255,255,0.06) 49%, transparent 50.5%)' }} />
          )}

          {/* Yellowed edges — warm vignette */}
          {photoVariant === 'yellowed' && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(180,130,40,0.13) 80%, rgba(160,110,20,0.22) 100%)' }} />
          )}

          {/* Bent corner — bottom-right fold */}
          {photoVariant === 'bent' && (
            <div className="absolute bottom-0 right-0 pointer-events-none" aria-hidden="true"
              style={{
                width: 18, height: 18,
                background: 'linear-gradient(225deg, #e8dcc8 40%, rgba(0,0,0,0.10) 41%, transparent 55%)',
                boxShadow: '-2px -2px 4px rgba(0,0,0,0.10)',
              }} />
          )}
        </div>

        {/* Caption */}
        <motion.p
          className="font-handwriting text-[10px] text-charcoal/38 text-center mt-1.5 leading-snug"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: captionDelay ?? delay + 1, duration: 0.8 }}
        >
          {caption}
        </motion.p>
      </motion.div>

      {liftReveal && !lifted && (
        <Note delay={delay + 1.2} className="absolute -bottom-5 right-2 rotate-[3deg]">lift to see ↑</Note>
      )}
    </motion.div>
  );
}

// ─── Temple receipt ───────────────────────────────────────────────────────────
function TempleReceipt({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2.5 }} animate={{ opacity: 1, rotate: -2.5 }}
      transition={{ delay, duration: 1 }} className="relative" style={{ width: 128 }}
    >
      <div className="bg-[#FFFEF8] border border-[#C9A84C]/25 shadow-sm overflow-hidden">
        <div className="bg-[#C9A84C]/10 px-3 py-1 border-b border-[#C9A84C]/15">
          <p className="font-sans text-[6.5px] tracking-[0.25em] uppercase text-[#8B6020]/45 text-center">5 April 2026</p>
        </div>
        <div className="px-3 py-2.5">
          <p className="font-letter text-[11px] text-charcoal/58 leading-relaxed">First temple together.</p>
          <div className="h-px border-t border-dashed border-[#C9A84C]/18 my-1.5" />
          <p className="font-handwriting text-[8px] text-[#8B6020]/28 text-right italic">Hosakote</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Folded note ─────────────────────────────────────────────────────────────
function FoldedNote({ delay }: { delay: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: 1.5 }} animate={{ opacity: 1, rotate: 1.5 }}
      transition={{ delay, duration: 1 }} className="relative" style={{ width: 148 }}
    >
      <div className="absolute -top-3 left-4 w-12 h-4 washi-tape -rotate-[1deg]" />

      <div
        className="bg-[#FFFEF8] border border-[#C9A84C]/28 shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-[#C9A84C]/25"
        onClick={() => setOpened(v => !v)}
        role="button" tabIndex={0} aria-label={opened ? 'Fold note' : 'Open note'}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(v => !v); } }}
      >
        <div className="px-4 pt-3 pb-2 border-b border-[#C9A84C]/12 flex items-center justify-between">
          <p className="font-sans text-[7px] tracking-[0.28em] uppercase text-[#8B6020]/30">Note</p>
          <motion.span animate={{ rotate: opened ? 90 : 0 }} transition={{ duration: 0.4 }}
            className="text-[10px] text-[#C9A84C]/30" aria-hidden="true">▷</motion.span>
        </div>
        <AnimatePresence initial={false}>
          {!opened && (
            <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} className="px-4 py-3">
              <div className="space-y-1.5">
                {[3.5, 2.5, 4].map((w, i) => (
                  <div key={i} className="h-px bg-[#C9A84C]/15" style={{ width: `${w / 4 * 100}%` }} />
                ))}
              </div>
              <p className="font-handwriting text-[8px] text-charcoal/18 text-right mt-2 italic">tap to open</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {opened && (
            <motion.div key="open" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden">
              <div className="px-5 py-4 space-y-0.5">
                {[
                  { text: 'Let\'s pray together.', d: 0.1 },
                  { text: '', d: 0.2 },
                  { text: 'We did.', d: 0.5 },
                  { text: '', d: 0.6 },
                  { text: '5 April 2026', d: 0.9 },
                ].map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: line.d, duration: 0.9 }}
                    className="font-letter text-[13px] text-charcoal/62 leading-relaxed min-h-[18px]">
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Chapter Four ─────────────────────────────────────────────────────────────
export default function ChapterFour({ onNext, onPrev }: ChapterProps) {
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundColor: '#FDF6ED' }}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      aria-label="Chapter Four: Where We Found Peace"
    >
      <div className="absolute inset-0 pointer-events-none paper-texture" aria-hidden="true" />
      <SunlightDrift />

      <div className="relative z-10 max-w-6xl mx-auto min-h-full p-6 md:p-12 flex flex-col md:flex-row gap-0">

        {/* ═══════════ LEFT PAGE ═══════════ */}
        <div className="flex-1 md:border-r md:border-charcoal/10 md:pr-12 py-8 z-10 relative flex flex-col gap-7">

          {/* Chapter header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
            <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#8B6020]/36 mb-1">Chapter Four · April 2026</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#7C4A10] leading-tight">Where We Found<br />Peace</h2>
            <motion.svg className="w-44 h-4 mt-1.5" viewBox="0 0 180 12" aria-hidden="true">
              <motion.path d="M0 7 Q45 3 90 7 Q135 11 180 6"
                fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.7 }} />
            </motion.svg>
          </motion.div>

          {/* HERO PHOTO — saree + dhoti, Tamil New Year. Lift reveals the date. */}
          <div className="relative">
            {/* Ghost annotation — almost invisible */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 2.5 }}
              className="absolute -top-5 right-2 font-handwriting text-[9px] text-charcoal/18 italic pointer-events-none select-none rotate-[2deg] z-10"
              aria-hidden="true"
            >our peaceful day.</motion.p>

            <PhotoSlot
              src={photoSareeDhoti}
              alt="Tamil New Year — saree and dhoti"
              width={264}
              height={210}
              rotate={-1.5}
              delay={0.6}
              caption="14 April 2026"
              captionDelay={1.4}
              liftReveal={true}
              tapeColor="rgba(201,168,76,0.42)"
              objectPosition="center top"
              liftText={
                <div className="text-center select-none">
                  <p className="font-handwriting text-sm text-[#7C4A10]/72">Tamil New Year</p>
                  <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-charcoal/32 mt-0.5">with Amma</p>
                </div>
              }
            />

            {/* Note attached below hero photo */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="font-letter text-sm text-charcoal/52 mt-3 ml-2 leading-relaxed"
            >
              Some places become special<br />
              <span className="ml-4 text-charcoal/38">because of who stood beside you.</span>
            </motion.p>
          </div>

          {/* Temple receipt */}
          <div className="ml-4">
            <TempleReceipt delay={1.9} />
          </div>

          {/* ── Food & Care grid ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-2"
          >
            <p className="font-sans text-[7.5px] tracking-[0.32em] uppercase text-[#8B6020]/30 mb-2.5">
              food & care
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '🍛', name: 'Anna Sambar',    ctx: 'her daily PG food · almost every day' },
                { icon: '🐟', name: 'Fish Curry',     ctx: "Amma made it for her · multiple times 🥺" },
                { icon: '🍫', name: 'Dark Chocolate', ctx: '"I think dark chocolate... you?" · 15 Feb' },
                { icon: '🍚', name: 'Curd Rice',      ctx: '"You will get sleep" — he warned her 😂' },
                { icon: '🍬', name: 'Kulfi',           ctx: '"I ate one kulfi also" after dinner' },
                { icon: '🫘', name: 'Sikkina Unde',   ctx: 'she explained → bangara forever after · 23 Feb' },
              ].map(({ icon, name, ctx }) => (
                <div
                  key={name}
                  className="bg-white/70 border border-[#C9A84C]/12 px-2 pt-2 pb-2.5 text-center shadow-sm"
                >
                  <span className="text-xl block mb-1" aria-hidden="true">{icon}</span>
                  <p className="font-letter text-[9.5px] text-charcoal/62 leading-tight mb-0.5">{name}</p>
                  <p className="font-handwriting text-[7.5px] text-charcoal/35 leading-tight">{ctx}</p>
                </div>
              ))}
            </div>

            {/* Care pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[
                '🌅 "Had breakfast?"',
                '💧 "Drink water mam"',
                '🏠 "Reached home?"',
                '🛵 "Ride safe"',
                '😴 "Sleep early"',
                '🥺 "Good boii / Good gurl"',
              ].map(pill => (
                <span
                  key={pill}
                  className="bg-white border border-[#B85C38]/15 rounded-full px-2.5 py-1 font-handwriting text-[8.5px] text-charcoal/52 shadow-sm"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-4 mt-auto pt-6">
            <button onClick={onPrev}
              className="font-handwriting text-xl text-[#8B6020]/50 hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2"
              aria-label="Previous chapter">← back</button>
            <button onClick={onNext}
              className="font-handwriting text-xl text-[#E8924A] hover:text-[#8B6020] transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 focus-visible:ring-offset-2 ml-auto"
              aria-label="Next chapter">next chapter →</button>
          </div>
        </div>

        {/* ═══════════ RIGHT PAGE — photos scattered like a real album ═══════════ */}
        <div className="flex-1 md:pl-10 py-8 z-10">
          <div className="relative" style={{ minHeight: 900 }}>

            {/* ROSE PHOTO — first rose, most prominent on right page */}
            <div className="absolute top-0 left-6">
              <PhotoSlot
                src={photoRose}
                alt="First rose"
                width={218}
                height={170}
                rotate={2.5}
                delay={1}
                caption="6 April 2026"
                captionDelay={1.9}
                tapeColor="rgba(139,32,32,0.20)"
                objectPosition="center"
                photoVariant="bent"
              />
              <Note delay={2.1} className="absolute -bottom-5 left-3 rotate-[1deg] !text-[10px]">first rose.</Note>
            </div>

            {/* FITCHECK — them together outside, overlaps the rose slightly */}
            <div className="absolute top-16 right-2">
              <PhotoSlot
                src={photoFitcheckThem}
                alt="Fitcheck together"
                width={168}
                height={134}
                rotate={-2.5}
                delay={1.2}
                caption="just us."
                captionDelay={2.1}
                tapeColor="rgba(201,168,76,0.38)"
                objectPosition="center top"
                photoVariant="creased"
              />
            </div>

            {/* DESIGN TEAM — Swayam April 1 */}
            <div className="absolute top-220 left-0" style={{ top: 212 }}>
              <PhotoSlot
                src={photoDesignTeam}
                alt="Swayam design team"
                width={190}
                height={146}
                rotate={1.5}
                delay={1.4}
                caption="her team."
                captionDelay={2.3}
                tapeColor="rgba(232,184,109,0.40)"
                objectPosition="center"
                photoVariant="yellowed"
              />
            </div>

            {/* KURTA — Tamil New Year fitcheck */}
            <div className="absolute right-4" style={{ top: 228 }}>
              <PhotoSlot
                src={photoKurta}
                alt="Tamil New Year fitcheck"
                width={138}
                height={183}
                rotate={-1.5}
                delay={1.3}
                caption="dressed up."
                captionDelay={2.2}
                tapeColor="rgba(139,32,32,0.15)"
                objectPosition="center top"
                photoVariant="faded"
              />
            </div>

            {/* Folded note — wedged between photos */}
            <div className="absolute" style={{ top: 390, left: 24 }}>
              <FoldedNote delay={1.7} />
            </div>

            {/* SWAYAM FEST — them together */}
            <div className="absolute" style={{ top: 440, right: 8 }}>
              <PhotoSlot
                src={photoSwayam}
                alt="Swayam Fest together"
                width={196}
                height={156}
                rotate={2}
                delay={1.5}
                caption="late April."
                captionDelay={2.4}
                tapeColor="rgba(232,184,109,0.45)"
                objectPosition="center top"
              />
              <Note delay={2.6} className="absolute -bottom-5 left-2 rotate-[1deg]">walking. talking. nothing in particular.</Note>
            </div>

            {/* MIRROR SELFIE — lavender, home days */}
            <div className="absolute" style={{ top: 624, left: 0 }}>
              <PhotoSlot
                src={photoMirrorSelfie}
                alt="Mirror selfie in lavender"
                width={152}
                height={198}
                rotate={-2}
                delay={1.8}
                caption="lavender days."
                captionDelay={2.7}
                tapeColor="rgba(180,160,220,0.35)"
                objectPosition="center top"
                photoVariant="faded"
              />
            </div>

            {/* KUNDAPUR — terrace, blue floral */}
            <div className="absolute" style={{ top: 638, right: 0 }}>
              <PhotoSlot
                src={photoKundapur}
                alt="Kundapur terrace — blue floral"
                width={148}
                height={165}
                rotate={2}
                delay={2.0}
                caption="Kundapur 🌿"
                captionDelay={2.9}
                tapeColor="rgba(100,160,120,0.32)"
                objectPosition="center top"
                photoVariant="yellowed"
              />
            </div>

            {/* Ending — fades in last */}
            <motion.div
              className="absolute right-2 text-right"
              style={{ bottom: 8 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 2 }}
            >
              <p className="font-quote text-sm text-charcoal/30 italic">Some memories</p>
              <p className="font-quote text-sm text-charcoal/22 italic">never needed words.</p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
