let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let server = require('./server.js');
let should = chai.should();

describe('POST /student testovi: \n', function () {

    it('POST /student - Student je uspješno kreiran', function () {
        let student = {
            ime: 'Dajana',
            prezime: 'Prašo',
            index: '141-ST'
        }
        chai.request(server)
            .post('/student')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(student)
            .end(function (err, res) {
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.should.have.status(200);
                should.not.exist(err);
            });
    });

    it('POST /student - Student je uspješno kreiran', function () {
        let student = {
            ime: 'Neko',
            prezime: 'Nekić',
            index: '27183'
        }
        chai.request(server)
            .post('/student')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(student)
            .end(function (err, res) {
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.should.have.status(200);
                should.not.exist(err);
            });
    });

    it('POST /student - Index studenta već postoji u datoteci studenti.csv', function () {
        let student = {
            ime: 'Meho',
            prezime: 'Mehić',
            index: '141-ST'
        }
        chai.request(server)
            .post('/student')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(student)
            .end(function (err, res) {
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.should.have.status(200);
                should.not.exist(err);
            });
    });

    
});

    describe('POST /predmet testovi: \n', function () {
        
        it('POST /predmet - Predmet je uspješno kreiran', function () {
            let predmet = {
                naziv: 'P1',
                kod: 'RI-BoE-1-1'
            }
            chai.request(server)
                .post('/predmet')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(predmet)
                .end(function (err, res) {
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.should.have.status(200);
                    should.not.exist(err);
                });
        });

        it('POST /predmet - Predmet je uspješno kreiran', function () {
            let predmet = {
                naziv: 'P2',
                kod: 'AE-RS-1-2'
            }
            chai.request(server)
                .post('/predmet')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(predmet)
                .end(function (err, res) {
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.should.have.status(200);
                    should.not.exist(err);
                });
        });

        it('POST /predmet - Predmet nema ispravan kod', function () {
            let predmet = {
                naziv: 'P3',
                kod: 'TK-MoE-3-1'
            }
            chai.request(server)
                .post('/predmet')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(predmet)
                .end(function (err, res) {
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.should.have.status(200);
                    should.not.exist(err);
                });
        });
        
        it('POST /predmet - Predmet nema ispravan kod', function () {
            let predmet = {
                naziv: 'P8',
                kod: 'RI-RS-3-1'
            }
            chai.request(server)
                .post('/predmet')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(predmet)
                .end(function (err, res) {
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.should.have.status(200);
                    should.not.exist(err);
                });
        });

        it('POST /predmet - Predmet sa kodom već postoji u datoteci predmeti.csv', function () {
            let predmet = {
                naziv: 'P4',
                kod: 'RI-BoE-1-1'
            }
            chai.request(server)
                .post('/predmet')
                .set('content-type', 'application/json')
                .send(predmet)
                .end(function (err, res) {
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.should.have.status(200);
                    should.not.exist(err);
                })
        });
    
});
