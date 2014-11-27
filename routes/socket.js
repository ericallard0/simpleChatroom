/*
 * Serve content over a socket
 */


module.exports = function (io) {
  'use strict';
  var connectedUsers = {};
  var sockets = {};
  var chatroomId = 0;
  io.on('connection', function (socket) {
    var id = null;

    socket.on('disconnect', function(){
      delete connectedUsers["id" + id]; 
      delete sockets["id" + id]; 
      console.log("user disconnect id:" + id);
      io.sockets.emit('users:add', connectedUsers);
    });

    socket.on('users:add', function(user){
      console.log('New user');
      socket.join(user.chatroom);
      id = user.id;
      connectedUsers["id" + id] = user;
      sockets["id" + id] = socket;
      io.sockets.emit('users:add', connectedUsers);
    });

    socket.on('chatroom:change', function(data){
      socket.leave(data.old);
      socket.join(data.new);
    });

    socket.on('chatroom:invite', function(data){
      chatroomId ++;
      for (var k in data.selected){
        var id = data.selected[k].id;
        sockets["id"+id].emit('chatroom:invite', {chatroom: "chatroom"+chatroomId, user: data.user});
      }
      socket.leave(data.user.chatroom);
      socket.join("chatroom"+chatroomId);
      socket.emit('chatroom:new',{chatroom: "chatroom"+chatroomId});
    });

    socket.on('message:new', function (msg) {
      io.sockets.in(msg.user.chatroom).emit('message:new', msg);
    });

  });
};