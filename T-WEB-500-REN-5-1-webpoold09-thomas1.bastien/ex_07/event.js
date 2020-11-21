$(document).ready(function(){
    $("p").on("mouseover", function() {
        $("p").css('background-color', 'lightgray');
    })
    $("p").on("mouseout", function() {
        $("p").css('background-color', 'white');
    })
    $("p").on("click", function() {
        $("p").hide()
    })
});