"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}var State=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"set",value:function(e,t){this[e]=t}},{key:"get",value:function(e){return this[e]}}]),e}(),state=new State,socket=io(),form=document.querySelector(".messageForm"),usernameForm=document.querySelector(".usernameForm");form&&(form.addEventListener("submit",function(e){e.preventDefault();var t=document.getElementById("message"),a=state.get("username"),n=state.get("id");t&&t.value&&0<t.value.length&&a&&(socket.emit("chat message",{message:t.value,user:a,id:n}),t.value="")}),socket.on("chat message",function(e){var t=e.user,a=e.id,n=e.time,s=e.message,r=state.get("username"),i=state.get("id");if(!r&&!i)throw new Error("No username found");var o=document.querySelector("#messages");if(o){var u=document.createElement("li"),l=document.createElement("span"),m=document.createElement("span");l.classList.add("username"),m.classList.add("time"),l.innerText=t,m.innerText=n,u.innerText=s,u.classList.add(t+a===r+i?"self":"other"),u.classList.contains("self")&&(l.style="text-align: right;",m.style="text-align: right"),l.appendChild(u),o.appendChild(l),o.appendChild(m)}})),usernameForm&&usernameForm.addEventListener("submit",function(e){e.preventDefault();var t=usernameForm.querySelector(".usernameInput");t&&t.value&&0<t.value.length&&(state.set("id",Math.floor(9999*Math.random())+1),state.set("username",t.value),usernameForm.style="display: none;")});