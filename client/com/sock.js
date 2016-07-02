module.exports = function (io) {
  'use strict';
  io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function(){
         console.log('user disconnected');
    });
  });
};
