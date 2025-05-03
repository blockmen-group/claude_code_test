# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Test Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build the project: `npm run build`
- Run all tests: `npm test`
- Run a single test: `npm test -- -t "test name"`
- Lint code: `npm run lint`
- Type check: `npm run typecheck`

## Code Style Guidelines

- **Formatting**: Use Prettier with default configuration
- **Linting**: ESLint with the project's configuration
- **Imports**: Group imports by type (external, internal, types) with blank lines between groups
- **Types**: Always use TypeScript types; avoid `any`
- **Error Handling**: Use try/catch with specific error types; log errors properly
- **Naming**:
  - Variables/functions: camelCase
  - Classes/interfaces: PascalCase
  - Constants: UPPER_SNAKE_CASE
  - Files: kebab-case.ts or kebab-case.tsx
- **Comments**: Use JSDoc for functions and complex logic
- **Git Workflow**: Create focused commits with descriptive messages