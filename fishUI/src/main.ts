import { createApp } from 'vue'
import App from './App.vue'
import './normalize.css'
import Toast, {ToastFn} from './../packages/toast/index'
import VirtualList from './../packages/virtual-list/index'
import { createPinia } from 'pinia'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: ToastFn
  }
}

createApp(App).use(VirtualList).use(Toast).use(createPinia()).mount('#app')

