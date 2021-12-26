import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

// 自定义try...catch包裹的rollup插件报错
window.tryCatchHandle = (err, filePath, functionType, functionName) => {
  // 这里进行错误上报操作
  console.log(err, filePath, functionType, functionName)
}
// 同步代码异常报错, setTimeout/setInterval
window.onerror = (message, source, lineno, colno, error) => {
  // 这里进行错误上报操作
  console.log(message, source, lineno, colno, error)
}
// promise 异步代码异常报错
window.addEventListener("unhandledrejection", (e) => {
  // 这里进行上报
  console.log(e.reason)
  e.preventDefault() // 阻止错误冒泡
}, true)
// 静态资源异常报错
window.addEventListener('error', (e) => {
  let _url = ''

  // 远程资源加载异常
  if(e.target instanceof HTMLElement) {
    if(e.target instanceof HTMLAnchorElement) {
      _url = e.target.href
    } else {
      // maybe other htmlelement has src property
      _url = (e.target as HTMLImageElement).src
    }
    // 这里进行上报
    console.log(e, _url)
  }
  console.log('这里会不会有')
}, true)
app.config.errorHandler = (err, vm, info) => {
  // 这里进行错误上报
  console.log(err, vm, info)
}
app.mount('#app')
