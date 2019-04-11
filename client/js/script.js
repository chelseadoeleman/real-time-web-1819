class State {

    set(key, value) {
        this[key] = value
    }

    get(key) {
        return this[key]
    }
}

const state = new State()
const socket = io() 
const form = document.querySelector('.messageForm')
const usernameForm = document.querySelector('.usernameForm')



if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault() 
        const message = document.getElementById('message')
        const userName = state.get('username')
        const userId = state.get('id')

        if (message && message.value && message.value.length > 0 && userName) {
            socket.emit('chat message', {
                message: message.value,
                user: userName,
                id: userId
            })
            message.value = ''
        }
    })
    socket.on('chat message', ({user, id, time, message}) => {
        const ownUserName = state.get('username')
        const ownUserId = state.get('id')

        if (!ownUserName && !ownUserId) {
            throw new Error('No username found')
        }

        const messagesList = document.querySelector('#messages')
        if (messagesList) {
            const newMessageItem = document.createElement('li')
            const newName = document.createElement('span')
            const newDate = document.createElement('span')
            newName.classList.add('username')
            newDate.classList.add('time')

            
            newName.innerText = user
            newDate.innerText = time
            newMessageItem.innerText = message
            newMessageItem.classList.add(user + id === ownUserName + ownUserId ? 'self' : 'other')
            if(newMessageItem.classList.contains('self')) {
                newName.style = 'text-align: right;'
            }
            newName.appendChild(newMessageItem)
            messagesList.appendChild(newName)
            messagesList.appendChild(newDate)
        }
    })
}

if (usernameForm) {
    usernameForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const usernameInput = usernameForm.querySelector('.usernameInput')
        if (usernameInput && usernameInput.value && usernameInput.value.length > 0) {
            state.set('id', Math.floor(Math.random() * (10000 - 1)) + 1)
            state.set('username', usernameInput.value)
            usernameForm.style = 'display: none;'
        }
    })
}

