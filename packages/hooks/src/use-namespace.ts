// BEM namespace helper for component class naming
// Usage: const ns = useNamespace('button')
// ns.b()                  → 'tvc-button'
// ns.e('icon')            → 'tvc-button__icon'
// ns.m('primary')         → 'tvc-button--primary'
// ns.em('icon', 'large')  → 'tvc-button__icon--large'
// ns.is('disabled', true) → 'is-disabled'  |  false (skipped by Vue)
// ns.be('content', 'text')→ 'tvc-button__content--text'

const defaultPrefix = 'tvc'

export function useNamespace(block: string, prefix = defaultPrefix) {
  const b = () => `${prefix}-${block}`
  const e = (element: string) => `${b()}__${element}`
  const m = (modifier: string) => `${b()}--${modifier}`
  const em = (element: string, modifier: string) => `${e(element)}--${modifier}`
  const be = (block2: string, element: string) => `${b()}-${block2}__${element}`

  // Returns the state class string, or `false` so Vue skips it in :class bindings.
  // Returning '' would add an empty class attribute — false is the correct no-op value.
  const is = (name: string, state: boolean = true): string | false =>
    state ? `is-${name}` : false

  return { b, e, m, em, be, is }
}
