$(document).ready(function(){
    $('#button').on("click", function() {

        $.ajax({
            method: "get",
            url: "ex02.php", 
            dataType: 'JSON',
    
            success: function(response){
                $("#name").text(response)
            }
        });
    })
}) 