module.exports = function (io) {
  'use strict';
  io.on('connection', function(socket) {
    socket.on('disconnect', function(){
         console.log('user disconnected');
    });
  });
};
