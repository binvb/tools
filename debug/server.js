const net = require('net')

const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.end('hello\r\n');
})

server.on('error', (err) => {
  throw err;
});
server.listen(3000, () => {
  console.log('server bound');
});