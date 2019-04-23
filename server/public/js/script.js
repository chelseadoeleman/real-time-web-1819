const socket = io()
const counter = document.querySelector('.counter')
const avatar = document.querySelector('svg')

socket.on('connect', () => {
    socket.on('pandaChanged', (data) => {
        counter.textContent = Number(data)
    })
    avatar.addEventListener('click', () => {
        if(Number(counter.textContent) - 1 >= 0) {
            socket.emit('lowerValue')
            counter.textContent = Number(counter.textContent) - 1
        }
    })
})