$(document).ready(function(){


    $('#button').on("click", function() {
      $.ajax({
        method: "GET",
        url: "ex06.php",
        dataType: 'JSON',
        data: { type: $("#type"), brand: $("#brand") },

        success: function(response){
          
        }
    });

    });
})
