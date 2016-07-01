$(function() {
  // $("#authError").hide();
  
  $( "#auth" ).click(function() {
    console.log($('#auth-user').val());
    console.log($('#auth-password').val());
    $.post("/api/auth", { username: $('#auth-user').val(), password: $('#auth-password').val()})
      .done(function( res ) {
        if(res.redirect) {
           document.location.href = res.redirect;
        }
      })
      .fail(function(jqxhr, status, error) { 
        // $('#authError').show();
        var error = JSON.parse(jqxhr.responseText);
        console.log(error);
        // $('#authError').html('<p class="text-center">' + error.message + '</p>');
      })
  });
  
});