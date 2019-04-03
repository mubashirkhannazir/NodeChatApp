const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app= express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('createMessage', (message) => {
        console.log('new Message', message)

        socket.emit('newMessage', {
            from: 'Admin',
            text:'wellcome to the chatapp',
            createdAt: new Date().getTime()
        });

        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text:'new user added to chat',
            createdAt: new Date().getTime()
        });

        io.emit('newMessage', {
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
        //socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

server.listen(port, ()=> {
    console.log(`Server is up at port ${port}`);
});

