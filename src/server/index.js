const express = require('express')
const port = 4000
const app = express()
const server = require('http').createServer(app)

const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log('Connected!')

    socket.on('disconnect', () => {
        console.log('Disconnected')
    })

    socket.on('chat-message', (msg) => {
        io.emit('chat', msg)
    })
})

server.listen(port)
console.log(`Server is working on PORT: ${port}`)