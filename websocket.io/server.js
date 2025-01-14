const io = require('socket.io')(3000, {
    cors: {
      origin: '*',
    }
});

const users = {};
var count = 0;

io.on('connection', socket => {

    socket.on('new-user', name => {
        count++;
        console.log('User : ' + count);
        users[socket.id] = name;
        console.log(`${name} joined room chat`);
        socket.broadcast.emit('user-connected', {
            name: name,
            count: count,
        });
    });

    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', { 
            message: message, 
            name: users[socket.id],
        });
        console.log(`${users[socket.id]} : ${message}`);
    });

    socket.on('disconnect', () => {
        count--;
        console.log('User : ' + count);
        socket.broadcast.emit('user-disconnected', {
            name : users[socket.id],
            count: count
        });
        console.log(`${users[socket.id]} : out room chat`);
        delete users[socket.id]
    });
});