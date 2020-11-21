(function(window, document) {
    window.onload = init;

    let count = 0

    function changeDivText(text) {
        document.querySelector('footer > div').innerHTML = text
    }

    function init() {
        changeDivText(count);
        document.querySelector('footer > div').addEventListener('click', () => {
            count++;
            changeDivText(count);
        })
    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions
