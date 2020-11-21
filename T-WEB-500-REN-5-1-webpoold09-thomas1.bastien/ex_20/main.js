$(document).ready(function(){

    var listTag = []
    var searchListTag = []


    // New entry
    // Add tag if has text in the input text
    $("#tag").on("click", function() {
        if ($("#inputTag").val() != "") {
            listTag.push($("#inputTag").val())
            $("#listTag").append('<li>' + $("#inputTag").val() +'</li>');
            $("#inputTag").val("")
        }
    });

    // Clear all tag 
    $("#clearTag").on("click", function() {
        listTag = [];
        $("#listTag").empty()
        $("#inputTag").val("")
    })

    // Search Tag
    // Add tag if has text in the input text
    $("#searchTag").on("click", function() {
        if ($("#searchInputTag").val() != "") {
            searchListTag.push($("#searchInputTag").val())
            $("#searchListTag").append('<li>' + $("#searchInputTag").val() +'</li>');
            $("#searchInputTag").val("")
        }
    });

    // Clear all tag 
    $("#searchClearTag").on("click", function() {
        searchListTag = [];
        $("#searchListTag").empty()
        $("#searchInputTag").val("")
    })

    
    // add Element
    $('#create').on("click", function(event) {
        if ($('#entryValue').val() !== "") {
            if ( ($('select').val() == "email" && isEmail($('input').val())) || $('select').val() != "email") {
                $("#listentry").prepend('<li class="' + $('select').val() + '"> <a>'+ $('#entryValue').val() +'</a> </li>');
                $.each( listTag, function( index, value ){
                    $("#listentry li").first().append("<div>" + value + "</div>")
                });
                $("#email").css("display", "none");
                listTag = []
                $("#inputTag").val("")
                $("#listTag").empty()
                $("#entryValue").val("")
            } else {
                $("#email").css("display", "block");
            }
        }
    });

    // search condition
    $('#search').on("click", function() {
        $("#listentry li").hide()
        if ($('.search_type').val() !== "all")
            $("#listentry li[class='"+ $('.search_type').val()+"']").show();
        else {
            $("#listentry li").show()
        }
        $("#listentry li a:not(:contains(" + $('#isearch').val() + "))").parent().hide()

        $.each(searchListTag, function(index, value ){
            $("#listentry li div:not(:contains(" + value + "))").parent().hide()
        });

    })


    

    
    // reset all seach parameter
    $('#reset').on("click", function() {
        $("#listentry li").show()
    })
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }