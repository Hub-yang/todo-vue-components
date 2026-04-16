import type { App, Component } from 'vue'

export type WithInstall<T extends Component> = T & { install: (app: App) => void }

export function withInstall<T extends Component>(component: T): WithInstall<T> {
  const comp = component as WithInstall<T>
  comp.install = (app: App) => {
    const name = (comp as { name?: string }).name
    if (name) app.component(name, comp)
  }
  return comp
}
