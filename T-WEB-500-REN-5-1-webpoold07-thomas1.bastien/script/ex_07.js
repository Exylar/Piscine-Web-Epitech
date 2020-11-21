(function(window, document) {
    window.onload = init;

    function init() {

        var canvasElement = document.querySelector("canvas");
        var context = canvasElement.getContext("2d");

        // the triangle
        context.beginPath();
        context.moveTo(6, 6);
        context.lineTo(14, 10);
        context.lineTo(6, 14);
        context.closePath();

        // the outline
        context.lineWidth = 1;
        context.strokeStyle = '#666666';
        context.stroke();

        // the fill color
        context.fillStyle = "#FFCC00";
        context.fill();

        var audio = new Audio('https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3');

        document.querySelector('canvas').addEventListener('click', () => {
            audio.play();
        })
        
        document.querySelectorAll('footer div')[1].querySelectorAll('button')[0].addEventListener('click', () => {
            audio.pause();
        })

        document.querySelectorAll('footer div')[1].querySelectorAll('button')[1].addEventListener('click', () => {
            audio.pause();
            audio.currentTime = 0;
        })

        document.querySelectorAll('footer div')[1].querySelectorAll('button')[2].addEventListener('click', () => {
            audio.muted = !audio.muted;
        })

    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions