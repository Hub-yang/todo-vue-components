// ─── Size ────────────────────────────────────────────────────────────────────
export const COMPONENT_SIZES = ['large', 'default', 'small'] as const
export type ComponentSize = (typeof COMPONENT_SIZES)[number]

// ─── Status ───────────────────────────────────────────────────────────────────
export const COMPONENT_STATUSES = ['success', 'warning', 'error', 'info'] as const
export type ComponentStatus = (typeof COMPONENT_STATUSES)[number]

// ─── Button ───────────────────────────────────────────────────────────────────
export const BUTTON_TYPES = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export type ButtonType = (typeof BUTTON_TYPES)[number]

export const BUTTON_NATIVE_TYPES = ['button', 'submit', 'reset'] as const
export type ButtonNativeType = (typeof BUTTON_NATIVE_TYPES)[number]

// ─── Shared types ─────────────────────────────────────────────────────────────
export type EventHandler<T = Event> = (event: T) => void
