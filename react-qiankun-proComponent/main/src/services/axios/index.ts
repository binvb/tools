import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

let instance:AxiosInstance
class Http {
  public static singleton: any
  public constructor() {
    console.log(11111, '看下实例化多少次')
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
  public static get getInstance(): AxiosInstance {
    if(!instance) {
      this.singleton = new Http()
    }
    return instance
  }
  public get<T, R, D>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return instance.get<T, R, D>(url, config)
  }
  public post<T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return instance.post<T, R, D>(url, data, config)
  }
  public put<T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return instance.put<T, R, D>(url, data, config)
  }
  public patch<T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return instance.patch<T, R, D>(url, data, config)
  }
  public delete<T, R, D>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return instance.get<T, R, D>(url, config)
  }
}

export default Http.getInstance