'use strict'

const express = require('express')
const helmet = require('helmet')
const path = require('path')
const { 
    handleIndexRoute,
    handleAvatarRoute,
    handleGameRoute
} = require('./routes/routes')
const app = express()

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

app.get('/', handleIndexRoute)
app.get('/avatar', handleAvatarRoute)
app.get('/game', handleGameRoute)

app.listen({ port: process.env.PORT || 4000 }), () => {
    console.log(`listening on port ${process.env.PORT || 4000}`)
}   