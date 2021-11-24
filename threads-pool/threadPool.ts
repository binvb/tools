import { Worker } from 'worker_threads'
import { workerTs } from './helper'

type TaskType = 'resolve' | 'reject' | 'fn'
type Task = {
  [P in TaskType]: Function
}
interface Thread {
  state: 'active' | 'empty' // 任务进行中, 无任务
  worker: Worker,
}

class ThreadPool {
  private taskQueue: (Task & {args?: any[]})[] = [] // 任务队列
  private pools: Thread[] = [] // 线程池
  private numberOfThreads = 1 // 线程数量
  private active = false     // 队列状态，激活中/休眠
  constructor(numberOfThreads:number) {
    this.numberOfThreads = numberOfThreads
    this.init()
  }
  // 暴露执行接口, fn: 回调函数, args: 数组形式传参
  public run(fn: Function, args?: any[]):Promise<any> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({
        resolve,
        reject,
        fn,
        args: args ? args : []
      })
      if(!this.active) {
        this.activeQueue()
      }
    })
  }
  private init() {
    // 创建多个线程
    for(let i = 0; i < this.numberOfThreads; i += 1) {
      this.pools.push({
        state: 'empty',
        worker: workerTs('./worker.ts', {})
      })
    }
  }
  // 激活队列
  private activeQueue() {
    if(this.taskQueue.length) {
      let _thread = this.getAvailbelTread() as Thread

      if(_thread) {
        let _task = this.taskQueue.shift() as (Task & {args?: any[]})

        _thread.worker.once('message', (data) => {
          _task.resolve(data);
          _thread.state = 'empty'
        })
        _thread.worker.once('error', (err) => {
          _task.reject(err)
        })
        _thread.worker.postMessage(`() => {
          return {fn: ${_task.fn}, args: ${JSON.stringify(_task.args)}}
        }`)
        this.active = true
      }
      // 递归调用
      this.activeQueue()
    } else {
      this.active = false
    }
  }
  // 获取有效线程(空闲)
  private getAvailbelTread():Thread | false {
    for(const thread of this.pools) {
      // 如果工作线程已经停止，则resourceLimits返回值是空对象。
      // state标识进程是否有任务进行中
      if(thread.worker.resourceLimits?.stackSizeMb && thread.state === 'empty') {
        thread.state = 'active'
        return thread
      }
    }
    return false
  }
}

export default ThreadPool