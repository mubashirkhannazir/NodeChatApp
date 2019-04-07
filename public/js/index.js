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

socket.on('newLocationMessage', function(message) {
     var li = jQuery('<li></li>');
     var a = jQuery('<a target="_blank">my current location</a>');
     
     li.text(`${message.from}`);
     a.attr('href', message.url);
     li.append(a);
     jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    var messageTextBox = jQuery('[name="message"]');

    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#sendLocation');

locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Geolocation not supported');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        });
    }, function(e){
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    });
}); 