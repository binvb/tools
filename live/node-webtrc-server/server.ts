import { WebSocketServer } from 'ws'
import { User, Msg } from './server.d'
import { handler } from './handler'

const socket = new WebSocketServer({ port: 8080 })
const userList:User = {}

socket.on('connection', function connection(ws) {
  ws.on('message', function message(message, isBinary) {
    handler(JSON.parse(message.toString()), userList, ws)

    // ws.send(JSON.stringify(_result))
  })
  // console.log(wss.clients, 'check connection list')
})