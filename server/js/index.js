'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').Server(app)
const helmet = require('helmet')
const path = require('path')
const Twitter = require('twitter')
const EventEmitter = require('events')
const io = require('socket.io')(http)
const trackTweets = new EventEmitter()
require('events').EventEmitter.defaultMaxListeners = 1000
const { State } = require('./utils/state')
const { 
    handleIndexRoute,
    handleAvatarRoute,
    handleGameRoute,
    increment,
    lowerTweets
} = require('./routes/routes')

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const state = new State()
state.set('total', 0)
state.set('users', [])

const onData = () => (stream) => {
    stream.on('data', function(event) {
        state.set('total', state.get('total') + 1)
        trackTweets.emit(`tweetsChanged`, state.get('total'))
      })
    
      stream.on('error', function(error) {
        throw error
    })
}

// client.stream('statuses/filter', {track: 'panda,fox,lion'}, onData())
client.stream('statuses/filter', {track: 'panda'}, onData())

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

app.get('/', handleIndexRoute)
app.get('/avatar', handleAvatarRoute)
app.get('/game', handleGameRoute(trackTweets, io, state))

app.post('/game/:animal/:nickname', increment(state, io))
app.post('/lower-tweets', lowerTweets(state, io))

http.listen({ port: process.env.PORT || 4000 }), () => {
    console.log(`listening on port ${process.env.PORT || 4000}`)
}   