import { register, Counter, AggregatorRegistry, collectDefaultMetrics, Registry } from 'prom-client'
import { Context, Next } from 'koa'

const counter = new Counter({
  name: 'http_requests_total',
  help: 'Counter for total requests received',
  labelNames: ['path', 'method', 'status'], // labels 为了统计分组, 可以区分不同维度的指标
})
const defaultRegistry = new Registry()

defaultRegistry.setDefaultLabels({app: 'node-prom-example'})
collectDefaultMetrics({ register: defaultRegistry })
async function counterMiddleWare(ctx: Context, next: Next) {
    // 路径 /metrics 为监控指标 route, 返回指标
    if (ctx.path === '/metrics') {
      ctx.set('Content-Type', defaultRegistry.contentType)
      let result = await defaultRegistry.metrics()
      console.log(result, '看看')
      ctx.body = await defaultRegistry.metrics()
      return
    }
  
    // 其他路由均统计指标
    try {
      await next()
    } finally {
      const labels = {
        path: ctx.path,
        method: ctx.method,
        status: ctx.status,
      }
      counter.inc(labels, 1)
    }
}

export default counterMiddleWare