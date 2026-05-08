# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Type-check + build (tsc -b && vite build)
pnpm lint         # Run ESLint
pnpm preview      # Preview production build locally
pnpm deploy       # Build and deploy to GitHub Pages (gh-pages -d dist)
```

No test framework is configured.

## Architecture

This is a React 19 + TypeScript + Vite interactive blog explainer, deployed to GitHub Pages at `https://0xahmedk.github.io/vits-and-transnext/`. The `base` in `vite.config.ts` must match that path.

**Page structure (`App.tsx`):** A single scrollable page with fixed `ProgressNavigation` (desktop sidebar), `IntroductionSection`, one or more `Section` components, closing thoughts, a footer with `ViewCounter`, and `MobileNavigation`.

**`Section` component** ([src/components/Section.tsx](src/components/Section.tsx)) is the core layout primitive. It accepts:

- `theory: ReactNode`, rendered in a dark `Paper` on the left (or top in `layout="vertical"`)
- `playground: ReactNode`, rendered sticky on the right (or below in `layout="vertical"`)
- `layout?: "horizontal" | "vertical"`, defaults to horizontal split

**Adding a new section:** Two places must stay in sync:

1. `App.tsx`, add a `<Section id="section-N" ... />` element
2. `ProgressNavigation.tsx`, add the matching entry to the `sections` array so the sidebar tracks it

**`ProgressNavigation`** ([src/components/ProgressNavigation.tsx](src/components/ProgressNavigation.tsx)) is a fixed desktop sidebar driven by scroll position. It reads DOM element positions by `id` to compute active section and progress percentage.

**`ViewCounter`** ([src/commons/ViewCounter.tsx](src/commons/ViewCounter.tsx)) uses the `counterapi` package (workspace `ahmed-khans-team-2619`, slug `percept`) to increment and display a page view count. It guards against double-increment using a `useRef`.

**UI stack:** Mantine v8 (`@mantine/core`, `@mantine/hooks`) for all layout/UI primitives, framer-motion for animations, lucide-react for icons. Dark theme, background color `#1a1b1e`, border color `#373a40` are used throughout.
