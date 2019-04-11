'use strict'

const express = require('express')
const helmet = require('helmet')
const path = require('path')
const bodyParser = require('body-parser')
const compression = require('compression')
const { decompress } = require('./helpers/decompress')
const app = express()
const http = require('http').Server(app)
const { handleIndexRoute } = require('./routes/indexRoute')
const io = require('socket.io')(http)
const emoticons = [
    {name: 'api', emoticon: '🐒'},
    {name: 'boom', emoticon: '🌳'},
    {name: 'zon', emoticon: '☀️'},
    {name: 'nederland', emoticon: '🇳🇱'},
    {name: 'vakantie', emoticon: '🏝'},
    {name: 'sneeuw', emoticon: '❄️'},
    {name: 'ijs', emoticon: '🍦'},
    {name: 'perzik', emoticon: '🍑'},
    {name: 'banaan', emoticon: '🏝'},
    {name: 'hou van jou', emoticon: '❤️'},
    {name: 'auto', emoticon: '🚗'},
    {name: 'vliegtuig', emoticon: '✈️'},
    {name: 'voetbal', emoticon: '⚽️'},
    {name: 'pizza', emoticon: '🍕'},
    {name: 'banaan', emoticon: '🍌'},
    {name: 'wintersport', emoticon: '⛷ 🏂'},
    {name: 'tennis', emoticon: '🎾'},
    {name: 'winter', emoticon: '☃️'},
    {name: 'lente', emoticon: '🌸'},
    {name: 'zomer', emoticon: '🌴'},
    {name: 'herfst', emoticon: '🍄'}
]

app.get('*.js', decompress)
app.get('*.css', decompress)

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))
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

    socket.on('chat message', function(payload){
        let { message, ...restProps } = payload
        
        emoticons.forEach(({ name, emoticon }) => {
            const newMessage = message.toLowerCase().replace(name, emoticon)
            message = `${newMessage[0].toUpperCase()}${newMessage.slice(1)}`
        })
        const greetingWords = ['Hoi','Hee','Hallo','Hey','Heei','Hello','Hi']
        const includesGreetingWord = greetingWords.find((word) => message.includes(word))

        io.emit('chat message', {
            ...restProps,
            message: includesGreetingWord
                ? `${message} 😊`
                : message
        })
    })

    socket.on('disconnect', function(){
        console.log('user disconnected')
    })
})

http.listen({ port: process.env.PORT || 8000 }), () => {
    process.on('SIGTERM')
    console.log(`listening on port ${process.env.PORT || 8000}`)
}
