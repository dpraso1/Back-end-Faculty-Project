"use strict";
const sequelize = require("../models/konekcija.js");
const { Sequelize } = require("sequelize");
const db = require("../models/konekcija.js");

const Student = require("../models/studenti.js")(sequelize, Sequelize);
const Predmet = require("../models/predmeti.js")(sequelize, Sequelize);
const Cas = require("../models/casovi.js")(sequelize, Sequelize);
const Prisustvo = require("../models/prisustvo.js")(sequelize, Sequelize);
Student.sync();
Predmet.sync();
Cas.sync();
Prisustvo.sync();

exports.kreirajStudenta = function (req, res) {

    let student = req.body;
    let imeStudenta = student.ime;
    let prezimeStudenta = student.prezime;
    let indexStudenta = student.index;

    Student.findOne({
        where:
        {
            index: indexStudenta
        }
    })
        .then(studentPostoji => {
            if (studentPostoji) {
                res.status(400).json({ status: "Student sa indexom {" + indexStudenta + "} vec postoji!" });
            } else {
                Student.create({
                    ime: imeStudenta,
                    prezime: prezimeStudenta,
                    index: indexStudenta
                })
                    .then(novi_student => {
                        res.status(200).json({ status: "Kreiran student!" });
                    })
                    .catch(err => {
                        res.status(400).json({ status: "Desila se greška prilikom kreiranja studenta, molimo provjerite ispravnost unesenih podataka" });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ status: "Desila se greška prilikom obrade zahtjeva!" });
        });
};

exports.kreirajPredmet = function (req, res) {
    
    let predmet = req.body;
    let nazivPredmeta = predmet.naziv;
    let kodPredmeta = predmet.kod;


    let kodIspravan = 0;
    let regex1 = new RegExp(/^(RI|AE|EE|TK)-(BoE)-([1-3])-([1-2])$/);
    let regex2 = new RegExp(/^(RI|AE|EE|TK)-(MoE|RS)-([1-2])-([1-2])$/);
    if (kodPredmeta < 10 || !(regex1.test(kodPredmeta) || regex2.test(kodPredmeta))) {
        kodIspravan = 1;
    }
    if (kodIspravan) {
        res.status(400).json({ status: "Kod predmeta nije ispravan!" });
        return;
    }

    Predmet.findOne({
        where:
        {
            kod: kodPredmeta
        }
    })
        .then(predmetPostoji => {
            if (predmetPostoji) {
                res.status(400).json({ status: "Predmet sa kodom {" + kodPredmeta + "} vec postoji!" });
            } else {
                Predmet.create({
                    naziv: nazivPredmeta,
                    kod: kodPredmeta
                })
                    .then(novi_predmet => {
                        res.status(200).json({ status: "Kreiran predmet!" });
                    })
                    .catch(err => {
                        res.status(400).json({ status: "Desila se greška prilikom kreiranja predmeta, molimo provjerite ispravnost unesenih podataka" });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ status: "Desila se greška prilikom obrade zahtjeva!" });
        });
};
