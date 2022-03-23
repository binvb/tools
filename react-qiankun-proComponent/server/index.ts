import Koa from 'koa'
import cors from '@koa/cors'
const utils = require('./utils')

const app = new Koa()

app.use(cors())
app.use(async(ctx, next) => {
  utils.changePeriod()
  console.log(require.cache)
  await utils.sleep()
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