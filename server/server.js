const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app= express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'wellcome to chatApp'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user added'));

    socket.on('createMessage', (message) => {
        console.log('new Message', message)

         io.emit('newMessage',generateMessage(message.from, message.text)); 
        //{
        //     from: message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // });
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

