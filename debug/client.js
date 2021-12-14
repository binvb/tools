const net = require('net');

const socket = net.createConnection(9229);
socket.on('data', (data) => {
  console.log(data.toString())
});

process.stdin.on('data', (data) => {
  const json = data.toString();
  const msg = `Content-Length: ${Buffer.byteLength(json, 'utf8')}\r\n\r\n${json}`;
  socket.write(msg, 'utf8');
});