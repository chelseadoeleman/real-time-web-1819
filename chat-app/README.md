# Real-Time Web | Crazy chatbox? 🤷‍

**During the first week of this course I learned how to build an chatbox with socket.io. The purpose of this chatbox was to experiment and add a crazy feature. In this case I build something that replaces words with some emoji's. But it's main feature is that the application is real-time 🤓**

[The application can be found here](https://real-time-web-chelsea.herokuapp.com/)

![Chatbox](./docs/app.png)

## Table of Contents
* **[How to install](#how-to-install)**
* **[How to use](#how-to-use)**
* **[Features](#features)**
* **[Week 1](#week-1)**
* **[Week 2](#week-2)**
* **[Week 3](#week-3)**
* **[Checklist](#checklist)**
* **[Resources](#resources)**
* **[License](#license)**

## How to install

Before installing make sure you have installed node.js and npm.
Choose or make a new directory.
Load the template into your directory.

```bash
git clone https://github.com/chelseadoeleman/real-time-web-1819.git
```

Make sure you are in the right directory 
```bash
cd real-time-web-1819
```

Check if you have the latest version of npm.
Install the dependencies in [package.json](./package.json)
```bash
npm install
```

## How to use

In this application you are able to open the chatbox and chat with other people who are also using the chatbox. Firstly you have to choose a nickname, which can we whatever you like! Then you are able to chat, by typing a message in the input field. Don't forget to press send (or enter, for the ones who figured that one out)! The fun part is that some words will be replaced by emoji's, to make your text messages more fun! I guess...

![Chatbox](./docs/app.png)

## Features

Words will be replaced with emoji's on the server, however assigning the username with unique id's will be done on the client. Here is an overview with words that will be replaced with n emoji.
```js

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
    {name: 'herfst', emoticon: '🍄'},
    {name: 'hockey', emoticon: '🏑'},
    {name: 'fietsen', emoticon: '🚲'},
    {name: 'regen', emoticon: '🌧'},
    {name: 'raket', emoticon: '🚀'},
    {name: 'oeps', emoticon: '🙈'},
    {name: 'shit', emoticon: '💩'},
    {name: 'muziek', emoticon: '🎶'},
    {name: 'japan', emoticon: '⛩'},
    {name: 'foto', emoticon: '📸'},
    {name: 'douchen', emoticon: '🛁'},
    {name: 'bier', emoticon: '🍻'},
    {name: 'laptop', emoticon: '💻'}
]

```
What I learned about sockets is that sending an ```io.emit``` will send an message to everyone and ```broadcast``` will send it to any other person, but the person the data is coming from (client). I used state to set the username and an unique user id and to let the user see this in the chat. I used an user id, because people can choose the same nickname/ username and I hadn't had a databse set up yet.

In the end I found it hard to come up with features to add to the application so I left it here. It will be nice to have something like an database behind it, so that the user will automatically come back in the chat as the person they were before. So their session isn't completely lost when they refresh the page. 


## Week 1
<details>
  <summary>What did I do in Week 1</summary>
  See main readme

  For my concept see week 2
</details>

## Week 2
<details>
  <summary>What did I do in Week 2</summary>

  ## Concept

  ![Concept](./docs/concept.JPG)

  I want to use the twitter API for real-time data and connect it to the IUCN Red List Api. However I had to ask permission for an accesskey, but I haven't received an answer yet. If I cannot get an accesskey I will just filter all tweets to rhino's to see how much awareness they get. This I want to project on a map with the Mapbox Api. As an extra feature I would like to add an linechart where you can view the amount of tweets on a timeline. If I get to use the IUCN Red List Api the user would also be able to view this linechart for a specific animal.

  <hr>
  <i>More coming soon...</i>
</details>

## Week 3
<details>
  <summary>What did I do in Week 3</summary>

  <hr>
  <i>We're not there yet, coming soon...</i>
</details>


## Checklist
- [X] Setting up server with node.js and express
- [X] Implement session with socket.io on server
- [X] Replace words with emoji's
- [X] Create username in chat
- [X] Create unique users
- [X] Divide code between server and client
- [ ] Come up and create more features on the server
- [ ] Set up localstorage with users and messages

## Resources

* [npm](https://docs.npmjs.com/cli/run-script)
* [markdown](https://guides.github.com/features/mastering-markdown/)
* [heroku](https://www.heroku.com/)
* [socket.io](https://socket.io/)
* [socket.io chat](https://socket.io/demos/chat/)
* [socket.io chat tutorial](https://socket.io/get-started/chat/)
* [Gulp](https://gulpjs.com/)
* [Ejs](https://ejs.co/)
* [Nodemon](https://nodemon.io/)
* [Express](https://expressjs.com/)
* [Node](https://nodejs.org/en/)
* [Helmet](https://github.com/helmetjs/helmet)
* [Node-fetch](https://www.npmjs.com/package/node-fetch)

## License
This repository is licensed as [MIT](LICENSE) by [Chelsea Doeleman](https://github.com/chelseadoeleman).
