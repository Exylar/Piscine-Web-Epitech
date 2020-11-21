$(document).ready(function(){
    $('#button').on("click", function() {
        $.getScript( "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js", function( data, textStatus, jqxhr ) {
            console.log( "Load was performed." );
          });

    })
})
