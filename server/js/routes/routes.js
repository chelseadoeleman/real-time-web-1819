require('dotenv').config()

const userData = [{
    id: undefined,
    avatar: undefined,
    name: undefined,
    lives: undefined
}]

const handleIndexRoute = async (request, response) => {
    response.render('../views/index.ejs')
}

const handleAvatarRoute = (request, response) => {
    response.render('../views/avatar.ejs')
}

const handleGameRoute = (tracktweets, io, state) => (request, response) => {
    const { animal, nickname } = request.query

    if(animal && nickname) {
        response.render('../views/game.ejs', { animal, nickname })
        io.on('connection', function(socket) {
            console.log('user connected')
            tracktweets.on('pandaChange', (dataChange) => {
                socket.emit('pandaChanged', dataChange)
            })
            socket.on('lowerValue', () => {
                state.set('total', state.get('total') - 1)
            })
        })
    }
}

const createAvatar = () => {
    //function that creates an avatar 
    //generate image and nickname
    if(avatar) {
        response.status(304).redirect(`/game?animal=${animal}&nickname=${nickname}`)
    } else {
        response.status(409).redirect('/')
    }
}

module.exports = {
    handleIndexRoute,
    handleAvatarRoute,
    handleGameRoute,
    createAvatar
}