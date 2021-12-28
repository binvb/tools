import Koa from 'koa'
import http from 'http'

const socket = require('socket.io')
const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)
const port = 3001

io.on('connection', () => { 
  console.log(111111)
})

server.listen(port, () => {
  console.log(`running port: ${port}`)
})