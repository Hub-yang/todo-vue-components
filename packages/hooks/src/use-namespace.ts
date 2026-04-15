// BEM namespace helper for component class naming
// Usage: const ns = useNamespace('button')
// ns.b()           → 'tvc-button'
// ns.e('icon')     → 'tvc-button__icon'
// ns.m('primary')  → 'tvc-button--primary'
// ns.em('icon', 'large') → 'tvc-button__icon--large'

const defaultPrefix = 'tvc'

export function useNamespace(block: string, prefix = defaultPrefix) {
  const b = () => `${prefix}-${block}`
  const e = (element: string) => `${b()}__${element}`
  const m = (modifier: string) => `${b()}--${modifier}`
  const em = (element: string, modifier: string) => `${e(element)}--${modifier}`
  const is = (name: string, state?: boolean | string) =>
    state !== false && state !== undefined ? `is-${name}` : ''

  return { b, e, m, em, is }
}
