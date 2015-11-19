var express = require('express'),
    http = require('http'),
    io = require('socket.io');

var app = express();

app.set('port', process.env.PORT || 8100);

var server = http.createServer(app);
    io = io.listen(server);

console.log("Server has started.");

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

io.on('connection', function(client){
  console.log('client connected.');

  client.on('user:created',function(message){
    console.log("user:created, updating others ",message);
    // broadcast everyone except the client who sent the message
    client.broadcast.emit('user:created:update',message);
  });

  client.on('disconnect', function(){
    console.log('client disconnected.');
  });
});
