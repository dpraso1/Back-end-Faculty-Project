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

                novaLinija += parametri.get('ime') + ',' +
                    parametri.get('prezime') + ',' +
                    parametri.get('index') + '\n';
            
                let studentPostoji = 0;
                let fileBody = '';

                fs.readFile('studenti.csv', function (err, data) {
                    if (err) throw err;

                    fileBody = data.toString();
                    if (fileBody.includes(brojIndexa))
                        studentPostoji = 1;
                    
                    if (studentPostoji == 1) {

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Student sa indexom {' + brojIndexa + '} vec postoji!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));

                    } else if (studentPostoji == 0) {
                       
                        fs.appendFile('studenti.csv', novaLinija, function (err) {
                            if (err) throw err;
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            let objekat = { status: 'Kreiran student!' };
                            niz.push(objekat);
                            res.end(JSON.stringify(niz));
                        });
                    }
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

                novaLinija += parametri.get('naziv') + ',' +
                    parametri.get('kod') + '\n';

                let predmetPostoji = 0;
                let kodIspravan = 0;
                let fileBody = '';


                fs.readFile('predmeti.csv', function (err, data) {
                    if (err) throw err;

                    fileBody = data.toString();
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
                    }
                    if (fileBody.includes(parametri.get('kod')))
                        predmetPostoji = 1;

                    if (predmetPostoji == 1) {

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Predmet sa kodom {' + parametri.get('kod') + '} vec postoji!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));

                    } else if (predmetPostoji == 0 && kodIspravan == 0) {

                        fs.appendFile('predmeti.csv', novaLinija, function (err) {
                            if (err) throw err;
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            let objekat = { status: 'Kreiran predmet!' };
                            niz.push(objekat);
                            
                            res.end(JSON.stringify(niz));
                        });
                    }
                });
            });
        }
    }
});



server.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;