import { createApp } from 'vue'
import App from './App.vue'

window.tryCatchHandle = (err, filePath, functionType, functionName) => {
  // 这里进行错误上报操作
  console.log(err, filePath, functionType, functionName)
}
createApp(App).mount('#app')
