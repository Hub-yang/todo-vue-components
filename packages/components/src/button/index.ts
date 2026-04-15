import { withInstall } from '@todo-vc/utils'
import Button from './button.vue'

export const TButton = withInstall(Button)
export default TButton

// Re-export props/types so consumers can import them directly
export type { ButtonEmits, ButtonProps } from './button'
export { buttonEmits, buttonProps } from './button'
