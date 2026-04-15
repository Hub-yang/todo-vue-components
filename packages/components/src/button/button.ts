import type { Component, ExtractPropTypes, PropType } from 'vue'
import type { ButtonNativeType, ButtonType, ComponentSize } from '@todo-vc/constants'

export const buttonProps = {
  /** Visual variant of the button */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default' as ButtonType,
  },
  /** Size: inherits from form context if not set */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default' as ComponentSize,
  },
  /** Disabled state — prevents all interaction */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** Loading state — shows spinner, prevents interaction */
  loading: {
    type: Boolean,
    default: false,
  },
  /** Custom loading icon component (replaces default spinner) */
  loadingIcon: {
    type: Object as PropType<Component>,
    default: undefined,
  },
  /** Pill / fully-rounded corners */
  round: {
    type: Boolean,
    default: false,
  },
  /** Circle shape — use with icon-only content */
  circle: {
    type: Boolean,
    default: false,
  },
  /** Outlined / plain style (inverted fill on hover) */
  plain: {
    type: Boolean,
    default: false,
  },
  /** Text-only — no border or background */
  text: {
    type: Boolean,
    default: false,
  },
  /** Link style — renders like an <a> visually */
  link: {
    type: Boolean,
    default: false,
  },
  /** Stretch to fill container width */
  block: {
    type: Boolean,
    default: false,
  },
  /** Render as this tag/component (polymorphic) */
  tag: {
    type: [String, Object] as PropType<string | Component>,
    default: 'button',
  },
  /** Native <button> type attribute (ignored for non-button tags) */
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button' as ButtonNativeType,
  },
  /** aria-label for icon-only buttons */
  ariaLabel: {
    type: String,
    default: undefined,
  },
} as const

export const buttonEmits = {
  /** Fires on click unless disabled or loading */
  click: (event: MouseEvent) => event instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
