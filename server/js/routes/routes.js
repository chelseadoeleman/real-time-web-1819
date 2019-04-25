require('dotenv').config()

const handleIndexRoute = async (request, response) => {
    response.render('../views/index.ejs')
}

const handleAvatarRoute = (request, response) => {
    response.render('../views/avatar.ejs')
}

const handleGameRoute = (tracktweets, io, state) => (request, response) => {
    const { animal, nickname } = request.query

    const users = state.get('users')
    const existingUser = users.find(user => user.animal === animal && user.nickname.toLowerCase() === nickname.toLowerCase())

    if (!existingUser) {
        const newUser = {
            animal,
            nickname,
            lives: 0
        }
        
        state.set('users', [...users, newUser])
    }

    const total = state.get('total')

    if(animal && nickname) {
        response.render('../views/game.ejs', { total })

        io.on('connection', function(socket) {
            const users = state.get('users')
            const existingUser = users.find(user => user.animal === animal && user.nickname.toLowerCase() === nickname.toLowerCase())
            
            if (!existingUser) {
                io.emit('addAvatar', animal, nickname, 0)
            } else {
                io.emit('addAvatar', animal, nickname, existingUser.lives)
            }

            tracktweets.on('tweetsChanged', (amountOfTweets) => {
                io.emit('tweetsChanged', amountOfTweets)
            })
        })
    }
}

const increment = (state, io) => (request, response) => {
    const { animal, nickname } = request.params

    const users = state.get('users')
    const userToUpdate = users.find(u => u.nickname.toLowerCase() === nickname.toLowerCase() && u.animal === animal)
    const userIndex = users.findIndex(u => u.nickname.toLowerCase() === nickname.toLowerCase() && u.animal === animal)
    
    userToUpdate.lives++
    users.splice(userIndex, 1, userToUpdate)
    
    const updatedUser = users.find(u => u.nickname.toLowerCase() === nickname.toLowerCase() && u.animal === animal)
    
    state.set('users', users)
    io.emit('userUpdated', updatedUser)

    response.status(200).json({
        success: true
    })
}

const lowerTweets = (state, io) => (request, response) => {
    state.set('total', state.get('total') - 1)
    
    io.emit('tweetsChanged', state.get('total'))

    response.status(200).json({
        success: true
    })
}

module.exports = {
    handleIndexRoute,
    handleAvatarRoute,
    handleGameRoute,
    increment,
    lowerTweets
}