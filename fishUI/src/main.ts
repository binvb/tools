import { createApp } from 'vue'
import App from './App.vue'
import Toast, {ToastFn} from './../packages/toast/index'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: ToastFn
  }
}

createApp(App).use(Toast).mount('#app')

