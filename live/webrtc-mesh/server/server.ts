import { WebSocketServer } from 'ws'

const port = 8082
const wss = new WebSocketServer({ port: port })

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data)
  })
  wss.clients.forEach(client => {
    client.send('hi')
  })
})


