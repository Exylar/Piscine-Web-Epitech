(function(window, document) {
    window.onload = init;

    function changeDivText(text) {
        document.querySelector('footer > div').innerHTML = text
    }

    function confirmName(name) {
        if (confirm("Are you sure that " + name + " is your name ?"))
            changeDivText("Hello " + name + " !")
    }

    function displayPrompt() {
        var name = prompt("What's your name ?")
        if (name == null || name == "")
            displayPrompt()
        else
            confirmName(name)
    }

    function init() {
        document.querySelector('footer > div').addEventListener('click', () => {
            displayPrompt()
        })
    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions
