AjaxGetPromise = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.status == 200) {      
                resolve(this.responseText);
            } else {                   
                reject("Status: " + this.status + ", " + this.statusText);
            }
        };
        xhr.onerror = function (exception) {
            reject(exception);
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
};

AjaxPostPromise = function(url, data) {
    return new Promise(function(resolve, reject) {
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.status == 200) { 
                resolve(this.responseText);
            } else {     
                reject("Status: " + this.status + ", " + this.statusText);
            }
        };
        xhr.onerror = function (exception) {
            reject(exception);
        };
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
};