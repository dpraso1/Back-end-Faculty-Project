var http = require("http");
var url = require("url");
var fs = require("fs");
var bodyParser = require("body-parser");
var express = require("express");
var server = express();
server.use(express.static("../public/"));

server.use(bodyParser.json());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(
    express.text({
        type: ["text/csv", "text/plain"],
    })
);


server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.static(__dirname));
server.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

server.get("/", function (req, res) {
    res.sendFile(__dirname + "/unosPredmeta.html");
});

const PORT = process.env.PORT || 8080;

server.post("/student", function (req, res) {
    let student = req.body;
    let imeStudenta = student.ime;
    let prezimeStudenta = student.prezime;
    let indexStudenta = student.index;

    let novaLinija = "";
    novaLinija += imeStudenta + "," + prezimeStudenta + "," + indexStudenta + "\n";
    //console.log(novaLinija);

    fs.readFile("studenti.csv", function (err, data) {
        if (err) throw err;

        let redoviStudent = data.toString("utf-8").split("\n");
        let sadrzaj = [];

        redoviStudent.forEach((red) => {
            sadrzaj.push(...red.split(","));
        });

        for (let i = 0; i < sadrzaj.length; i++) {
            if (sadrzaj[i] == indexStudenta.toString()) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({  status: "Student sa indexom {" + indexStudenta + "} vec postoji!" }));
                return;
            }
        }
        fs.appendFile("studenti.csv", novaLinija, function (err) {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "Kreiran student!" }));
            return;
        });
    });
});

server.post("/predmet", function (req, res) {
    
    let predmet = req.body;
    let nazivPredmeta = predmet.naziv;
    let kodPredmeta = predmet.kod;

    let novaLinija = "";
    novaLinija += nazivPredmeta + "," + kodPredmeta + "\n";
    //console.log(novaLinija);
    
    let kodIspravan = 0;
    let fileBody = "";

    fs.readFile("predmeti.csv", function (err, data) {
        if (err) throw err;
        
        fileBody = data.toString(("utf-8"));
        fileBody = fileBody.split("\n");
        let regex1 = new RegExp(/^(RI|AE|EE|TK)-(BoE)-([1-3])-([1-2])$/);
        let regex2 = new RegExp(/^(RI|AE|EE|TK)-(MoE|RS)-([1-2])-([1-2])$/);

        if (kodPredmeta < 10 || !(regex1.test(kodPredmeta) || regex2.test(kodPredmeta))) {
            kodIspravan = 1;
        }
        if (kodIspravan == 1) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "Kod predmeta nije ispravan!" }));
            return;
        }

        let redoviPredmet = data.toString("utf-8").split("\n");
        let sadrzaj = [];

        redoviPredmet.forEach((red) => {
            sadrzaj.push(...red.split(","));
        });

        for (let i = 0; i < sadrzaj.length; i++) {
            if (sadrzaj[i] == kodPredmeta.toString()) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({status: "Predmet sa kodom {" + kodPredmeta + "} vec postoji!" }));
                return;
            }
        }
        fs.appendFile("predmeti.csv", novaLinija, function (err) {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "Kreiran predmet!" }));
            return;
        });
    });
});

//server.post("/prisustvo"...)

server.get("/prisustvo", function (req, res) {
    //console.log(req.url)

    req.url = req.url.replace("?", "?&")
    const search_params = new URLSearchParams(req.url);

    let kodPredmetaValue = search_params.get("kodPredmeta");
    let indexValue = search_params.get("indexStudenta");
    let sedmicaValue = search_params.get("sedmica");


    let prisustvoPostoji = 0;
    let arr = [];
    let obj = {
        kodPredmeta: kodPredmetaValue,
        indexStudenta: indexValue,
        sedmicaValue: sedmicaValue
    }
    arr.push(obj);
    fs.readFile("prisustva.csv", "utf-8", function (err, data) {

        let niz = [];
        let tekst = data.toString();
        let redovi = tekst.split("\n");
        let brojacpr = 0;
        let brojacod = 0;
        let brojacnU = 0;
        var pr = "prisutan";
        var od = "odsutan";
        var nU = "nijeUneseno";

        for (let i = 0; i < redovi.length; i++) {
            let kolone = redovi[i].split(",");

            let objekat = {
                tipCasa: kolone[0],
                redniBrojCasa: kolone[1],
                sedmica: kolone[2],
                kodPredmeta: kolone[3],
                indexStudenta: kolone[4],
                statusPrisustva: kolone[5]
            };

            let status = objekat.statusPrisustva;

            if (objekat.kodPredmeta == kodPredmetaValue && objekat.indexStudenta == indexValue && objekat.sedmica == sedmicaValue) {
                prisustvoPostoji = 1;
                if (status == pr) {
                    brojacpr++;
                } else if (status == od) {
                    brojacod++;
                } else if (status == nU) {
                    brojacnU++;
                }
            }
        }

        if (prisustvoPostoji == 0) {
            res.json({ status: "Prisustvo ne postoji!" }) ;
            res.end();
            return;
        }
        if (prisustvoPostoji == 1) {
            res.json({ status: "prisustvoZaSedmicu: " + sedmicaValue + ", prisutan: " + brojacpr + ", odsutan: " + brojacod + ", nijeUneseno: " + brojacnU });
            res.end();
            return;
        }
        
    });

});

server.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;