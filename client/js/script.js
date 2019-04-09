const socket = io() 
const form = document.querySelector('form')

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
            listItem.innerText = message
            messagesList.appendChild(listItem)
        }
    })
}