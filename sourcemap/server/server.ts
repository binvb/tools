import Koa from 'koa'
import { parseSource } from './sourceMap'

const app = new Koa()
const port = 3005

app.use(async (ctx, next) => {
  const result = await parseSource('http://127.0.0.1:8080/static/js/main.e0d5fc9b.js', 2, 133262)
  ctx.body = result
})

app.listen(port, () => {
  console.log(`running port: ${port}`)
})