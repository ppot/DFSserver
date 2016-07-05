$(function() {
  $('#make-folder').hide();
  dir = {
    base:'/opt/DFSroots/',
    path:undefined,
    disp_makeFolderClose: function() {
      $('#folder-name').val('');
      $('#make-folder').hide();
    },
    disp_makeFolder: function() {
      if(serverCon.curentCon != undefined ) {
        $('#make-folder').show();
        $("#folder-name").focus();
      }
    },
    makeFolder: function(name) {
      if(serverCon.curentCon != undefined ) {
        var path = dir.path+name;
        serverCon.curentCon.emit('make_dir',path);
      }
    },
    list: function(name,val) {
      if(serverCon.curentCon != undefined ) {
        // $('#nav').append('<a href="javascript:dir.list(\''+name+'\');">'+val+'</a>');
        if(name != dir.base) {
          dir.path = dir.path+name +"/";
        } else{
          dir.path = name;
        }
        serverCon.curentCon.emit('dir_listing', dir.path);
      }
    }
  };
  $( "#folder-name" ).keypress(function(e) {
    var key = e.keyCode;
    if(key == 27) {
      dir.disp_makeFolderClose(); 
    }
    var name =  $( "#folder-name" ).val();
    if(key == 13 && name.match(/^[^\\/?%*:|"<>\.]+$/)) {
      if(serverCon.curentCon != undefined ) {
        dir.makeFolder(name);
        dir.disp_makeFolderClose(); 
        serverCon.curentCon.emit('dir_listing', dir.path);
      }
    }
  });
  $( "#folder-name" )  .focusout(function() {
    dir.disp_makeFolderClose(); 
  });
});