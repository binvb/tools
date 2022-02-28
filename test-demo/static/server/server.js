import Koa from 'koa'
import fs from 'fs'
import mime from 'mime-types'
import cors from 'koa-cors'
import path from 'path'
import http2 from 'http2'
import https from 'https'

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

http2.createSecureServer({
  "key": fs.readFileSync(path.resolve("./local.vb.tech-key.pem")),
  "cert": fs.readFileSync(path.resolve("./local.vb.tech.pem"))
}, app.callback()).listen(8002);

// https.createServer({
//   "key": fs.readFileSync(path.resolve("./local.vb.tech-key.pem")),
//   "cert": fs.readFileSync(path.resolve("./local.vb.tech.pem"))
// }, app.callback()).listen(8002);