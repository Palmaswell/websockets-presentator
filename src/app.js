const socket = io();

const trigger = document.querySelector('.js_trigger');
const inputEL = document.getElementById('m');
const messagesEl = document.getElementById('messages');
const li = document.createElement('li');
let item = messagesEl.appendChild(li);

trigger.addEventListener('click', function(event) {
  socket.emit('chat message', inputEL.value);
    inputEL.value = ' ';
    return false;
});

socket.on('chat message', function(msg) {
    console.log(msg);
    var text = document.createTextNode(msg);
    item.appendChild(text);
});