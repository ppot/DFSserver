'use strict';
module.exports = function (io) {
  var ping = require('ping');
  var DfsStatus = require('../model/status.js');
  var dfs_map = {
    "172.16.238.11": "dfs_1",
    "172.16.238.12": "dfs_2",
    "172.16.238.13": "dfs_3",
    "172.16.238.14": "dfs_4"
  }
  var dfs_network_list = ["172.16.238.11","172.16.238.12", "172.16.238.13", "172.16.238.14" ];
  var netWorkPing = function() {
    dfs_network_list.forEach(function(host){
        ping.sys.probe(host, function(isAlive){
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            var dfs_entry = new DfsStatus(dfs_map[host],host, isAlive);
            io.sockets.emit('server_status', JSON.stringify(dfs_entry));
        });
    });
  }
  setInterval(netWorkPing, 5*1000);
}