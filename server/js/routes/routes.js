const fetch = require('node-fetch')

const handleIndexRoute = async (request, response) => {
    const url = 'https://api.twitter.com/1.1/search/tweets.json?q=rhino'
    const res = await fetch(url)
    const data = await res.json()

    if(data) {
        console.log(data)
    } else {
        console.error('not found')
    }
    response.render('../views/index.ejs')
}

const handleAvatarRoute = (request, response) => {
    response.render('../views/avatar.ejs')
}

const handleGameRoute = (request, response) => {
    response.render('../views/game.ejs')
}

module.exports = {
    handleIndexRoute,
    handleAvatarRoute,
    handleGameRoute
}