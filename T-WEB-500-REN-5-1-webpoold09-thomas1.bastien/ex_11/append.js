$(document).ready(function(){
    $("button").on("click", function() {
        $("#listItem").val(function(index, curValue) {
            $('body').append('<div>' + curValue + '</div>');   
        })
    })

});