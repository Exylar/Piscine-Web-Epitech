$(document).ready(function(){
    $("p").on("mouseenter", function(){
        $(this).addClass("blue");
    })
    $("p").on("mouseout", function(){
        $(this).removeClass("blue");
    })
    $("p").on("click", function(){
        $(this).toggleClass("highlighted");
    })
});