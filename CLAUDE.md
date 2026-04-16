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

### Component Workflow (step-by-step)

#### 1. Create the component directory

```
packages/components/src/<name>/
├── <name>.ts      # Props definition (buttonProps), emits, TS types
├── <name>.vue     # SFC — script setup + template + scoped style
└── index.ts       # withInstall() wrapper + re-export types
```

#### 2. Define props & emits in `<name>.ts`

```ts
import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '@todo-vc/constants'

export const myProps = { ... } as const
export const myEmits = { click: (e: MouseEvent) => e instanceof MouseEvent }
export type MyProps = ExtractPropTypes<typeof myProps>
```

- Keep shared enum values (sizes, types, statuses) in `@todo-vc/constants`
- Use `as const` on the props object so TypeScript can infer literal types

#### 3. Implement the SFC (`<name>.vue`)

```ts
defineOptions({ name: 'TMyComponent' }) // PascalCase, T-prefix
const props = defineProps(myProps)
const emit = defineEmits(myEmits)
const ns = useNamespace('my-component') // → 'tvc-my-component'
defineExpose({ ref: elRef }) // expose native element
```

**Styling rule:** Use static UnoCSS class-map objects so the scanner can
extract every class at build time. Never build class strings via interpolation.

```ts
const TYPE_CLASSES = {
  primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-400',
  danger: 'bg-red-500 text-white border-red-500 hover:bg-red-400',
} as const
```

#### 4. Export from `index.ts`

```ts
import { withInstall } from '@todo-vc/utils'
import MyComponent from './my-component.vue'

export const TMyComponent = withInstall(MyComponent)
export type { MyProps } from './my-component'
```

#### 5. Register in `packages/components/src/index.ts`

```ts
export * from './my-component'
```

#### 6. Preview in `play/src/App.vue`

Import from `todo-vue-components` (the public entry) and cover every prop,
slot, emit, and edge case in the playground.

### Naming Conventions

| Item              | Convention                | Example                          |
| ----------------- | ------------------------- | -------------------------------- |
| Component         | PascalCase with T-prefix  | `TButton`, `TInput`              |
| Files             | kebab-case                | `button.vue`, `use-namespace.ts` |
| CSS class prefix  | `tvc-` via `useNamespace` | `tvc-button`, `tvc-button__icon` |
| Internal packages | `@todo-vc/*` scoped       | `@todo-vc/hooks`                 |
| Slot names        | kebab-case                | `#icon`, `#icon-right`           |

### Accessibility Checklist (every component)

- `aria-disabled` on disabled state (not only HTML `disabled`)
- `aria-busy` on loading state
- `aria-label` prop for icon-only variants
- `tabindex="-1"` when disabled (so Tab skips it)
- `role` if not using semantic HTML element

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
