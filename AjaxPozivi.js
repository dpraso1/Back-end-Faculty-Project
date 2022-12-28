const AjaxPozivi = {

    posaljiStudent: function (studentObjekat, callback) {

        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                callback(null, ajax.responseText);
            }
            else if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 400) {
                callback(new Error(), null);
            }
        };

        ajax.open("POST", "http://localhost:8080/student", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(studentObjekat));
    },

    posaljiPredmet: function (predmetObjekat, callback) {

        var ajax = new XMLHttpRequest();
        
        ajax.onreadystatechange = function () {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                callback(null, ajax.responseText);
            }
            else if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 400) {
                callback(new Error(), null);
            }
        };
        
        ajax.open("POST", "http://localhost:8080/predmet", true );
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(predmetObjekat));
    }

};

