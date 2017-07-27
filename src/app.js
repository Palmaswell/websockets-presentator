const socket = io();

const formEL = document.querySelector('.js_form');
const inputEL = document.getElementById('m');
const messagesEl = document.getElementById('messages');
const li = document.createElement('li');


formEL.addEventListener('submit', function(event) {
  socket.emit('chat message', inputEL.value);
    inputEL.value = ' ';
    return false;
});
socket.on('chat message', function(msg) {
    console.log(msg);
    messagesEl.appendChild(li).append(msg);
});