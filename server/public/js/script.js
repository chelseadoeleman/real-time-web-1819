const socket = io()
const counter = document.querySelector('.counter')
const avatars = document.querySelectorAll('.avatar-wrapper')
const islandWrapper = document.querySelector('.island-wrapper')

const svgs = {
    panda: `<svg class="panda" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.85 259.08"><defs><style>.panda-1{fill:#fff;}.panda-2,.panda-5{fill:#f2f2f2;}.panda-2,.panda-4{stroke:#f2f2f2;}.panda-2,.panda-3,.panda-4{stroke-miterlimit:10;}.panda-2{stroke-width:0.25px;}.panda-3{stroke:#000;}</style></defs><title>panda</title><g id="Laag_2" data-name="Laag 2"><g id="Laag_3" data-name="Laag 3"><ellipse cx="92.56" cy="190.58" rx="68.5" ry="53.5"/><circle class="panda-1" cx="92.56" cy="190.58" r="44.5"/><ellipse cx="29.54" cy="29.39" rx="29.58" ry="29.34" transform="translate(-9.93 16.02) rotate(-26.14)"/><path d="M176.83,17.1c7,14.37,1.35,31.61-12.72,38.52-14.35,7-30.15-1.14-36.48-10.42a21,21,0,0,1-1.76-3.1C121,31.5,122.5,11.48,138.58,3.59,152.65-3.32,169.78,2.73,176.83,17.1Z"/><path class="panda-1" d="M177.06,83.58c0,42.81-38.06,77.5-85,77.5-20.33,0-36.05-6.71-42.71-10.47-21.86-12.38-42.46-37.68-42.29-67,.24-41,40.92-77.5,85-77.5C139,6.08,177.06,40.78,177.06,83.58Z"/><path class="panda-2" d="M60.56,153c-1.13-1.07-7.73-7.31-7-15.1.2-2.07,1-4.88,10-14,8.57-8.68,12.86-13,18-15.1,2.86-1.16,11.8-4.78,21-1.08,1.18.48,2.79,2.12,6.13,5.16a139.71,139.71,0,0,1,10.87,11c5.41,6.13,8.18,9.17,9,11.86.25.82,2.54,8.66-1,15.1-4.09,7.44-13.37,8.32-28,9.71a79.64,79.64,0,0,1-23-1.08C69.54,158.1,64.93,157.13,60.56,153Z"/><path class="panda-3" d="M83.12,92a64.66,64.66,0,0,0,1.21-21.6C83.75,65,83,59.15,79.46,52.82c-1.33-2.36-4.86-8.6-9.74-10.8-12.5-5.64-34.2,15.09-43.84,37.8-4.11,9.68-10.84,25.56-3.65,37.8,6.71,11.43,21.78,13.25,31.66,10.8C75.17,123.15,82.23,95.63,83.12,92Z"/><path class="panda-3" d="M100.67,92a64.84,64.84,0,0,1-1.22-21.6c.59-5.33,1.29-11.22,4.87-17.55,1.34-2.36,4.87-8.6,9.74-10.8,12.51-5.64,34.21,15.09,43.84,37.8,4.11,9.68,10.85,25.56,3.66,37.8-6.72,11.43-21.79,13.25-31.66,10.8C108.61,123.15,101.55,95.63,100.67,92Z"/><path class="panda-1" d="M76.34,102.12A19.36,19.36,0,0,1,75.6,108c-2,6.85-8.62,14.51-17,14.55-9.77,0-17.78-10.19-17.78-20.4,0-11.26,8-20.4,17.78-20.4S76.34,90.86,76.34,102.12Z"/><ellipse class="panda-1" cx="125.11" cy="102.12" rx="17.78" ry="20.4"/><ellipse cx="57.92" cy="99.94" rx="12.7" ry="14.57"/><ellipse cx="124.48" cy="99.94" rx="12.7" ry="14.57"/><ellipse class="panda-1" cx="54.75" cy="96.29" rx="5.72" ry="6.56"/><ellipse class="panda-1" cx="63" cy="102.85" rx="2.54" ry="2.91"/><ellipse class="panda-1" cx="121.3" cy="96.29" rx="5.72" ry="6.56"/><ellipse class="panda-1" cx="129.56" cy="102.85" rx="2.54" ry="2.91"/><path class="panda-4" d="M74.59,127c2.65-7.22,32.44-7.86,35.22-1.08,1.85,4.49-6.76,15.78-18.78,15.12C80.73,140.49,73,131.44,74.59,127Z"/><ellipse class="panda-5" cx="26.39" cy="181.08" rx="20.33" ry="20"/><ellipse class="panda-5" cx="159.39" cy="181.08" rx="20.33" ry="20"/><ellipse class="panda-5" cx="117.39" cy="249.08" rx="20.33" ry="10"/><ellipse class="panda-5" cx="72.39" cy="249.08" rx="20.33" ry="10"/></g></g></svg>`,
    fox: `<svg class="fox" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.68 246.3"><defs><style>.cls-1{fill:#da6f5a;}.cls-2{fill:#ffc69f;}.cls-3{fill:#93483e;}.cls-4{fill:#1a1a1a;}.cls-5{fill:#fff;}</style></defs><title>fox</title><g id="Laag_2" data-name="Laag 2"><g id="Laag_2-2" data-name="Laag 2"><ellipse class="cls-1" cx="99.34" cy="168.8" rx="60.5" ry="67.5"/><path class="cls-1" d="M138.84,16.75S162.29,5.09,187.84.3c32-6-11,80-11,80l-38-63.55"/><ellipse class="cls-2" cx="99.34" cy="167.8" rx="44.37" ry="49.5" transform="translate(-18.29 12.27) rotate(-6.47)"/><path class="cls-3" d="M128.84,30.75s23.45-11.66,49-16.45c32-6-11,80-11,80l-38-63.55"/><path class="cls-1" d="M99.84,6.3v149l98-71S162.84,5.3,99.84,6.3Z"/><path class="cls-2" d="M180.53,55.22c-15.3,0-31.57,6.06-44.85,18.07-21.35,19.32-28.18,47.87-18.33,69.32L197.84,84.3A179.26,179.26,0,0,0,180.53,55.22Z"/><path class="cls-1" d="M60.84,16.75S37.39,5.09,11.84.3c-32-6,11,80,11,80l38-63.55"/><path class="cls-3" d="M70.84,30.75s-23.45-11.66-49-16.45c-32-6,11,80,11,80l38-63.55"/><path class="cls-1" d="M99.84,6.3v149l-98-71S36.84,5.3,99.84,6.3Z"/><path class="cls-2" d="M19.16,55.22c15.3,0,31.56,6.06,44.84,18.07,21.36,19.32,28.18,47.87,18.33,69.32L1.84,84.3A178.92,178.92,0,0,1,19.16,55.22Z"/><polygon class="cls-4" points="81.84 142.3 117.84 142.3 99.84 155.3 81.84 142.3"/><circle class="cls-4" cx="63.99" cy="98.15" r="13.15"/><circle class="cls-4" cx="134.69" cy="99.15" r="13.15"/><circle class="cls-5" cx="61.22" cy="95.39" r="6.23"/><circle class="cls-5" cx="130.54" cy="96.39" r="6.23"/><circle class="cls-5" cx="139.54" cy="102.61" r="2.77"/><circle class="cls-5" cx="70.21" cy="101.61" r="2.77"/><ellipse class="cls-3" cx="30.17" cy="168.3" rx="20.33" ry="20"/><ellipse class="cls-3" cx="163.17" cy="168.3" rx="20.33" ry="20"/><ellipse class="cls-3" cx="121.17" cy="236.3" rx="20.33" ry="10"/><ellipse class="cls-3" cx="76.17" cy="236.3" rx="20.33" ry="10"/></g></g></svg>`,
    lion: `<svg class="lion" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233.63 263"><defs><style>.lion-1{fill:#ff931e;}.lion-2{fill:#ffc285;}.lion-3{fill:#ffb15c;}.lion-3,.lion-8{opacity:0.9;}.lion-4{fill:#da6f5a;}.lion-5{fill:#e87400;}.lion-6{fill:#ffd0b0;}.lion-7{fill:#fff;}.lion-8,.lion-9{fill:none;stroke:#000;stroke-miterlimit:10;}</style></defs><title>lion</title><g id="Laag_2" data-name="Laag 2"><g id="Laag_4" data-name="Laag 4"><path class="lion-1" d="M155.48,45.27s17.8-26.31,43.77-27.5c38.66-1.77,8.09,80.35,8.09,80.35L155.48,45.27"/><path class="lion-2" d="M159.87,53.73S175,31.42,197,30.41c32.78-1.5,6.86,68.14,6.86,68.14l-44-44.82"/><path class="lion-1" d="M74.31,46.77S56.52,20.46,30.55,19.27c-38.66-1.77-8.09,80.35-8.09,80.35L74.31,46.77"/><path class="lion-2" d="M69.93,55.23S54.84,32.92,32.81,31.91C0,30.41,26,100.05,26,100.05l44-44.82"/><ellipse class="lion-1" cx="116.31" cy="189" rx="54.6" ry="62"/><ellipse class="lion-3" cx="171.21" cy="43.5" rx="22.5" ry="28.71" transform="translate(40.77 162.62) rotate(-56.66)"/><ellipse class="lion-3" cx="193.71" cy="66" rx="22.5" ry="28.71" transform="translate(32.11 191.55) rotate(-56.66)"/><ellipse class="lion-3" cx="42.62" cy="69.79" rx="26.23" ry="28.88" transform="translate(-39.11 67.03) rotate(-56.66)"/><ellipse class="lion-3" cx="67.21" cy="46.5" rx="22.5" ry="28.71" transform="matrix(0.55, -0.84, 0.84, 0.55, -8.58, 77.09)"/><path class="lion-4" d="M72.91,189l9,9"/><ellipse class="lion-2" cx="116.31" cy="195.43" rx="38.24" ry="39.35"/><ellipse class="lion-5" cx="176.24" cy="185" rx="20.33" ry="20"/><path class="lion-1" d="M121.91,36.09V184.65a5.66,5.66,0,0,1-8.72,4.76L20,129.7a5.62,5.62,0,0,1-2.6-4.95c.61-16.09,7.91-95.28,96.23-96.55C127.91,28,121.91,31.59,121.91,36.09Z"/><path class="lion-1" d="M110.91,36.09V184.65a5.66,5.66,0,0,0,8.72,4.76l93.15-59.71a5.62,5.62,0,0,0,2.6-4.95c-.61-16.09-8-92.3-96.23-96.55A8,8,0,0,0,110.91,36.09Z"/><ellipse class="lion-3" cx="177.21" cy="155.78" rx="21.71" ry="16.78"/><ellipse class="lion-3" cx="194.71" cy="138.78" rx="20.21" ry="18.78"/><ellipse class="lion-3" cx="213.21" cy="112.53" rx="26.53" ry="20.21" transform="translate(65.84 303.33) rotate(-80.14)"/><ellipse class="lion-3" cx="213.21" cy="88.28" rx="20.21" ry="18.78"/><ellipse class="lion-3" cx="195.71" cy="70.78" rx="20.21" ry="18.78"/><ellipse class="lion-3" cx="178.71" cy="49.78" rx="20.21" ry="18.78"/><ellipse class="lion-3" cx="63.71" cy="49.78" rx="20.21" ry="18.78"/><ellipse class="lion-3" cx="41.71" cy="69.78" rx="20.21" ry="18.78"/><ellipse class="lion-3" cx="152.6" cy="30.78" rx="26.31" ry="23.78"/><ellipse class="lion-3" cx="116.41" cy="24.28" rx="28.5" ry="24.28"/><ellipse class="lion-3" cx="82.91" cy="32.28" rx="25" ry="19.28"/><ellipse class="lion-3" cx="20.21" cy="92.75" rx="20.21" ry="24.25"/><ellipse class="lion-3" cx="20.21" cy="117.28" rx="20.21" ry="18.78"/><ellipse class="lion-5" cx="56.24" cy="185" rx="20.33" ry="20"/><ellipse class="lion-3" cx="32.21" cy="135.03" rx="20.21" ry="27.03" transform="translate(-44.91 19.6) rotate(-20.33)"/><ellipse class="lion-3" cx="51.21" cy="162.28" rx="20.21" ry="18.78"/><ellipse class="lion-3" cx="157.79" cy="172.78" rx="19.29" ry="16.78"/><ellipse class="lion-3" cx="130.79" cy="184.78" rx="19.29" ry="16.78"/><ellipse class="lion-3" cx="100.79" cy="184.78" rx="19.29" ry="16.78"/><ellipse class="lion-3" cx="74.79" cy="172.78" rx="19.29" ry="16.78"/><path class="lion-6" d="M141.44,132.51c9.23-2.87,18.43-5.73,23.16.77,3.32,4.56,3.18,12,1.9,17.12-2.93,11.81-13.31,17.5-20,21.18-3,1.67-27.32,14.62-33.35,3-3.75-7.24,1.07-21,6.62-28.82C125.61,137.44,132.67,135.24,141.44,132.51Z"/><path class="lion-6" d="M94.31,131.47c-9.1-3.26-18.17-6.51-23.18-.21-3.5,4.41-3.68,11.83-2.62,17,2.43,11.92,12.56,18,19.12,22,3,1.79,26.68,15.75,33.2,4.36,4-7.07-.18-21-5.4-29.07C109.92,137.06,103,134.56,94.31,131.47Z"/><path d="M116.34,160l-14.82-16.11a1.63,1.63,0,0,1,1.21-2.74l14.85,0a1.63,1.63,0,0,1,1.63,1.63l0,16.09A1.63,1.63,0,0,1,116.34,160Z"/><path d="M118.71,160l14.82-16.11a1.64,1.64,0,0,0-1.21-2.74l-14.85,0a1.63,1.63,0,0,0-1.63,1.63l0,16.09A1.63,1.63,0,0,0,118.71,160Z"/><ellipse class="lion-2" cx="83.05" cy="108.27" rx="30.71" ry="23.16" transform="translate(-51.53 130.79) rotate(-62.01)"/><ellipse class="lion-2" cx="153.08" cy="108.27" rx="23.16" ry="30.71" transform="translate(-32.91 84.51) rotate(-27.99)"/><ellipse cx="151.92" cy="111.88" rx="13.68" ry="15.7" transform="translate(-32.2 70.71) rotate(-23.76)"/><ellipse class="lion-7" cx="147.2" cy="109.67" rx="6.16" ry="7.06" transform="translate(-31.71 68.62) rotate(-23.76)"/><ellipse class="lion-7" cx="158.19" cy="112.55" rx="2.74" ry="3.14" transform="translate(-31.94 73.29) rotate(-23.76)"/><ellipse cx="85.12" cy="111.88" rx="15.7" ry="13.68" transform="translate(-52.48 140.66) rotate(-64.55)"/><ellipse class="lion-7" cx="83.71" cy="106.86" rx="7.06" ry="6.16" transform="translate(-48.75 136.53) rotate(-64.55)"/><ellipse class="lion-7" cx="88.71" cy="117.07" rx="3.14" ry="2.74" transform="translate(-55.12 146.86) rotate(-64.55)"/><ellipse class="lion-5" cx="140.24" cy="253" rx="20.33" ry="10"/><ellipse class="lion-5" cx="95.24" cy="253" rx="20.33" ry="10"/><path class="lion-8" d="M139.91,146c11.87-6.87,32.63-16.4,59-16a107.69,107.69,0,0,1,19,2"/><path class="lion-9" d="M143.79,153.52c11.44-.31,30.44,1,49.48,11.88a88.2,88.2,0,0,1,13,9.11"/><path class="lion-9" d="M142.76,149.94c9.69-4.58,26-10.18,43.56-5.19A52.32,52.32,0,0,1,198.55,150"/><path class="lion-9" d="M92.91,145c-11.87-6.87-32.63-16.4-59-16a107.69,107.69,0,0,0-19,2"/><path class="lion-9" d="M89,152.52c-11.44-.31-30.44,1-49.48,11.88a88.74,88.74,0,0,0-13,9.11"/><path class="lion-9" d="M90.06,148.94c-9.69-4.58-26-10.18-43.56-5.19A52.32,52.32,0,0,0,34.27,149"/></g></g></svg>` 
}

