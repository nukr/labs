const http = require('http')

const state = {
  is_shutdown: false
}

const server = http.createServer((req, res) => {
  if (state.is_shutdown) {
    res.setHeader('Connection', 'close')
    res.end('close')
  } else {
    setTimeout(() => {
      res.end('hihi')
    }, 500)
  }
})

// const sockets = {}
// server.on('connection', (socket) => {
//   sockets[`${socket.remoteAddress}:${socket.remotePort}`] = socket
// })

process.on('SIGTERM', () => {
  console.log('sigterm')
  state.is_shutdown = true
  server.close(() => {
    console.log('server closed')
  })
  // setTimeout(() => {
  //   console.log('destroy connections')
  //   Object.keys(sockets).forEach((key) => {
  //     sockets[key].setTimeout(500, () => {
  //       sockets[key].destroy()
  //     })
  //   })
  // }, 1000)
  // server.close(() => {
  //   console.log('server closed')
  // })
})

server.listen(3000)
