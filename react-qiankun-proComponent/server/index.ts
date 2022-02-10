import Koa from 'koa'
import cors from '@koa/cors'

const app = new Koa()

app.use(cors())
app.use((ctx, next) => {
  ctx.body = {
    code: 200,
    data: {
      name: 'vb'
    }
  }
})

app.listen(3002, () => {
  console.log(`listening 3002`)
})