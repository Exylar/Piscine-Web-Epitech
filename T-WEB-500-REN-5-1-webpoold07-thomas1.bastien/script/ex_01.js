(function(window, document) {
    window.onload = init;

    function init() {
        document.querySelector('footer > div').innerHTML = "Hello Word !"
    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions
