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

        ajax.open("POST", "http://localhost:8080/predmet", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(predmetObjekat));
    },

    dajPrisustvo: function (kodPredmeta, indexStudenta, sedmica, callback) {

        var ajax = new XMLHttpRequest();

        ajax.onload = function () {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                var resp = JSON.parse(ajax.responseText);
                var status = resp.status;
                var values = status.split(", ");

           
                for (var i = 0; i < values.length; i++) {
    
                    var keyValue = values[i].split(": ");
                    var key = keyValue[0];
                    var value = keyValue[1];

                    if (key == "prisustvoZaSedmicu") {
                        var prisustvoZaSedmicu = value;
                    } else if (key == "prisutan") {
                        var prisutan = value;
                    } else if (key == "odsutan") {
                        var odsutan = value;
                    } else if (key == "nijeUneseno") {
                        var nijeUneseno = value;
                    }
                }
                
                var response = {
                    prisustvoZaSedmicu,
                    prisutan,
                    odsutan,
                    nijeUneseno
                }
            
                callback(null, response);
            } else if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 400) {
                callback(new Error(), null);
            }
        };
        
        var url = "http://localhost:8080/prisustvo?kodPredmeta=" + encodeURIComponent(kodPredmeta) +
            "&indexStudenta=" + encodeURIComponent(indexStudenta) +
            "&sedmica=" + encodeURIComponent(sedmica);

        ajax.open("GET", url, true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
    }
};