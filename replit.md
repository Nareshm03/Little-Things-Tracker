# The Little Things We Never Want To Forget

A premium cinematic digital scrapbook made for Meghana — a handmade book experience built on the web.

## Run & Operate

- `pnpm --filter @workspace/scrapbook run dev` — run the scrapbook (port auto-assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Framer Motion + Tailwind CSS v4
- Fonts: Playfair Display, Dancing Script, Cormorant, Caveat, Inter (Google Fonts)
- No backend — purely frontend, all content hardcoded

## Where things live

- `artifacts/scrapbook/src/App.tsx` — chapter state machine, keyboard navigation
- `artifacts/scrapbook/src/chapters/` — one file per chapter (Cover, Dedication, BeforeWeBegin, ChapterOne–Seven, Ending)
- `artifacts/scrapbook/src/components/NavigationBookmarks.tsx` — bookmark sidebar nav
- `artifacts/scrapbook/src/index.css` — full color system, Google Fonts, keyframe animations

## Architecture decisions

- Single-page state machine (no router) — chapter index drives which component renders inside AnimatePresence
- Each chapter is an isolated component receiving `onNext` / `onPrev` props
- Dark mode toggled by adding `.dark` class to `<html>` when Chapter Six is active
- All animations use Framer Motion for page transitions; CSS keyframes for micro-interactions (steam, stars, petals)
- `prefers-reduced-motion` media query collapses all animations for accessibility

## Product

A cinematic digital scrapbook with 11 chapters: Cover → Dedication → Before We Begin → 7 chapters of shared memories → Ending. Every chapter has unique interactions, atmosphere, and animated transitions designed to feel like a real handmade book.

## User preferences

_Populate as you build._

## Gotchas

- `vite.config.ts` throws if `PORT` or `BASE_PATH` are missing — only run via workflow, not bare `pnpm dev`
- Generated polaroid images live in `attached_assets/generated_images/`; import via `@assets/generated_images/<file>`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
