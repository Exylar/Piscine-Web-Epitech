(function(window, document) {
    window.onload = init;

    function init() {

        var x = document.querySelectorAll("canvas").length;

        var ratio = x/3;

        var canvas = document.querySelectorAll("canvas");
        
        for (var i = 0; i < ratio; i++) {
            canvas.item(i).style.backgroundColor = "orange"
        }

        for (var j = ratio; j < ratio * 2; j++) {
            canvas.item(j).style.backgroundColor = "purple"
        }
        
        for (var j = 2 * ratio; j < 2 * ratio + 1; j++) {
            canvas.item(j).style.backgroundColor = "black"
        }

        for (var j = 2 * ratio + 1; j < x; j++) {
            canvas.item(j).style.backgroundColor = "olive"
        }

    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions