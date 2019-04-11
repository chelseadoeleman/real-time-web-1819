const handleIndexRoute = async (request, response) => {
    response.status(200).render('pages/index')
}

module.exports =  {
    handleIndexRoute
}