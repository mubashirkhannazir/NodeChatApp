var socket = io();
socket.on('connect', function() {
    console.log('connection established');

});

socket.on('disconnect', function() {
    console.log('disconnected to server ');
});

socket.on('newMessage', function (message) {
    console.log('new message from server', message);
    var li= jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from:'Mubashir',
//     text: 'trying to get a callback'
// }, function() {
//     console.log('okay got it!');
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name="message"]').val()
    }, function() {

    });
});