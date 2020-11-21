(function(window, document) {
    window.onload = init;

    var parentDiv = document.querySelectorAll('footer div')[0];
    var parentDivDimension = parentDiv.getBoundingClientRect();



    function changeDivText(x, y) {
        if (isNaN(x))  {
            x=parentDivDimension.x + parentDivDimension.width
        }
        document.querySelectorAll('footer > div')[1].innerHTML = " New coordinates => {x:" + (x - parentDivDimension.x)  + ", y:" + (y - parentDivDimension.y) + "} "
    }




    function init() {
        
        var element = document.querySelector('canvas');
        element.style.position = 'absolute';

        var rect = element.getBoundingClientRect();    
        changeDivText(rect.x, rect.y)

        document.querySelector('canvas').addEventListener('mousedown', (event) => {
            document.body.append(element);
          
            function moveAt(pageX, pageY) {
                positionX = pageX - element.offsetWidth / 2 
                positionY = pageY - element.offsetWidth / 2 
                
                if (positionX > parentDivDimension.x + parentDivDimension.width - 20)  {positionX = parentDivDimension + parentDivDimension.width - 20 }
                if (positionX < parentDivDimension.x - 5 )  {positionX = parentDivDimension.x - 5}
                if (positionY > parentDivDimension.y + 40)  {positionY = parentDivDimension.y + 40}
                if (positionY < parentDivDimension.y)  {positionY = parentDivDimension.y}

                element.style.left = positionX + 'px';
                element.style.top = positionY + 'px';
                changeDivText(positionX , positionY)
            }
            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
          
            document.addEventListener('mousemove', onMouseMove);

            
            element.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                element.onmouseup = null;
            };
        })
    }

    

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions
