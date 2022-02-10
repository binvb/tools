import axios, { AxiosInstance } from 'axios'

let instance:AxiosInstance
class Http {
  constructor() {
    instance = axios.create({
      baseURL: 'http://127.0.0.1:3002',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-CHAT-TERMINAL': 'PC', // 终端
        'X-CHAT-VERSION': '1.0.0', // 版本
      }
    })
  }
  static get getInstance(): AxiosInstance {
    if(!instance) {
      new Http()
    }
    return instance
  }
}

export default Http.getInstance