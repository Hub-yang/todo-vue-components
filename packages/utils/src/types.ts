export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object'
export const isFunction = (val: unknown): val is (...args: unknown[]) => unknown =>
  typeof val === 'function'
export const isArray = Array.isArray
export const isUndefined = (val: unknown): val is undefined => val === undefined
export const isNil = (val: unknown): val is null | undefined => val === null || val === undefined
