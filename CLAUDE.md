# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

**todo-vue-components** is a custom Vue 3 component library built for continuous development of reusable UI components. The goal is to collect, document, and maintain high-quality Vue components created during real-world development.

## Repository Info

- **Repo**: hub-yang/todo-vue-components
- **Development Branch**: `claude/init-vue-components-lib-66tii`
- **Main Branch**: `main`

## Tech Stack

- **Runtime**: Vue 3.5+ with Composition API + TypeScript 5.8+
- **Build**: Vite 6+
- **Monorepo**: pnpm workspace
- **Styles**: UnoCSS (presetUno + presetAttributify)
- **Linting**: ESLint 9 flat config + typescript-eslint + eslint-plugin-vue

## Repository Structure

```
todo-vue-components/
├── packages/
│   ├── constants/             # @todo-vc/constants — shared constants & types
│   ├── utils/                 # @todo-vc/utils — shared utility functions
│   ├── hooks/                 # @todo-vc/hooks — shared Vue composables
│   ├── components/            # @todo-vc/components — all UI components
│   └── todo-vue-components/   # todo-vue-components — public entry (re-exports all)
├── play/                      # @todo-vc/play — Vite dev playground
├── typings/                   # Global TypeScript declarations
├── uno.config.ts              # UnoCSS configuration
├── tsconfig.base.json         # Shared TS compiler options
└── tsconfig.json              # Root TS project references
```

## Development Guidelines

### Adding a New Component

1. Create a directory under `packages/components/src/<component-name>/`
2. Structure:
   ```
   packages/components/src/button/
   ├── button.ts       # props, emits, types
   ├── button.vue      # component template
   └── index.ts        # export with withInstall()
   ```
3. Export from `packages/components/src/index.ts`
4. Preview in `play/src/App.vue`

### Naming Conventions

- Components: PascalCase (`TButton`, `TInput`)
- Files: kebab-case (`button.vue`, `use-namespace.ts`)
- CSS prefix: `tvc-` (via `useNamespace` hook)
- Internal packages: `@todo-vc/*`

### Package Dependencies (build order)

```
constants → utils → hooks → components → todo-vue-components
```

## Commands

```bash
pnpm dev          # Start play app dev server
pnpm build        # Build all packages
pnpm typecheck    # Type check all packages
pnpm lint         # Lint all files
pnpm lint:fix     # Lint and auto-fix
```

## Git Workflow

- Develop on the designated feature branch
- Commit messages should be clear and descriptive
- Push with: `git push -u origin <branch-name>`
