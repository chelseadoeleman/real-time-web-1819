'use strict'

require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const Twitter = require('twitter')
const { 
    handleIndexRoute,
    handleAvatarRoute,
    handleGameRoute, 
    createAvatar
} = require('./routes/routes')
const app = express()
 
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const userData = [{
    id: undefined,
    avatar: undefined,
    name: undefined,
    lives: undefined
}]
 
client.stream('statuses/filter', {track: 'rhino'}, (stream) => {
  stream.on('data', function(event) {
    const text = event && event.text
    const data = {
        'text': text
    }
    console.log(data)
    // data.map(result => {
        
    // })
  })

  stream.on('error', function(error) {
    throw error
  })
})

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

app.get('/', handleIndexRoute)
app.get('/avatar', handleAvatarRoute)
app.get('/game', handleGameRoute)

app.post('/avatar', createAvatar)

app.listen({ port: process.env.PORT || 4000 }), () => {
    console.log(`listening on port ${process.env.PORT || 4000}`)
}   