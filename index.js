var Stomp = require('stompjs');

// Use raw TCP sockets
var client = Stomp.overTCP('localhost', 61613);
// uncomment to print out the STOMP frames
 client.debug = console.log;

client.connect('user', 'user', function(frame) {
  console.log('connected to Stomp');

  client.subscribe('/queue/myqueue', function(message) {
    console.log("received message " + message.body);

    // once we get a message, the client disconnects
    client.disconnect();
  });

  console.log ('sending a message');
  client.send('/queue/myqueue', {}, 'Hello, node.js!');
});
