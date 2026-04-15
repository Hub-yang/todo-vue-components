// Component size constants
export const COMPONENT_SIZES = ['large', 'default', 'small'] as const
export type ComponentSize = (typeof COMPONENT_SIZES)[number]

// Component status constants
export const COMPONENT_STATUSES = ['success', 'warning', 'error', 'info'] as const
export type ComponentStatus = (typeof COMPONENT_STATUSES)[number]

// Event handler type
export type EventHandler<T = Event> = (event: T) => void
