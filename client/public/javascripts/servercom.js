$(function() {
  serverCon = {
    dfs_map : {
      "1":{addr:"http://192.168.99.100:3010",status:false},
      "2":{addr:"http://192.168.99.100:3020",status:false},
      "3":{addr:"http://192.168.99.100:3030",status:false},
      "4":{addr:"http://192.168.99.100:3040",status:false}
    },
    currently: undefined,
    curentCon: undefined,
    newCon: function(host) {
        if(serverCon.currently === host) return;
        else if(serverCon.dfs_map[host].status){
          $("#dfs_" + serverCon.currently + "_con").html('');
          $('#nav').html('');
          serverCon.currently = host;
          if(serverCon.curentCon != null){
            serverCon.curentCon.disconnect();
            
          }
          serverCon.curentCon = undefined;
          $("#dfs_" + serverCon.currently + "_con").html('<span class="up connected">connected</span>');
          serverCon.curentCon = io.connect(serverCon.dfs_map[host].addr);
          serverCon.curentCon.on('connect', function () {
            dir.list(dir.base, 'DFSroots >');
         });
         serverCon.curentCon.on('dir_list', function (data) {
           $("#directory").html('');
             for (var i=0; i<data.length; i++) {
                 if(data[i].type === 'isDirectory') {
                   $("#directory").append(
                     '<tr><td><i class="fa fa-folder folder" aria-hidden="true"></i><a href="javascript:dir.list(\''+data[i].name+'\');">'+data[i].name+'</a></td><td> -- </td></tr>'
                   );
                 } else if(data[i].type === 'isFile') {
                   $("#directory").append(
                     '<tr><td><i class="fa fa-file file" aria-hidden="true"></i> '+data[i].name+'</td><td>'+data[i].mtime+'</td></tr>'
                   );   
                 }
             }
          });
        }
    }
  }
  
  $('#file').change(function(e) {
    if(serverCon.curentCon != undefined ) {
      var file = e.target.files[0];
      var stream = ss.createStream();
      ss(serverCon.curentCon).emit('file_upload',stream, {size: file.size, name: dir.path + file.name});
      var blobStream = ss.createBlobReadStream(file);
      var size = 0;

      blobStream.on('data', function(chunk) {
        size += chunk.length;
        console.log(Math.floor(size / file.size * 100) + '%');
        // -> e.g. '42%'
      });

      blobStream.pipe(stream);
      // ss.createBlobReadStream(file).pipe(stream);
    }
  });
});