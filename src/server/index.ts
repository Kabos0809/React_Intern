import { createServer } from 'http'
import { Server as socketioServer, Socket } from 'socket.io'
import express from 'express'

const port = 3000
const app = express()
const server = createServer(app)

const io = new socketioServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket: Socket) => {
  console.log('Connected!')
  socket.on('disconnect', () => {
    console.log('Disconnected')
  })
})

server.listen(port)
console.log(`Server is on on PORT: ${port}`)
