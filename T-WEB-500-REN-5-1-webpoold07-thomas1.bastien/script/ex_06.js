(function(window, document) {
    window.onload = init;

    function changeDivText(text) {
        document.querySelector('footer > div').innerHTML = text
    }

    function init() {

        function Hero(name, classe, intelligence, strength) {
            this.name = name;
            this.classe = classe;
            this.intelligence = intelligence;
            this.strength = strength;

            this.toString = function() {
                return "I am " + name + " the " + classe + ", I have " + intelligence + " intelligence points and " + strength + " strength points"
            }
        }

        var mage = new Hero("amadeus", "mage", 10, 3);
        var warrior = new Hero("pontius", "warrior", 1, 8);

        changeDivText(mage.toString() + '<br />' +  warrior.toString())

    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions