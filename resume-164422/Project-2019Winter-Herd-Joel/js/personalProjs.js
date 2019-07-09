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

    window.onload = function() {
        var apiKey = "2d56f79bdd2d1a4a46590a0bfa78e1b9";

        // Add GET call behavior
        document.getElementById("enterButton").addEventListener('click', function(event) {
            event.preventDefault();
            getCall("responseText", "enterName", apiKey);
        });
    };

    // Perform Get Call
    function getCall(getResponseId, getValueBtnId, apiKey) {
        var request = new XMLHttpRequest();
        var queryVal = document.getElementById(getValueBtnId).value;
        if (queryVal) {
            var reqUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + queryVal + "&APPID=" + apiKey;
            request.open("GET", reqUrl, true);
            request.addEventListener('load', function() {
                if (request.status >= 200 && request.status < 400) {
                    document.getElementById(getResponseId).textContent = request.responseText;
                } else {
                    document.getElementById(getResponseId).textContent = request.responseText;
                }
            });
            request.send(null);
        }
    }
})();