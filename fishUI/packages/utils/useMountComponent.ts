import { createApp, Component } from 'vue'

export function useMountComponent(component: Component) {
  const app = createApp(component)
  const root = document.createElement('div')

  document.body.appendChild(root)
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    }
  }
}