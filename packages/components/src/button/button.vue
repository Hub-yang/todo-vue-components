<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@todo-vc/hooks'
import { buttonEmits, buttonProps } from './button'

defineOptions({ name: 'TButton' })

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const ns = useNamespace('button')

// ─── Expose the native element for external ref access ───────────────────────
const buttonRef = ref<HTMLElement | null>(null)
defineExpose({ ref: buttonRef })

// ─── Computed state ───────────────────────────────────────────────────────────
const isDisabled = computed(() => props.disabled || props.loading)

/**
 * Class list built from static string maps so UnoCSS's static scanner
 * can extract every class at build time — no dynamic string interpolation.
 */
const classes = computed(() => [
  ns.b(),
  TYPE_CLASSES[props.type],
  SIZE_CLASSES[props.size],
  props.plain && PLAIN_CLASSES[props.type],
  props.text && TEXT_CLASSES[props.type],
  props.link && LINK_CLASSES[props.type],
  props.round && 'rounded-full',
  props.circle && CIRCLE_SIZE_CLASSES[props.size],
  props.block && 'w-full',
  ns.is('disabled', isDisabled.value),
  ns.is('loading', props.loading),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('plain', props.plain),
  ns.is('text', props.text),
  ns.is('link', props.link),
])

// ─── Click handler ────────────────────────────────────────────────────────────
function handleClick(event: MouseEvent) {
  // Guard against clicks that bubble through pointer-events-none (e.g. child elements)
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}

// ─── Static class maps (all strings visible to UnoCSS scanner) ────────────────

const TYPE_CLASSES = {
  default: 'bg-white text-gray-700 border-gray-300 hover:text-blue-500 hover:border-blue-400 hover:bg-blue-50 active:text-blue-600 active:border-blue-500 focus-visible:ring-blue-400',
  primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-400 hover:border-blue-400 active:bg-blue-600 active:border-blue-600 focus-visible:ring-blue-500',
  success: 'bg-green-500 text-white border-green-500 hover:bg-green-400 hover:border-green-400 active:bg-green-600 active:border-green-600 focus-visible:ring-green-500',
  warning: 'bg-amber-500 text-white border-amber-500 hover:bg-amber-400 hover:border-amber-400 active:bg-amber-600 active:border-amber-600 focus-visible:ring-amber-500',
  danger:  'bg-red-500 text-white border-red-500 hover:bg-red-400 hover:border-red-400 active:bg-red-600 active:border-red-600 focus-visible:ring-red-500',
  info:    'bg-gray-400 text-white border-gray-400 hover:bg-gray-300 hover:border-gray-300 active:bg-gray-500 active:border-gray-500 focus-visible:ring-gray-400',
} as const

const SIZE_CLASSES = {
  large:   'h-10 px-5 text-base gap-2',
  default: 'h-8 px-4 text-sm gap-1.5',
  small:   'h-7 px-3 text-xs gap-1',
} as const

// Circle removes padding and enforces square aspect via fixed w/h
const CIRCLE_SIZE_CLASSES = {
  large:   'rounded-full p-0 w-10 h-10',
  default: 'rounded-full p-0 w-8 h-8',
  small:   'rounded-full p-0 w-7 h-7',
} as const

// Plain: tinted background, colored border, fills solid on hover
const PLAIN_CLASSES = {
  default: 'bg-white text-gray-600 border-gray-300 hover:text-blue-500 hover:border-blue-400 hover:bg-blue-50',
  primary: 'bg-blue-50 text-blue-500 border-blue-200 hover:bg-blue-500 hover:text-white hover:border-blue-500',
  success: 'bg-green-50 text-green-500 border-green-200 hover:bg-green-500 hover:text-white hover:border-green-500',
  warning: 'bg-amber-50 text-amber-500 border-amber-200 hover:bg-amber-500 hover:text-white hover:border-amber-500',
  danger:  'bg-red-50 text-red-500 border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500',
  info:    'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-500 hover:text-white hover:border-gray-500',
} as const

// Text: no border, no background — only colored text
const TEXT_CLASSES = {
  default: 'text-gray-700 border-transparent bg-transparent hover:bg-gray-100',
  primary: 'text-blue-500 border-transparent bg-transparent hover:bg-blue-50',
  success: 'text-green-500 border-transparent bg-transparent hover:bg-green-50',
  warning: 'text-amber-500 border-transparent bg-transparent hover:bg-amber-50',
  danger:  'text-red-500 border-transparent bg-transparent hover:bg-red-50',
  info:    'text-gray-400 border-transparent bg-transparent hover:bg-gray-50',
} as const

// Link: text-only, underline on hover, no border/bg
const LINK_CLASSES = {
  default: 'text-gray-700 border-transparent bg-transparent hover:text-blue-500 hover:underline',
  primary: 'text-blue-500 border-transparent bg-transparent hover:text-blue-400 hover:underline',
  success: 'text-green-500 border-transparent bg-transparent hover:text-green-400 hover:underline',
  warning: 'text-amber-500 border-transparent bg-transparent hover:text-amber-400 hover:underline',
  danger:  'text-red-500 border-transparent bg-transparent hover:text-red-400 hover:underline',
  info:    'text-gray-400 border-transparent bg-transparent hover:text-gray-300 hover:underline',
} as const
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    :class="classes"
    :disabled="tag === 'button' ? isDisabled : undefined"
    :type="tag === 'button' ? nativeType : undefined"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel"
    :tabindex="isDisabled ? -1 : undefined"
    @click="handleClick"
  >
    <!-- Loading spinner (shown when loading=true, replaces icon slot) -->
    <span v-if="loading" :class="ns.e('loading-icon')" aria-hidden="true">
      <component :is="loadingIcon" v-if="loadingIcon" />
      <!-- Default SVG spinner -->
      <svg
        v-else
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
             7.962 0 014 12H0c0 3.042 1.135 5.568 3 7.422l3-2.13z"
        />
      </svg>
    </span>

    <!-- Icon slot (left of text; hidden while loading to avoid duplicate) -->
    <span v-else-if="$slots.icon" :class="ns.e('icon')" aria-hidden="true">
      <slot name="icon" />
    </span>

    <!-- Default slot: text content -->
    <span v-if="$slots.default" :class="ns.e('content')">
      <slot />
    </span>

    <!-- Trailing icon slot (right of text) -->
    <span v-if="$slots['icon-right'] && !loading" :class="ns.e('icon-right')" aria-hidden="true">
      <slot name="icon-right" />
    </span>
  </component>
</template>

<style scoped>
/* Base layout — these classes are listed here as a documentation reference.
   The actual UnoCSS classes are applied via :class binding in the template. */
.tvc-button {
  /* Inline-flex layout, no text wrap, smooth transitions */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.375rem; /* rounded-md default */
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition-property: color, background-color, border-color, opacity, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  outline: none;
}

.tvc-button:focus-visible {
  --un-ring-offset-width: 2px;
  --un-ring-width: 2px;
  box-shadow:
    0 0 0 var(--un-ring-offset-width) white,
    0 0 0 calc(var(--un-ring-offset-width) + var(--un-ring-width)) var(--un-ring-color, currentColor);
}

/* Disabled / loading state */
.tvc-button.is-disabled,
.tvc-button.is-loading {
  pointer-events: none;
  opacity: 0.5;
}

.tvc-button.is-loading {
  opacity: 0.75;
  cursor: wait;
}

/* Loading icon spin */
.tvc-button__loading-icon {
  display: inline-flex;
  align-items: center;
}
</style>
