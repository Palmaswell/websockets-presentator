const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(`${__dirname}/src/index.html`);
});

app.use(express.static('src'));

io.on('connection', socket => {
  socket.on('orientation', data => {
    io.emit('orientation', data)
    console.log(data);
  });
  socket.on('motion', data => {
    io.emit('motion', data)
    console.log(data);
  })
});

http.listen(1337, () => {
  console.log('listening on *: 1337');
});


