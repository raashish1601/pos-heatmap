# Candidate Skills Heatmap

A Next.js application for comparing and evaluating candidates based on their skills and experience using an interactive heatmap visualization.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Features

- **Interactive Heatmap**: Visual comparison of candidate skills with color-coded proficiency levels
- **Candidate Selection**: Select multiple candidates from the sidebar to compare
- **Filtering**: Filter candidates by skills, experience, and other criteria
- **Sticky Navigation**: Sticky candidate names row and skills column for easy navigation
- **Empty State**: Overlay UI when no candidates are selected

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **ESLint & Prettier** - Code quality and formatting
- **Husky & lint-staged** - Git hooks for code quality

## Project Structure

- `app/` - Next.js app router pages and layout
- `components/` - React components
- `hooks/` - Custom React hooks
- `utils/` - Utility functions
- `constants/` - Application constants and data
- `types/` - TypeScript type definitions
