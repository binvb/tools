import Koa from 'koa'
import { sleep } from './utils'
import counterMiddleWare from './middleware/counter'

const app = new Koa()
const port = 3000

app.use(counterMiddleWare) // 统计请求次数
app.use(async (ctx) => {
  const r = Math.random() * 100
  await sleep(r)
  if (r > 90) {
    ctx.status = 400
  }
  ctx.body = r
})

app.listen(port, () => {
  console.log(`listening port: ${port}`)
})