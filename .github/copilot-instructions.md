# Copilot Instructions for whatdayisnext

## Project Overview

A simple React + TypeScript + Vite app that helps users determine the next day of the week. The app uses Chakra UI v3 for styling with dark mode support.

### Key Design Patterns

- **Path alias**: `@/` maps to `src/` (configured in [vite.config.ts](../../vite.config.ts))
- **Chakra UI v3**: Before creating new components, check the documentation using the available tools
- **Commented SCSS**: Don't use SCSS for new components; use Chakra props instead. Existing SCSS files are commented for reference only.

## Development Workflow

### Commands

- `npm run dev` - Start Vite dev server (HMR enabled)
- `npm run build` - TypeScript compilation + Vite production build
- `npm run lint` - ESLint check (eslint-plugin-react-hooks enabled)
- `npm run preview` - Preview production build

### Code Quality

- **Prettier + ESLint**: Auto-format on git commit (husky + lint-staged)
- **TypeScript**: Strict mode recommended; interfaces for component props required
- **File formatting**: `.{js,ts,tsx,css,md,scss}` files auto-formatted

### Component Structure

- Functional components only
- Props destructured with TypeScript interfaces
- Components co-located in feature folders (e.g., `DayButton/DayButton.tsx`)
- Do not use useEffect as states observer, if you need to execute actions after state updates, run the action in the same function where the state is updated.

### Imports

- Use `@/` alias for `src/` imports: `import DayButton from "@/components/DayButton/DayButton"`
- Avoid relative paths beyond component folder

### Styling

- Use Chakra UI props for styling (flex, spacing, colors)
- SCSS modules exist but are deprecated in favor of Chakra
- Favour Chakra's default theme over custom colours and styles

### Docs consistency

- If relevant changes are made to the architecture or design patterns, please update this file to keep it consistent with the codebase.

---
