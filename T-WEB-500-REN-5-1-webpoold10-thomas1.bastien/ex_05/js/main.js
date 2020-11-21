$(document).ready(function(){
    $('#button').on("click", function() {
        $.getJSON( "countries.json", function( data ) {
            var items = [];

            $.each( data, function( key, val ) {
                
              items.push( "<tr><td>" + key + "</td><td>" + val + "</td></tr>" );
            });
           
            $( "<table/>", {
              "class": "table",
              html: items.join( "" )
            }).appendTo( "body" );
          });

    })
})
