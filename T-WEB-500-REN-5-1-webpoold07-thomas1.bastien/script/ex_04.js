(function(window, document) {
    window.onload = init;

    let text = "";
    
    function changeDivText(text) {
        document.querySelector('footer > div').innerHTML = text
    }

    function init() {
        document.addEventListener('keypress', (event) => {
            const letter = event.key;
            text = text + letter
            changeDivText(text.slice(-42))
        })
    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions