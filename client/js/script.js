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
    socket.on('chat message', ({user, id, message}) => {
        const ownUserName = state.get('username')
        const ownUserId = state.get('id')

        if (!ownUserName && !ownUserId) {
            throw new Error('No username found')
        }

        const messagesList = document.querySelector('#messages')
        if (messagesList) {
            const newMessageItem = document.createElement('li')
            const newName = document.createElement('span')
            newName.classList.add('username')

            emoticons.forEach(({ name, emoticon }) => {
                const newMessage = message.toLowerCase().replace(name, emoticon)
                message = `${newMessage[0].toUpperCase()}${newMessage.slice(1)}`
            })

            if(message === 'Hoi'
                || message === 'Hee' 
                || message === 'Hallo' 
                || message === 'Hey' 
                || message === 'Heei'
                || message === 'Hello'
                || message === 'Hi') 
            {
                newName.innerText = user
                newMessageItem.innerText = message + ' 😊'
                newMessageItem.classList.add(user + id === ownUserName + ownUserId ? 'self' : 'other')
                if(newMessageItem.classList.contains('self')) {
                    newName.style = 'text-align: right;'
                }
            } else {
                newName.innerText = user
                newMessageItem.innerText = message
                newMessageItem.classList.add(user + id === ownUserName + ownUserId ? 'self' : 'other')
                if(newMessageItem.classList.contains('self')) {
                    newName.style = 'text-align: right;'
                }
            }

            newName.appendChild(newMessageItem)
            messagesList.appendChild(newName)
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
