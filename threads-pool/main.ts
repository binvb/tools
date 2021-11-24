import Koa from 'koa'
import ThreadPool from './threadPool'
import { sum } from './sum'

const app = new Koa()
const pool = new ThreadPool(2)

app.use(async (ctx) => {
  // let result = await pool.run(sum)
  let result = await pool.run(sum, [13,5])
  ctx.body = `my age is: ${result}, so young\n`
})

app.listen(3006, () => {
  console.log(`listenning 3006`)
})