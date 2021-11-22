import Koa from 'koa'

const app = new Koa()
const port = 3005

app.use((ctx, next) => {
  ctx.body = 'hello world'
  next()
})

app.listen(port, () => {
  console.log(`listening port:${port}`)
})