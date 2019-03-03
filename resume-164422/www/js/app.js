/*
Author: Joel Herd
Class: CS 290_400 Winter 2019 
Date: 3/2/2019
*/

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
        qs("#enterPortfolio a").onclick = enterPortfolio;
        
        var menuOptions = qsa(".menu-fancy a");
        for (var i = 0; i < menuOptions.length; i++) {
            menuOptions[i].onclick = navClick;
        }
        
        // End page loading screen
        $("loadingScreen").classList.add("hidden");
        $("hiddenTillLoad").classList.remove("hidden");
    };
    
    function enterPortfolio() {
        $("enterProjects").classList.add("hidden");
        $("enterPortfolio").classList.add("hidden");
        $("welcomeText").classList.add("hidden");
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
        var filenamePromise = new AjaxGetPromise("contentBlocks/" + filename);
        
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