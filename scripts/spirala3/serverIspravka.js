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
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

server.get("/", function (req, res) {
    res.sendFile(__dirname + "/unosPredmeta.html");
});

server.get("/", function (req, res) {
    res.set("Content-Type", "text/html");
    res.sendFile(__dirname + "/prisustvo.html");
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
                res.end(JSON.stringify({ status: "Student sa indexom {" + indexStudenta + "} vec postoji!" }));
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
                res.end(JSON.stringify({ status: "Predmet sa kodom {" + kodPredmeta + "} vec postoji!" }));
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

server.post("/prisustvo", function (req, res) {

    let prisustvo = req.body;
    let tip_casa = prisustvo.tipCasa;
    let redni_broj_casa = prisustvo.redniBrojCasa;
    let index_studenta = prisustvo.indexStudenta;
    let sedmica = prisustvo.sedmica;
    let kod_predmeta = prisustvo.kodPredmeta;
    let status_prisustva = prisustvo.statusPrisustva;


    let novaLinija = "";
    // novaLinija += tip_casa + "," + redni_broj_casa + "," + sedmica + "," + kod_predmeta + "," + index_studenta + "," + status_prisustva + "\n";
    console.log(novaLinija);

    let regex1 = new RegExp(/^(Predavanje|Vjezba|Tutorijal|)$/);
    let regex2 = new RegExp(/^(prisutan|odsutan|nijeUneseno|)$/);

    let statusPrisustvaIspravan = 0;

    //let predmetPostoji = 0;
    //let studentPostoji = 0;
    let prisustvoPostoji = 0;
    let azurirajPrisustvo = 0;
    let fileBody = "";


    if (regex2.test(status_prisustva)) {
        statusPrisustvaIspravan = 1;
    }
    if (statusPrisustvaIspravan == 0) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "Status prisustva nije ispravan!" }));
        return;
    }
    /*
    fs.readFile("predmeti.csv", function (err, data) {
        if (err) throw err;

        fileBody = data.toString();
        if (fileBody.includes(kod_predmeta))
            predmetPostoji = 1
    });


    fs.readFile("studenti.csv", function (err, data) {
        if (err) throw err;

        fileBody = data.toString();
        if (fileBody.includes(index_studenta))
            studentPostoji = 1;
    });

*/
    fs.readFile("prisustva.csv", function (err, data) {

        if (err) throw err;


        /*
                if (predmetPostoji == 0) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ status: "Kod predmeta ne postoji" }));
                    return;
                }
                if (studentPostoji == 0) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ status: "Student ne postoji!" }));
                    return;
                }*/

        let redoviPrisustvo = data.toString("utf-8").split("\n");
        let sadrzaj = [];


        for (let i = 0; i < redoviPrisustvo.length; i++) {

            let red = redoviPrisustvo[i].split(",");

            if (red != "") {

                let tipCasa = red[0].toString();
                let redniBrojCasa = red[1].toString();
                let Sedmica = red[2].toString();
                let kodPredmeta = red[3].toString();
                let indexStudenta = red[4].toString();
                let statusPrisustva = red[5].toString();

                sadrzaj.push(tipCasa)
                sadrzaj.push(redniBrojCasa)
                sadrzaj.push(sedmica)
                sadrzaj.push(kodPredmeta)
                sadrzaj.push(indexStudenta)
                //console.log(redoviPrisustvo[i])
                //console.log(objekat.statusPrisustva)
                if (tip_casa.toString() == tipCasa &&
                    redni_broj_casa.toString() == redniBrojCasa &&
                    sedmica.toString() == Sedmica &&
                    kod_predmeta.toString() == kodPredmeta && index_studenta.toString() == indexStudenta && status_prisustva.toString() == statusPrisustva) {
                    prisustvoPostoji = 1;
                }
                if (prisustvoPostoji) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ status: "Prisustvo postoji!" }));
                    return;
                }

                if (tip_casa.toString() == tipCasa &&
                    redni_broj_casa.toString() == redniBrojCasa &&
                    sedmica.toString() == Sedmica &&
                    kod_predmeta.toString() == kodPredmeta) {
                    azurirajPrisustvo = 1;
                    sadrzaj.push(status_prisustva.toString());
                } else {
                    sadrzaj.push(statusPrisustva)
                    //console.log(sadrzaj);
                }
            }
        }

        if (azurirajPrisustvo) {
            let brojac = 0;
            for (let i = 0; i < sadrzaj.length; i++) {
                if (brojac < 5) {
                    novaLinija += sadrzaj[i].toString() + ",";
                    brojac++;
                } else {
                    novaLinija += sadrzaj[i].toString() + "\n";
                    brojac = 0;
                }
            }

            fs.writeFile("prisustva.csv", novaLinija, function (err) {
                if (err) throw err;
            });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "Azurirano prisustvo!" }));
            return;
        }


        novaLinija += tip_casa + "," + redni_broj_casa + "," + sedmica + "," + kod_predmeta + "," + index_studenta + "," + status_prisustva + "\n";


        fs.appendFile("prisustva.csv", novaLinija, function (err) {
            if (err) throw err;

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "Kreirano prisustvo!" }));
            return;

        });
    });

});

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
        if (err) throw err;

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
            if (err) throw err;
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "Prisustvo ne postoji!" }));
            return;
        }
        if (prisustvoPostoji == 1) {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "prisustvoZaSedmicu: " + sedmicaValue + ", prisutan: " + brojacpr + ", odsutan: " + brojacod + ", nijeUneseno: " + brojacnU }));
            return;
        }

    });

});

server.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;