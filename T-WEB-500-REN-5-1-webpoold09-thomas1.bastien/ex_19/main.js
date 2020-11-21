$(document).ready(function(){

    var tag = ""

    $("#tag").on("click", function() {
        if ($("#itag").val() != "") {
            tag += $("#itag").val() + ", "

            $("#listtag").append('<li>' + $("#itag").val() +'</li>');
            $("#itag").val("")
        }
    });

    $("#ctag").on("click", function() {
        tag = ""
        $("#listtag").empty()
    })
    

    $('#create').on("click", function(event) {
        if ($('#entryvalue').val() !== "") {
            if ($('select').val() == "email") {
                if (isEmail($('input').val())) {
                    $("#listentry").append('<li class="' + $('select').val() + '">'+ $('#entryvalue').val() +' <div> tags: ' + tag + ' </div></li>');
                    $("#email").css("display", "none");
                    tag = ""
                    $("#listtag").empty()
                }
                else {
                    $("#email").css("display", "block");
                }
            }
            else {
                $("#listentry").append('<li class="' + $('select').val() + '">'+ $('input').val() +' <div> tags: ' + tag + ' </div> </li>');
                $("#email").css("display", "none");
                tag = ""
                $("#listtag").empty()
            }
        }
    });

    $('#search').on("click", function() {
        $("#listentry li").show()
        if ($('.search_type').val() !== "all")
            $("#listentry li[class!='"+ $('.search_type').val()+"']").hide();
        $("#listentry li:not(:contains(" + $('#isearch').val() + "))").hide()
    })

    
    $('#reset').on("click", function() {
        $("#listentry li").show()
    })
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }