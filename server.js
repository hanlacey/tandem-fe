const app = require('express')();
const server = require('http').createServer(app)
const PORT = 3000;
const io = require('socket.io')(server);


app.get('/', (req, res)=>{
  res.send('<h1>Hello World</h1>')
})

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { 
  console.log('new client connected');
  socket.emit('connection', null);
});