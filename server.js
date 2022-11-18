let http = require('http');
let url = require('url');
let fs = require('fs');
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
                
                console.log(novaLinija)

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
                let novaLinija = '';

                novaLinija += parametri.get('naziv') + ',' +
                    parametri.get('kod') + '\n';

                console.log(novaLinija)

                let predmetPostoji = 0;
                let fileBody = '';


                fs.readFile('predmeti.csv', function (err, data) {
                    if (err) throw err;

                    fileBody = data.toString();
                    if (fileBody.includes(parametri.get('kod')))
                        predmetPostoji = 1;

                    if (predmetPostoji == 1) {

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        let objekat = { status: 'Predmet sa kodom {' + parametri.get('kod') + '} vec postoji!' };
                        niz.push(objekat);
                        res.end(JSON.stringify(niz));

                    } else if (predmetPostoji == 0) {

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