$(document).ready(function(){
    $('#create').on("click", function(event) {
        if ($('input').val() !== "") {
            if ($('select').val() == "email") {
                if (isEmail($('input').val())) {
                    $("ul").append('<li class="' + $('select').val() + '">'+ $('input').val() +'</li>');
                    $("#email").css("display", "none");
                }
                else {
                    $("#email").css("display", "block");
                }
            }
            else {
                $("ul").append('<li class="' + $('select').val() + '">'+ $('input').val() +'</li>');
                $("#email").css("display", "none");
            }
        }
    });
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}