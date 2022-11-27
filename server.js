let http = require('http');
let url = require('url');
let fs = require('fs');
const { patch } = require('superagent');
const PORT = process.env.PORT || 8080;

const server = http.createServer(function (req, res) {

    if (req.method == 'POST') {

        if (req.url == '/student') {

            let tijeloZahtjeva = '';
            req.on('data', function (data) {
                tijeloZahtjeva += data;
            });

            let niz = [];
            req.on('end', function () {
                let parametri = new url.URLSearchParams(tijeloZahtjeva);
                let brojIndexa = parametri.get('index');
                let novaLinija = '';

                novaLinija += '\n' + parametri.get('ime') + ',' +
                    parametri.get('prezime') + ',' +
                    parametri.get('index');

                let studentPostoji = 0;
                let fileBody = '';

                fs.readFile('studenti.csv', function (err, data) {
                    if (err) throw err;

                    let redoviStudent = data.toString("utf-8").split("\n");
                    let sadrzaj = [];

                    redoviStudent.forEach((red) => {
                        sadrzaj.push(...red.split(","));
                    });

                    for (let i = 0; i < sadrzaj.length; i++) {
                        if (sadrzaj[i] == brojIndexa.toString()) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            let objekat = { status: 'Student sa indexom {' + brojIndexa + '} vec postoji!' };
                            niz.push(objekat);
                            res.end(JSON.stringify(niz));
                            // console.log(objekat);
                            return;

                        }
                    }
                    fs.appendFile('studenti.csv', novaLinija, function (err) {
                        if (err) throw err;
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Kreiran student!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));
                        //console.log(objekat);
                        return;
                    });

                });
            });
        }

        if (req.url == '/predmet') {

            let tijeloZahtjeva = '';
            req.on('data', function (data) {
                tijeloZahtjeva += data;
            });

            let niz = [];
            req.on('end', function () {
                let parametri = new url.URLSearchParams(tijeloZahtjeva);
                let kodPredmeta = parametri.get('kod');
                let novaLinija = '';

                novaLinija += '\n' + parametri.get('naziv') + ',' +
                    parametri.get('kod');

                let predmetPostoji = 0;
                let kodIspravan = 0;
                let fileBody = '';


                fs.readFile('predmeti.csv', function (err, data) {
                    if (err) throw err;

                    fileBody = data.toString(("utf-8"));
                    fileBody = fileBody.split('\n');
                    let regex1 = new RegExp(/^(RI|AE|EE|TK)-(BoE)-([1-3])-([1-2])$/);
                    let regex2 = new RegExp(/^(RI|AE|EE|TK)-(MoE|RS)-([1-2])-([1-2])$/);


                    if (kodPredmeta < 10 || !(regex1.test(kodPredmeta) || regex2.test(kodPredmeta))) {
                        kodIspravan = 1;
                    }
                    if (kodIspravan == 1) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Kod predmeta nije ispravan!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));
                        //console.log(objekat);
                    }
                    if (fileBody.includes(parametri.get('kod')))
                        predmetPostoji = 1;

                    if (predmetPostoji == 1) {

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Predmet sa kodom {' + parametri.get('kod') + '} vec postoji!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));
                        // console.log(objekat);

                    } else if (predmetPostoji == 0 && kodIspravan == 0) {

                        fs.appendFile('predmeti.csv', novaLinija, function (err) {
                            if (err) throw err;
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            let objekat = { status: 'Kreiran predmet!' };
                            niz.push(objekat);
                            res.end(JSON.stringify(niz));
                            // console.log(objekat);
                        });
                    }
                });
            });
        }

        if (req.url == '/prisustvo') {

            let tijeloZahtjeva = '';
            req.on('data', function (data) {
                tijeloZahtjeva += data;
            });

            let niz = [];
            req.on('end', function () {

                let parametri = new url.URLSearchParams(tijeloZahtjeva);
                let regex1 = new RegExp(/^(Predavanje|Vjezba|Tutorijal|)$/);
                let regex2 = new RegExp(/^(prisutan|odsutan|nijeUneseno|)$/);
                let tip_casa = parametri.get('tipCasa');
                let redni_broj_casa = parametri.get('redniBrojCasa');
                let rbc = parseInt(redni_broj_casa);
                let index_studenta = parametri.get('indexStudenta');
                let sedmica = parametri.get('sedmica');
                let s = parseInt(sedmica);
                let kod_predmeta = parametri.get('kodPredmeta');
                let status_prisustva = parametri.get('statusPrisustva');
                let novaLinija = '';


                novaLinija += parametri.get('tipCasa') + ',' + rbc + ',' +
                    s + ',' + parametri.get('kodPredmeta') + ',' +
                    parametri.get('indexStudenta') + ',' + parametri.get('statusPrisustva') + '\n';

                let fileBody = '';
                let statusPrisustvaIspravan = 0;
                let studentPostoji = 0;
                let predmetPostoji = 0;
                let tipIspravan = 0;
                let brojCasaIspravan = 0;
                let sedmicaIspravna = 0;
                let sedmicaCas = 0;
                let kodIspravan = 0;
                let unosPostoji = 0;
                let azuriranStatusPrisustva = 0;


                if (!(regex1.test(tip_casa))) {
                    tipIspravan = 1;
                }
                if (tipIspravan == 1) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    let objekat = { status: 'Tip nije ispravan!' };
                    niz.push(objekat);
                    res.end(JSON.stringify(niz));
                    //console.log(objekat);
                }

                if (rbc > 0 && rbc < 15) {
                    brojCasaIspravan = 1;
                }
                if (brojCasaIspravan == 0) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    let objekat = { status: 'Broj casa nije ispravan!' };
                    niz.push(objekat);
                    res.end(JSON.stringify(niz));
                    //console.log(objekat);
                }

                if (s > 0 && s < 15) {
                    sedmicaIspravna = 1;
                }
                if (sedmicaIspravna == 0) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    let objekat = { status: 'Sedmica nije ispravna!' };
                    niz.push(objekat);
                    res.end(JSON.stringify(niz));
                    //console.log(objekat);
                }

                if (rbc == s) {
                    sedmicaCas = 1;
                }
                if (sedmicaCas == 0) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    let objekat = { status: 'Redni broj casa ne odgovara sedmici!' };
                    niz.push(objekat);
                    res.end(JSON.stringify(niz));
                    //console.log(objekat);
                }

                fs.readFile('predmeti.csv', function (err, data) {
                    if (err) throw err;

                    fileBody = data.toString();
                    if (fileBody.includes(kod_predmeta))
                        predmetPostoji = 1;

                    if (predmetPostoji == 0) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Kod predmeta ne postoji' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));
                        console.log(objekat);
                    }
                });

                fs.readFile('studenti.csv', function (err, data) {
                    if (err) throw err;

                    fileBody = data.toString();


                    if (fileBody.includes(index_studenta))
                        studentPostoji = 1;

                    if (studentPostoji == 0) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Student sa indeksom' + index_studenta + 'ne postoji!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));
                        console.log(objekat);
                    }
                });

                fs.readFile('prisustva.csv', function (err, data) {
                    if (err) throw err;

                    fileBody = data.toString();
                    if (fileBody.includes(index_studenta)) {
                        unosPostoji = 1;

                    }
                    if (unosPostoji == 1) {
                        fileBody = fileBody.split('\n');

                        fileBody.forEach(element => {
                            element = element.split(',');
                            if (element.includes(index_studenta)) {
                                stara = element[0] + ',' + element[1] + ',' + element[2] + ',' + element[3] + ',' + element[4] + ',' + element[5];
                                nova = element[0] + ',' + element[1] + ',' + element[2] + ',' + element[3] + ',' + element[4] + ',' + parametri.get('statusPrisustva');
                            }
                        });

                        let searchString = stara;
                        //match everything from start to end of the string
                        let re = new RegExp('^.*' + searchString + '.*$', 'gm');
                        let formatted = data.toString().replace(re, nova);

                        fs.writeFile('prisustva.csv', formatted, 'utf8', function (err) {
                            if (err) throw err;
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            let object = { status: 'Azurirano prisustvo!' };
                            niz.push(object);
                            res.end(JSON.stringify(niz));
                        });
                    }


                    if (regex2.test(status_prisustva)) {
                        statusPrisustvaIspravan = 1;
                    }
                    if (statusPrisustvaIspravan == 0) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Status prisustva nije ispravan!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));
                        //console.log(objekat);
                    }

                    else if (tipIspravan == 0 && brojCasaIspravan == 1 && sedmicaIspravna == 1 && sedmicaCas == 1 && statusPrisustvaIspravan == 1) {

                        if (predmetPostoji == 1 && studentPostoji == 1) {

                            fs.appendFile('prisustva.csv', novaLinija, function (err) {

                                if (err) throw err;
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                let objekat = { status: 'Kreirano prisustvo!' };
                                niz.push(objekat);
                                res.end(JSON.stringify(niz));
                                //console.log(objekat);

                            });

                        }
                    }
                });

            });

        }

    }


    if (req.method == 'GET') {

        //console.log(req.url)

        req.url = req.url.replace('?', '?&')
        const search_params = new URLSearchParams(req.url);

        let kodPredmetaValue = search_params.get('kodPredmeta');
        let indexValue = search_params.get('indexStudenta');
        let sedmicaValue = search_params.get('sedmica');


        let prisustvoPostoji = 0;
        let arr = [];
        let obj = {
            kodPredmeta: kodPredmetaValue,
            indexStudenta: indexValue,
            sedmicaValue: sedmicaValue
        }
        arr.push(obj);
        fs.readFile('prisustva.csv', 'utf-8', function (err, data) {

            let niz = [];
            let tekst = data.toString();
            let redovi = tekst.split('\n');
            let brojacpr = 0;
            let brojacod = 0;
            let brojacnU = 0;
            var pr = 'prisutan';
            var od = 'odsutan';
            var nU = 'nijeUneseno';
            
            for (let i = 0; i < redovi.length; i++) {
                let kolone = redovi[i].split(',');

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
                let objekat = { status: 'Prisustvo ne postoji!' };
                niz.push(objekat);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(niz));
            }
            if (prisustvoPostoji == 1) {
                let objekat = { status: 'prisustvoZaSedmicu: ' + sedmicaValue + ', prisutan: ' + brojacpr + ', odsutan: ' + brojacod + ', nijeUneseno: ' + brojacnU };
                niz.push(objekat);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(niz));
            }

        });


    }
});



server.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;