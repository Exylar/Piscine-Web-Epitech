(function(window, document) {
    window.onload = init;

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    function init() {

        var footer = document.querySelector('footer');
        div = document.createElement('div');
        footer.append(div);   
        a = document.createElement('a');
        a.setAttribute("href", "#");
        a.innerHTML = "Delete the cookie"
        div.appendChild(a);
        document.querySelectorAll('footer div')[1].style.display = "none";

        if (getCookie("acceptsCookies") == "true") {
            document.querySelectorAll('footer div')[1].style.display = "block";
            document.querySelectorAll('footer div')[0].style.visibility = "hidden"
        }

        document.querySelector('footer div a').addEventListener('click', () => {
            let date = new Date(Date.now() + 86400e3);
            date = date.toUTCString();
            document.cookie = "acceptsCookies=true; expires=" + date;
            document.querySelectorAll('footer div')[0].style.visibility = "hidden"
            document.querySelectorAll('footer div')[1].style.display = "block";
        })

        document.querySelectorAll('footer div')[1].querySelector('a').addEventListener('click', () => {
            let date = new Date(Date.now());
            date = date.toUTCString();
            document.cookie = "acceptsCookies=true; expires= " + date;
            document.querySelectorAll('footer div')[0].style.visibility = "visible"
            document.querySelectorAll('footer div')[1].style.display = "none";
        })

    }

})(window, document) // Pattern IIFE : Immediately Invoked Function Expressions
