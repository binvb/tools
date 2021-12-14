const http = require('http')

http.createServer((req, res) => {
  res.end('hello world!\n')
}).listen(3007, () => {
  console.log('running...')
})