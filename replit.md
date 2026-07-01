# The Little Things We Never Want To Forget

A digital scrapbook built for Meghana — a chapter-by-chapter journey with photos, animations, and handwritten-style design.

## Stack
- **Framework:** React + Vite (TypeScript)
- **Styling:** Tailwind CSS, Framer Motion animations
- **Routing:** Wouter
- **Monorepo:** pnpm workspaces

## How to run
```
pnpm install          # install dependencies (first time only)
pnpm --filter @workspace/scrapbook run dev   # start dev server on port 5000
```
The configured workflow `Start application` handles this automatically.

## Project structure
```
artifacts/scrapbook/src/
  chapters/     — individual chapter components (Cover, ChapterOne … Epilogue)
  components/   — shared UI (NavigationBookmarks, etc.)
  data/         — static content/data
  pages/        — page-level routes
  App.tsx       — chapter sequence and navigation logic
```

## User preferences
- No changes requested at import time; project is browsed as-is.
