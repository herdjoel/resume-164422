(function() {
    "use strict";
    
    var $ = function(id) { return document.getElementById(id); };
    var qsa = function(sel) { return document.querySelectorAll(sel); };
    var qs = function(sel) { return document.querySelector(sel); };
    
    window.requestAF = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
 
    window.cancelAF = (function(){
        return window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        function( requestID ) {
            clearTimeout(requestID)
        };
    })();
        
    var START_STOP_RAF;

    window.onload = function() {
        $("enterButton").addEventListener("click", function(event){
            event.preventDefault();
            clickFunction();
        });
        qs("#enterPortfolio a").onclick = enterPortfolio;
        
        var menuOptions = qsa(".menu-fancy a");
        for (var i = 0; i < menuOptions.length; i++) {
            menuOptions[i].onclick = navClick;
        }
        // var sliderImg = qsa("#CustomSlider img");
        // sliderImg[0].onclick = 
        // sliderImg[1].onclick = 
        // sliderImg[2].onclick = 
        // sliderImg[3].onclick = 
        // sliderImg[4].onclick = 
        
        // End page loading screen
        $("loadingScreen").classList.add("hidden");
        $("hiddenTillLoad").classList.remove("hidden");
    };
    
    function enterPortfolio() {
        $("enterProjects").classList.add("hidden");
        $("enterPortfolio").classList.add("hidden");
        $("inputArea").classList.remove("hidden");
        $("welcomeText").innerHTML = "\"<em>Momma always told me not to talk to strangers...</em>\"";
    }
    
    function clickFunction() {
        var name = $("enterName").value;
        var welcome = "Well";
        var nameFinal = "";
        if (name.length > 0) {
            if (name.indexOf(' ') == -1) {
                nameFinal = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
            } else {
                var splitName = name.split(' ');
                for (var i = 0; i < splitName.length; i++) {
                    if (i > 0)
                        nameFinal += " ";
                    nameFinal += splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1).toLowerCase(); 
                }
            }
            welcome += " ";
        }
        welcome += nameFinal + ", I guess we ain't strangers no more!";
        
        $("welcomeText").innerHTML = welcome;
        $("inputArea").classList.add("hidden");;
        localStorage.setItem("globalName", nameFinal);
        qs(".menu-fancy").classList.remove("hidden");
    }
    
    function navClick () {
        $("mainContent").innerHTML = "";
        var section = this.innerHTML;
        var filename;
        if (section === "About") {
            filename = "aboutme.txt";
        } else if (section === "Education") {
            filename = "education.txt";
        } else if (section === "Experience") {
            filename = "experience.txt";
        } else if (section === "Projects") {
            filename = "personalprojects.txt";
        }
        $("welcomeText").classList.add("hidden");
        loading();
        updateContent(filename);
    }
    
    function updateContent(filename) {
        var filenamePromise = new AjaxGetPromise("webServices/updateContent.php?filename=" + filename);
        
        filenamePromise
            .then(loadContent)
            .catch(function( errorMsg ) { alert( "ERROR: " + errorMsg ); } );
    }
    
    function loadContent(response) {
        loading();
        $("mainContent").innerHTML = response;
    }
    
    function loading() {
        if ($("loadMainContent").classList.contains("hidden")) {
            $("loadMainContent").classList.remove("hidden");
        } else {
            $("loadMainContent").classList.add("hidden");
        }
    }
})();