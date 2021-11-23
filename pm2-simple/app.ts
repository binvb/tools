import Koa from 'koa'

const app = new Koa()
const port = 3005

app.use((ctx, next) => {
  ctx.body = `hello world, my pid is: ${process.pid}`
  next()
})

app.listen(port, () => {
  // console.log(`my pid is: ${process.pid}`)
})