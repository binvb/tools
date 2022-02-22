import Koa from 'koa'
import fs from 'fs'
import mime from 'mime-types'
import cors from 'koa-cors'
import path from 'path'

const app = new Koa()
function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
}

app.use(cors())
app.use(async(ctx, next) => {
  const src = fs.createReadStream(path.resolve(`./static${ctx.path}`))

  ctx.response.set('content-type', 'application/javascript')
  // if( ctx.path === '/b.js') {
  //   await sleep()
  // }
  ctx.body = src
})

app.listen(80, () => {
  console.log('running...')
})
