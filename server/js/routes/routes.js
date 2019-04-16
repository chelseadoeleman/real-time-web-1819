const fetch = require('node-fetch')

const handleIndexRoute = (request, response) => {
      response.render('../views/index.ejs')
}

module.exports = {
    handleIndexRoute
}