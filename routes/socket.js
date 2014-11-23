/*
 * Serve content over a socket
 */


module.exports = function (io) {
  'use strict';
  var connectedUsers = [];
  var sockets = [] 
  io.on('connection', function (socket) {
    //TODO Refresh connectedUsers list when someone disconect
    socket.on('disconect', function(data){
      console.log(data);
    });

    socket.on('users:add', function(user){
      console.log('New user');
      connectedUsers.push(user);
      socket.join(user.chatroom);
      sockets[user.id] =  socket;
      io.sockets.emit('users:add', connectedUsers);
    });

    socket.on("privatemessage", function(data){
      sockets[data.to].emit("message:new", data.message);
    });

    socket.on('chatroom:change', function(data){
      socket.leave(data.old);
      socket.join(data.new);
    });

    socket.on('message:new', function (msg) {
      io.sockets.in(msg.user.chatroom).emit('message:new', msg);
    });

  });
};