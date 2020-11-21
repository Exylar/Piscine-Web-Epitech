$(document).ready(function(){
    $('#button').on("click", function() {
        $.ajax({
            method: "POST",
            url: "ex03.php",
            dataType: 'JSON',
            data: { email: $("#text").val()},
    
            success: function(response){
                $("#name").text(response)
            }
        });

    })
}) 