import { App, h } from 'vue'
import { useMountComponent } from './../utils/useMountComponent'
import ToastComponent from './index.vue'
import './index.css'
import "tailwindcss/tailwind.css"

export interface ToastFn {
  (message: string, duration?: number): void
}

const toast: ToastFn = (message, duration=2000) => {
  const { unmount } = useMountComponent(
    h(ToastComponent, {
      message
    })
  )

  // 消除实例
  setTimeout(() => {
    unmount()
  }, duration)
}
function install(app: App) {
  app.config.globalProperties.$toast = toast
}

export default {
  install
}