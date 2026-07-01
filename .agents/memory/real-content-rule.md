---
name: Real Content Rule + Scrapbook Design Principles
description: Content policy and hard-won design decisions for the Naresh–Meghana scrapbook.
---

# Real Content Rule

**Rule:** All chapter content — quotes, messages, dates, events, names — must come from real Naresh–Meghana memories. No invented lines, quotes, or events.

**Why:** This is a personal gift scrapbook. Invented content feels wrong and inauthentic.

**How to apply:** When editing chapters, preserve all existing text verbatim. Only change visual presentation.

---

# Editorial Architecture (established in Chapter Three v2)

**The distinction that matters:**
> "A collection of memories" vs "a journey through memories" — these are completely different experiences.

A collage shows everything at once. A journey reveals deliberately.

**Rule for future chapters:** Single-column scroll narrative, not a two-column bulletin board. Scroll-triggered reveals create pacing. Whitespace IS storytelling.

**Object budget:** Max 5–7 visual objects per chapter. For every element, answer: Why does it exist? What emotion does it create? What if it were removed? If you can't answer — cut it.

**Typography roles (never mix):**
- `font-display` (serif) — chapter titles, structural anchors — for reading impact
- `font-letter` (Caveat) — letter/handwritten content only — for emotion, not reading
- `font-sans` — digital content (chat, labels, captions) — for readability
- `font-quote` (Cormorant italic) — closing quotes, literary weight
- `font-handwriting` — small annotations, decorative captions only

**Interaction hierarchy (professional order):**
Layout → Hierarchy → Spacing → Typography → Accessibility → Animation (last 5%)

**Story interactions that actually tell the story:**
- Letter unfolds on click — physical memory coming alive
- Photo "develops" — `filter: brightness(2.8) saturate(0) blur(2px)` → `brightness(1.04) saturate(1.14) blur(0px) sepia(0.10)` via `whileInView` — polaroid emerging
- Tape peels on hover — `rotate: -3, scaleX: 0.92, transformOrigin: 'right center'`
- Chat bubbles slide from opposite sides (`x: -24` and `x: 24`) on scroll into view

**Cinematic positioning:** Use the single column + `ml-auto` / `justify-end` to create rule-of-thirds placement. Off-center is more dynamic than centered. Photo at `justify-end sm:pr-8` for visual weight variation.

---

# Technical Patterns (avoid re-discovering)

**`reveal()` helper:** Accepts `(delay, reducedMotion: boolean | null = false)`. When `reducedMotion` is true: `y: 0`, `duration: 0.15`, `delay: 0`. All call sites pass `shouldReduceMotion` from the component's `useReducedMotion()` hook.

**`useReducedMotion()` returns `boolean | null`** — always type params as `boolean | null`, never `boolean`.

**Filter animation conflict:** Never set `filter` in both `style` and `initial/whileInView` on the same element — Framer Motion wins and overrides the `style` filter entirely. Merge all filter values into the animation target instead.

**`useMouseParallax` hook:** uses `useMotionValue` + `useSpring` (stiffness 50, damping 22, mass 0.4). Max 3–4px. Whole-board only — don't wrap individual elements.

**Movie ticket perpetual swing:** `useState(settled)` pattern — initial spring settle → `onAnimationComplete` sets `settled: true` → then switch to looping `[val, alt, val]` keyframe animation with `repeat: Infinity`.

**Mobile-specific:** Single-column scroll narrative solves mobile automatically — no separate mobile composition needed. Width varies: `max-w-lg` (512px) centered for desktop, full-width with `px-4` on mobile.
