/*
 * Serve content over a socket
 */

// module.exports = function (socket) {
//   socket.emit('send:name', {
//     name: 'Eric'
//   });
//   socket.on('message:new', function(data){
//     console.log('new:message');
//     socket.emit('message:new', data); 
//   });
// };

module.exports = function (io) {
  'use strict';
  io.on('connection', function (socket) {
    socket.emit('send:user', {
      name: 'Eric',
      id:0
    });

    socket.on('message:new', function (msg) {
 
      console.log('recieved msg ', JSON.stringify(msg));
 
      console.log('broadcasting message');
      io.sockets.emit('message:new', msg);
      console.log('broadcast complete');
    });
  });
};