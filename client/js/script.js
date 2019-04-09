const socket = io() 
const form = document.querySelector('form')

const emoticons = {
    'api': '🐒',
    'boom': '🌳',
    'zon': '☀️',
    'nederland': '🇳🇱',
    'vakantie': '🏝'
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault() // prevents page reloading
        const message = document.getElementById('message')
        if (message && message.value && message.value.length > 0) {
            socket.emit('chat message', message.value)
            message.value = ''
        }
    })
    socket.on('chat message', (message) => {
        const messagesList = document.querySelector('#messages')
        if (messagesList) {
            const listItem = document.createElement('li')
            Object.entries(emoticons).forEach(([name, emoticon]) => {
                const newMessage = message.toLowerCase().replace(name, emoticon)
                message = `${newMessage[0].toUpperCase()}${newMessage.slice(1)}`
            })

            if(message === 'Hoi') {
                listItem.innerText = message + ' 😊'
            } else {
                listItem.innerText = message
            }
            messagesList.appendChild(listItem)
        }
    })
}