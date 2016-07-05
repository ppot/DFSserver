const fs = require('fs');
const os = require('os');
const exec = require('child_process').exec;
const http = require('http').createServer();
var io = require('socket.io')(http); 
var ss = require('socket.io-stream');
// var redis = require('socket.io-redis');
var redis = require("redis");
var path = require('path');
var util = require('util');
var moment = require('moment');

/* redis */
var host = process.env.REDIS_PORT_6379_TCP_ADDR || '172.16.238.5';
var port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;

var pub = redis.createClient(port, host);
var sub = redis.createClient(port, host);

sub.on("message", function(channel, message) {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
  if(channel == "make_dir") {
    if (!fs.existsSync(message)){
        fs.mkdirSync(message);
    }
  }
});

// 
// sub.subscribe("lock");
// sub.subscribe("put");
// sub.subscribe("get");
sub.subscribe("make_dir");

// io.adapter(redis({ host: host, port: port }));

const roots = '/opt/DFSroots';
var interfaces = os.networkInterfaces();
var ipv4_address = "";
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            ipv4_address = address.address;
        }
    }
}
console.log(ipv4_address);

var dfs_network_list = ["172.16.238.11","172.16.238.12", "172.16.238.13", "172.16.238.14" ];
// var dfs_network_ports = ["3010","3020", "3030", "3040" ];

if (!fs.existsSync(roots)){
    // fs.mkdirSync(roots);
    console.log(':(');    
}

if (fs.existsSync(roots)){
    // fs.mkdirSync(roots);
    console.log(':)');    
}

// for (var k in dfs_network_list) {
//   if(ipv4_address != dfs_network_list[k]) {
//     exec("ping " + dfs_network_list[k] , function (error, stdout, stderr) {
//       console.log('stdout: ' + stdout);
//       console.log('stderr: ' + stderr);
//       if (error !== null) {
//         console.log('exec error: ' + error);
//       }
//     });
//   }
// }

var fileStats = function(socket,dir,items) {
  var list = [];
  items.forEach(function(file){
    var stats = fs.statSync(dir+file);
    var mtime = new Date(util.inspect(stats.mtime));
    var type;
    if(stats.isDirectory()){
      type = 'isDirectory';
    }
    else if(stats.isFile()) {
      type = 'isFile';
    }
    list.push({'name':file,'mtime': moment(mtime).format('DD/MM/YYYY, h:mm:ss A'), 'type': type });
  });
  socket.emit('dir_list', list);
}

io.on('connection', function(socket) {
  console.log('a user connected');
  
  socket.on('dir_listing', function(dir) {
    fs.readdir(dir, function(err, items) {
      fileStats(socket,dir,items);
    });
  });
  
  ss(socket).on('file_upload', function(stream, data) {
     stream.pipe(fs.createWriteStream(data.name));    
  });
  
  socket.on('make_dir', function(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        pub.publish("make_dir", dir);
    }
  });
  
  
  socket.on('chat_message', function(data) {
    console.log('message: ' + data + " " + ipv4_address);
    socket.emit('chat_message', data);
  });
  socket.on('message', function(data) {
    pub.publish("test", "haaaaai");
    pub.publish("test", "kthxbai");
    // socket.broadcast.emit('chat_message', data + " " + ipv4_address);
  });
  socket.on('disconnect', function(){
       console.log('user disconnected');
  });
});
// 
// var sockets = [];
// for (var k in dfs_network_list) {
//   if(ipv4_address != dfs_network_list[k]) {
//     var socket = require('socket.io-client')('http://'+dfs_network_list[k]+':3000',{
//       'reconnect': true,
//       'reconnection delay': 500
//     });
//     socket.on('connect', function(){
//       console.log('registred to ' +dfs_network_list[k] );
//     });
//     socket.on('chat_message', function(msg){
//       console.log('winky wink ' +msg );
//     });
//     sockets.push(socket);
//   }
// }

http.listen(3000, function(){
  console.log('listening on *:3000');
});