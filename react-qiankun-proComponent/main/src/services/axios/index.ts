import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { notification } from 'antd';

interface ResponseError {
  errorMessage: string;
  code: number;
}

let singletonInstance:AxiosInstance
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户未得到授权，访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  409: '请求针对的资源已存在，无法创建',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
// 单例模式
class Axios {
  constructor() {
    singletonInstance = axios.create({
      baseURL: 'http://127.0.0.1:3000',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-CHAT-Token': '1241'
      }
    })

    // 请求前拦截
    singletonInstance.interceptors.request.use((config) => {})
    // 请求后拦截
    singletonInstance.interceptors.response.use((res) => {})
  }
  errorHandle(error: ResponseError) {
    if (!error) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  }

  static get instance(): AxiosInstance {
    if(!singletonInstance) {
      new Axios()
    }
    return singletonInstance
  }
}

export default Axios.instance