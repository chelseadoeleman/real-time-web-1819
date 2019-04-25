const socket = io()
const counter = document.querySelector('.counter')
const avatars = document.querySelectorAll('.avatar-wrapper')
const islandWrapper = document.querySelector('.island-wrapper')

const svgs = {
    panda: `<svg class="panda" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.85 259.08"><defs><style>.panda-1{fill:#fff;}.panda-2,.panda-5{fill:#f2f2f2;}.panda-2,.panda-4{stroke:#f2f2f2;}.panda-2,.panda-3,.panda-4{stroke-miterlimit:10;}.panda-2{stroke-width:0.25px;}.panda-3{stroke:#000;}</style></defs><title>panda</title><g id="Laag_2" data-name="Laag 2"><g id="Laag_3" data-name="Laag 3"><ellipse cx="92.56" cy="190.58" rx="68.5" ry="53.5"/><circle class="panda-1" cx="92.56" cy="190.58" r="44.5"/><ellipse cx="29.54" cy="29.39" rx="29.58" ry="29.34" transform="translate(-9.93 16.02) rotate(-26.14)"/><path d="M176.83,17.1c7,14.37,1.35,31.61-12.72,38.52-14.35,7-30.15-1.14-36.48-10.42a21,21,0,0,1-1.76-3.1C121,31.5,122.5,11.48,138.58,3.59,152.65-3.32,169.78,2.73,176.83,17.1Z"/><path class="panda-1" d="M177.06,83.58c0,42.81-38.06,77.5-85,77.5-20.33,0-36.05-6.71-42.71-10.47-21.86-12.38-42.46-37.68-42.29-67,.24-41,40.92-77.5,85-77.5C139,6.08,177.06,40.78,177.06,83.58Z"/><path class="panda-2" d="M60.56,153c-1.13-1.07-7.73-7.31-7-15.1.2-2.07,1-4.88,10-14,8.57-8.68,12.86-13,18-15.1,2.86-1.16,11.8-4.78,21-1.08,1.18.48,2.79,2.12,6.13,5.16a139.71,139.71,0,0,1,10.87,11c5.41,6.13,8.18,9.17,9,11.86.25.82,2.54,8.66-1,15.1-4.09,7.44-13.37,8.32-28,9.71a79.64,79.64,0,0,1-23-1.08C69.54,158.1,64.93,157.13,60.56,153Z"/><path class="panda-3" d="M83.12,92a64.66,64.66,0,0,0,1.21-21.6C83.75,65,83,59.15,79.46,52.82c-1.33-2.36-4.86-8.6-9.74-10.8-12.5-5.64-34.2,15.09-43.84,37.8-4.11,9.68-10.84,25.56-3.65,37.8,6.71,11.43,21.78,13.25,31.66,10.8C75.17,123.15,82.23,95.63,83.12,92Z"/><path class="panda-3" d="M100.67,92a64.84,64.84,0,0,1-1.22-21.6c.59-5.33,1.29-11.22,4.87-17.55,1.34-2.36,4.87-8.6,9.74-10.8,12.51-5.64,34.21,15.09,43.84,37.8,4.11,9.68,10.85,25.56,3.66,37.8-6.72,11.43-21.79,13.25-31.66,10.8C108.61,123.15,101.55,95.63,100.67,92Z"/><path class="panda-1" d="M76.34,102.12A19.36,19.36,0,0,1,75.6,108c-2,6.85-8.62,14.51-17,14.55-9.77,0-17.78-10.19-17.78-20.4,0-11.26,8-20.4,17.78-20.4S76.34,90.86,76.34,102.12Z"/><ellipse class="panda-1" cx="125.11" cy="102.12" rx="17.78" ry="20.4"/><ellipse cx="57.92" cy="99.94" rx="12.7" ry="14.57"/><ellipse cx="124.48" cy="99.94" rx="12.7" ry="14.57"/><ellipse class="panda-1" cx="54.75" cy="96.29" rx="5.72" ry="6.56"/><ellipse class="panda-1" cx="63" cy="102.85" rx="2.54" ry="2.91"/><ellipse class="panda-1" cx="121.3" cy="96.29" rx="5.72" ry="6.56"/><ellipse class="panda-1" cx="129.56" cy="102.85" rx="2.54" ry="2.91"/><path class="panda-4" d="M74.59,127c2.65-7.22,32.44-7.86,35.22-1.08,1.85,4.49-6.76,15.78-18.78,15.12C80.73,140.49,73,131.44,74.59,127Z"/><ellipse class="panda-5" cx="26.39" cy="181.08" rx="20.33" ry="20"/><ellipse class="panda-5" cx="159.39" cy="181.08" rx="20.33" ry="20"/><ellipse class="panda-5" cx="117.39" cy="249.08" rx="20.33" ry="10"/><ellipse class="panda-5" cx="72.39" cy="249.08" rx="20.33" ry="10"/></g></g></svg>`,
    fox: `<svg class="fox" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.68 246.3"><defs><style>.cls-1{fill:#da6f5a;}.cls-2{fill:#ffc69f;}.cls-3{fill:#93483e;}.cls-4{fill:#1a1a1a;}.cls-5{fill:#fff;}</style></defs><title>fox</title><g id="Laag_2" data-name="Laag 2"><g id="Laag_2-2" data-name="Laag 2"><ellipse class="cls-1" cx="99.34" cy="168.8" rx="60.5" ry="67.5"/><path class="cls-1" d="M138.84,16.75S162.29,5.09,187.84.3c32-6-11,80-11,80l-38-63.55"/><ellipse class="cls-2" cx="99.34" cy="167.8" rx="44.37" ry="49.5" transform="translate(-18.29 12.27) rotate(-6.47)"/><path class="cls-3" d="M128.84,30.75s23.45-11.66,49-16.45c32-6-11,80-11,80l-38-63.55"/><path class="cls-1" d="M99.84,6.3v149l98-71S162.84,5.3,99.84,6.3Z"/><path class="cls-2" d="M180.53,55.22c-15.3,0-31.57,6.06-44.85,18.07-21.35,19.32-28.18,47.87-18.33,69.32L197.84,84.3A179.26,179.26,0,0,0,180.53,55.22Z"/><path class="cls-1" d="M60.84,16.75S37.39,5.09,11.84.3c-32-6,11,80,11,80l38-63.55"/><path class="cls-3" d="M70.84,30.75s-23.45-11.66-49-16.45c-32-6,11,80,11,80l38-63.55"/><path class="cls-1" d="M99.84,6.3v149l-98-71S36.84,5.3,99.84,6.3Z"/><path class="cls-2" d="M19.16,55.22c15.3,0,31.56,6.06,44.84,18.07,21.36,19.32,28.18,47.87,18.33,69.32L1.84,84.3A178.92,178.92,0,0,1,19.16,55.22Z"/><polygon class="cls-4" points="81.84 142.3 117.84 142.3 99.84 155.3 81.84 142.3"/><circle class="cls-4" cx="63.99" cy="98.15" r="13.15"/><circle class="cls-4" cx="134.69" cy="99.15" r="13.15"/><circle class="cls-5" cx="61.22" cy="95.39" r="6.23"/><circle class="cls-5" cx="130.54" cy="96.39" r="6.23"/><circle class="cls-5" cx="139.54" cy="102.61" r="2.77"/><circle class="cls-5" cx="70.21" cy="101.61" r="2.77"/><ellipse class="cls-3" cx="30.17" cy="168.3" rx="20.33" ry="20"/><ellipse class="cls-3" cx="163.17" cy="168.3" rx="20.33" ry="20"/><ellipse class="cls-3" cx="121.17" cy="236.3" rx="20.33" ry="10"/><ellipse class="cls-3" cx="76.17" cy="236.3" rx="20.33" ry="10"/></g></g></svg>`
}

