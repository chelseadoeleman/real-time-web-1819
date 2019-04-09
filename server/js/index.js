'use strict'

const express = require('express')
const helmet = require('helmet')
const path = require('path')
const compression = require('compression')
const { decompress } = require('./helpers/decompress')
const app = express()
const http = require('http').Server(app)
const handleIndexRoute = require('./routes/indexRoute')
const io = require('socket.io')(http)

app.get('*.js', decompress)
app.get('*.css', decompress)

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))
app.use(compression({
    filter: (request) => {
        if(request.headers.accept) {
            return request.headers.accept.includes('text/html')
        }
        return false
    }
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', handleIndexRoute)

io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('disconnect', function(){
        console.log('user disconnected')
      })
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg)
    })
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg)
    })
})

http.listen({ port: process.env.PORT || 8000 }), () => {
    process.on('SIGTERM')
    console.log(`listening on port ${process.env.PORT || 8000}`)
}
