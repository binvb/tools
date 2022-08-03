import { createApp } from 'vue'
import App from './App.vue'
import Toast, {ToastFn} from './../packages/toast/index'
import VirtualList from './../packages/virtual-list/index'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: ToastFn
  }
}

createApp(App).use(VirtualList).use(Toast).mount('#app')

