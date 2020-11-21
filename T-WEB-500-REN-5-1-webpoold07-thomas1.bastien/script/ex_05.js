(function(window, document) {
    window.onload = init;

    let fontSize = 16;
    
    function changeColor(color) {
        document.querySelector('body').style.backgroundColor = color;
    }

    function changeSize(size) {
        document.querySelector('body').style.fontSize = fontSize + "px"
    }

    function init() {

        document.querySelector('select').addEventListener('change', () => {
            var element = document.querySelector('select');
            var color = element.options[element.selectedIndex].value
            console.log(color)
            changeColor(color)
        })

        document.querySelectorAll('footer div button')[0].addEventListener('click', () => {
            fontSize++
            changeSize(fontSize);
        })

        document.querySelectorAll('footer div button')[1].addEventListener('click', () => {
            fontSize--
            changeSize(fontSize);
        })
    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions