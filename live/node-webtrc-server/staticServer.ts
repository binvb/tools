import Koa from 'koa'
import https from 'https'
import status from 'koa-static'
import path from 'path'
import fs from 'fs'

const app = new Koa()
const httpsOptions = {
  key: fs.readFileSync(path.resolve("./local.vb.tech-key.pem")),
  cert: fs.readFileSync(path.resolve("./local.vb.tech.pem"))
}

app.use(status(path.resolve(__dirname, './static')))

https.createServer(httpsOptions,app.callback()).listen(443)