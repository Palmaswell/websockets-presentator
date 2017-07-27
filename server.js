const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(`${__dirname}/src/index.html`);
});

app.use(express.static('src/'));

io.on('connection', socket => {
  socket.on('chat message', function(msg) {
    console.log(msg);
    io.emit('chat message', msg);
  });
});


http.listen(1337, function(){
  console.log('listening on *:1337');
});


