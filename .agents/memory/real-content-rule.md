---
name: Real Content Rule
description: Content policy for the Naresh–Meghana scrapbook; also covers design/interaction patterns established.
---

# Real Content Rule

**Rule:** All chapter content — quotes, messages, dates, events, names — must come from real Naresh–Meghana memories. No invented lines, quotes, or events.

**Why:** This is a personal gift scrapbook. Invented content would feel wrong and inauthentic to the recipient.

**How to apply:** When editing chapters, preserve all existing text verbatim. Only change visual presentation (layout, typography, shadows, animations, positioning).

---

# Design Patterns Established (ChapterThree redesign)

**Shadow scale:** `flat` / `card` / `lifted` / `hover` / `hero` / `heroHov` — defined in a `shadows` object at top of chapter file. Other chapters should adopt this pattern for consistency.

**Why:** Systematic shadow values create physical depth hierarchy. Hero photos should use `hero`/`heroHov`, supporting elements use `card`/`lifted`.

**Mouse parallax hook:** `useMouseParallax(maxPx)` using `useMotionValue` + `useSpring` — apply to the whole-board `motion.div` wrapper (single layer, max 4-5px). Import `useMotionValue, useSpring` from framer-motion.

**Why:** Single-layer parallax is sufficient for the brief's "max 5px" requirement. Multi-layer would require wrapping every element individually.

**Movie ticket swing:** After settle animation (`onAnimationComplete`), switch to looping `[val, alt, val]` keyframe animation using `useState(settled)`.

**Why:** Framer Motion can't cleanly chain a spring settle → infinite loop without the state transition pattern.

**Mobile nav placement:** In two-column (left+right page) layouts, keep nav `hidden md:flex` in left page, add a duplicate nav at the bottom of the mobile right-page flow. This ensures mobile reading order is: heading → letter → hero photo → chat → supporting → nav.

**Letter responsive width:** Use `style={{ maxWidth: 390 }}` + `className="w-full"` instead of fixed `style={{ width: 390 }}` to prevent horizontal overflow on narrow screens.

**Reduced motion guarding:** All `whileHover` and looping `animate` props must be gated with `!shouldReduceMotion`. Add `aria-expanded` to all toggleable interactive elements (letter, washi, lunch wrapper).
