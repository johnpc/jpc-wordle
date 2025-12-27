# Wordle Clone

A simple Wordle clone built with React and TypeScript.

## Features

- **Daily Mode**: Solve today's word puzzle with a date-seeded random word
- **Infinite Mode**: Play unlimited rounds with truly random words
- Clean, accessible UI using shadcn components

## Tech Stack

- **React** + **Vite** - Fast development and build tooling
- **TypeScript** - Strict typing (no `any` allowed)
- **React Query** - State management with provider/hooks pattern
- **shadcn/ui** - Component library
- **ESLint** + **Prettier** - Code formatting and linting
- **Husky** + **lint-staged** - Pre-commit hooks for code quality

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (foreground)
npm run dev

# Run development server (background with logs)
npm run dev > dev.log 2>&1 &

# Build for production
npm run build
```

## How It Works

The game uses a dictionary of five-letter words. In daily mode, the word is selected using a date-based seed, ensuring everyone gets the same word each day. In infinite mode, words are chosen with true randomness for endless gameplay.
