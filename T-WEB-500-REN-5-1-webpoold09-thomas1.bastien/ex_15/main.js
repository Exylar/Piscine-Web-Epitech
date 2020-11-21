$(document).ready(function(){
    $('input').keypress(function(event) {
        if (event.keyCode == 13) {
            $("ul").append('<li>'+ $('input').val() +'</li>');
        }
    });
});