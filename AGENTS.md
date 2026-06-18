# AGENTS.md

## Project Overview

Minimalist React app that calculates the next day of the week. Intentionally sarcastic and over-engineered for a trivial problem.

## Tech Stack

- React 19 + TypeScript 5.9 + Vite 7
- Chakra UI v3 (not v2 — API differences matter)
- Dark mode forced via `next-themes` in `App.tsx`
- JetBrains Mono font loaded from Google Fonts in `index.html`

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Typecheck (tsc -b) + production build
npm run lint         # ESLint on all files
npm run preview      # Preview production build
```

**No test framework is configured.** Don't assume Jest/Vitest exists.

## Path Aliases

`@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

```tsx
import { getNextDay } from "@/helpers/days";
```

## Project Structure

```
src/
  App.tsx                  # Root: ChakraProvider + forced dark mode
  main.tsx                 # Entry point
  theme.ts                 # Chakra UI system config (fonts)
  components/
    DayButton/DayButton.tsx   # Single day toggle button
    MainView/MainView.tsx     # Main UI: day selection + compute flow
    ui/                       # Chakra UI wrappers (color-mode, provider, toaster, tooltip)
  helpers/
    days.ts                   # daysOfWeek array + getNextDay()
    getRandomSarcasticPhrase.ts  # Loading message pools
```

## Key Patterns

- Days array starts with Monday (not Sunday). JS `Date.getDay()` is remapped: `(jsDay + 6) % 7`.
- "Compute" actions use `setTimeout` with 4s delay for comedic effect — not actual async work.
- Loading phrases rotate every 2s via `setInterval` in `useEffect`.
- Components use Chakra UI v3 props (`colorScheme`, `variant`, `size`).

## Code Style

- ESLint flat config with `typescript-eslint` + `react-hooks` + `react-refresh`.
- Prettier formats `*.{js,ts,tsx,css,md,scss}` via lint-staged.
- lint-staged runs on pre-commit (husky + lint-staged in `package.json`).
- `strict: true` in TypeScript with `noUnusedLocals` and `noUnusedParameters`.

## Deployment

Base path is `/whatdayisnext/` (GitHub Pages). Build output goes to `dist/`.
