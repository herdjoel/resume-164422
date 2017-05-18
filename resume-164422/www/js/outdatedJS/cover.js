(function() {
    "use strict";
    window.onload = function() {
        var name = localStorage.getItem("globalName");
        document.getElementById("hello").innerHTML = name + ",";
    }
})();