if (islandWrapper && avatars && counter && socket) {
    socket.on('connect', () => {
        socket.on('addAvatar', (animal, nickname, lives) => {
            const avatarMatch = document.querySelector(`#${animal}-${nickname.toLowerCase()}`)

            if (avatarMatch) {
                return
            }

            islandWrapper.innerHTML += `
                <div class="avatar-wrapper" id="${animal}-${nickname.toLowerCase()}">
                    <span>${nickname}</span>
                    <span class="lives">Lives: ${lives}</span>
                    ${svgs[animal]}
                </div>
            `

            const avatarWrappers = document.querySelectorAll('.avatar-wrapper')
            avatarWrappers.forEach(avatarWrapper => {
                avatarWrapper.addEventListener('click', () => setupAvatarListener(avatarWrapper))
            })
        })

        socket.on('tweetsChanged', (data) => {
            counter.textContent = Number(data)
        })

        socket.on('userUpdated', ({ nickname, animal, lives }) => {
            const animalWrapper = document.querySelector(`#${animal}-${nickname.toLowerCase()}`)
            
            if (animalWrapper) {
                const livesElement = animalWrapper.querySelector('.lives')

                if (livesElement) {
                    livesElement.innerHTML = `Lives: ${lives}`
                }
            }
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
        const avatarType = avatar.querySelector('svg').classList.contains('panda') 
            ? 'panda' 
            : avatar.querySelector('svg').classList.contains('fox') ? 'fox' : 'lion'

        let parts = window.location.search.replace('?', '').split('&')
        const [ animal, windowNickname ] = parts.map(part => {
            if (part.includes('animal')) {
                return part.replace('animal=', '')
            } else {
                return part.replace('nickname=', '')
            }
        })

        if (nickname === windowNickname.toLowerCase() && animal === avatarType) {
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
