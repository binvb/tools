import Koa from 'koa'

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = `hello wrold!\n`
})

app.listen(3001, () => {
  console.log(`running...`)
})