if (islandWrapper && avatars && counter && socket) {
    socket.on('connect', () => {
        // TODO
        // socket.on('addAvatar', (animal, nickname) => {
        //     islandWrapper.innerHTML += `
        //         <div class="avatar-wrapper">
        //             <span>${nickname}</span>
        //             <span class="lives">Lives: 0</span>
        //             ${svgs[animal]}
        //         </div>
        //     `
        // })

        socket.on('tweetsChanged', (data) => {
            counter.textContent = Number(data)
        })

        socket.on('userUpdated', ({nickname, animal, lives}) => {
            const animalWrapper = document.querySelector(`#${animal}-${nickname}`)
            
            if (animalWrapper) {
                const livesElement = animalWrapper.querySelector('.lives')

                if (livesElement) {
                    const currentAmountOfLives = Number(livesElement.innerText.split(': ')[1])

                    livesElement.innerHTML = `Lives: ${lives}`
                }
            }
        })

        avatars.forEach(avatar => {
            avatar.addEventListener('click', () => setupAvatarListener(avatar))
        })
    
        socket.on('valueChange', (data) => {
            counter.textContent = Number(data)
        })
    })

    async function setupAvatarListener(avatar) {
        const totalAmount = Number(counter.innerText)
        const lives = avatar.querySelector('.lives')
        const amountOfLives = Number(lives.innerText.split(': ')[1])
        const nickname = avatar.querySelector('span').innerText.toLowerCase()
        const avatarType = avatar.querySelector('svg').classList.contains('panda') ? 'panda' : 'fox'

        let parts = window.location.search.replace('?', '').split('&')
        const [ animal, windowNickname ] = parts.map(part => {
            if (part.includes('animal')) {
                return part.replace('animal=', '')
            } else {
                return part.replace('nickname=', '')
            }
        })

        if (nickname === windowNickname && animal === avatarType) {
            if (lives && totalAmount > 0) {
                if (amountOfLives + 1 <= 100) {
                    await fetch(`${window.location.origin}/game/${avatarType}/${nickname}`, {method: 'POST'})
                }
            }

            if (Number(counter.textContent) - 1 >= 0) {
                await fetch(`${window.location.origin}/lower-tweets`, {method: 'POST'})
            }
        }
    }
}
