/*
 * Serve content over a socket
 */


module.exports = function (io) {
  'use strict';
  var connectedUsers = {};
  io.on('connection', function (socket) {
    var id = null;
    socket.on('disconnect', function(){
      delete connectedUsers["id" + id]; 
      console.log("user disconnect id:" + id);
      io.sockets.emit('users:add', connectedUsers);
    });

    socket.on('users:add', function(user){
      console.log('New user');
      socket.join(user.chatroom);
      id = user.id;
      connectedUsers["id" + id] = user;
      io.sockets.emit('users:add', connectedUsers);
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