import Koa from 'koa'
import { parseSource } from './sourceMap'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const port = 3005

app.use(bodyParser())
app.use(async (ctx, next) => {
  const result = await parseSource(ctx.query.source as string, +(ctx.query.lineno as string), +(ctx.query.colno as string))
  ctx.body = result
})

app.listen(port, () => {
  console.log(`running port: ${port}`)
})