import { createApp } from 'vue'
import App from './App.vue'

window.tryCatchHandle = (err) => {
  console.log(err, '这里进行错误上报操作')
}
createApp(App).mount('#app')
