var socket = io();
socket.on('connect', function() {
    console.log('connection established');

});

socket.on('disconnect', function() {
    console.log('disconnected to server ');
});

socket.on('newMessage', function (message) {
    console.log('new message from server', message);
});