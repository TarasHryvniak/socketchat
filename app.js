const express = require('express')
const app = express()
const server = require('http').createServer(app)
const config = require('config')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const io = require('socket.io')(server,{
    cors:{
        origin: "*"
    }
})

app.use(express.json({extended: true}))
app.use(cookieParser(config.get('cookieSecret')))
app.use('/api/auth/', require('./routes/auth.routes'))
app.use('/api/chat/', require('./routes/chat.routes'))

global.usersDialogs = new Map()
global.user = []

const PORT = config.get("port")

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        server.listen(PORT, () => {
            console.log(`still alive on ${PORT}`)
        })
    } catch (e) {
        console.log(`Server Error`, e.message)
        process.exit(1)
        }
}

io.use((socket, next) =>{
    socket.sessionId = socket.handshake.auth.user.userId
    socket.user = socket.handshake.auth.user
    socket.users = [...socket.handshake.auth.users]
    next()
})

io.on('connection', (socket) =>{
    users = [...socket.users]
    for(let [id, socket] of io.of('/').sockets){
        for(let user of users){
            if(user.userId === socket.user.userId){
                user.socketId = id,
                socket.user.socketId = id,
                user.connected = true
            }
        }
    }
    socket.emit('session', {
        sessionId: socket.sessionId,
        user: socket.user,
        users: socket.users
    })
    socket.emit('users', users)

    socket.broadcast.emit('user connected', {
        userName: socket.user.userName,
        userId: socket.user.userId,
        sessionId: socket.user.sessionId,
        sessionId: socket.sessionId,
        socketId: socket.user.socketId
    })

    socket.on('private message',({ dialogId, message, to}) =>{
        for(user of users){
            if(user.userId === to){
                socket.emit('message sended', {
                    dialogId,
                    message,
                    to
                  })
                socket.to(user.socketId).emit('private message', {
                    dialogId,
                    message,
                    from: socket.user.userId,
                  })
                  break
            }
        }
    })

    socket.on('dialog loaded', (payload) =>{
        socket.emit('dialog loaded', {...payload})
    })

    socket.on("disconnect", async () => {
        const matchingSockets = await io.in(socket.sessionId).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
          socket.broadcast.emit("user disconnected", socket.user.userId);
        }
      })
})

start()
