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
                return res.status(400).json({ status: "Student sa indexom {" + indexStudenta + "} vec postoji!" });
            } else {
                Student.create({
                    ime: imeStudenta,
                    prezime: prezimeStudenta,
                    index: indexStudenta
                })
                    .then(novi_student => {
                        return res.status(200).json({ status: "Kreiran student!" });
                    })
                    .catch(err => {
                        return res.status(400).json({ status: "Desila se greška prilikom kreiranja studenta, molimo provjerite ispravnost unesenih podataka!" });
                    });
            }
        })
        .catch(err => {
            return res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
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
        return res.status(400).json({ status: "Kod predmeta nije ispravan!" });
    }

    Predmet.findOne({
        where:
        {
            kod: kodPredmeta
        }
    })
        .then(predmetPostoji => {
            if (predmetPostoji) {
                return res.status(400).json({ status: "Predmet sa kodom {" + kodPredmeta + "} vec postoji!" });
            } else {
                Predmet.create({
                    naziv: nazivPredmeta,
                    kod: kodPredmeta
                })
                    .then(novi_predmet => {
                        return res.status(200).json({ status: "Kreiran predmet!" });
                    })
                    .catch(err => {
                        return res.status(400).json({ status: "Desila se greška prilikom kreiranja predmeta, molimo provjerite ispravnost unesenih podataka!" });
                    });
            }
        })
        .catch(err => {
            return res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
        });
};


exports.kreirajPrisustvo = function (req, res) {


    if (!["prisutan", "odsutan", "nijeUneseno"].includes(req.body.statusPrisustva)) {
        return res.status(400).json({ status: "Status prisustva nije ispravan" });
    }


    Predmet.findOne({ where: { kod: req.body.kodPredmeta } })
        .then(predmet => {
            if (!predmet) {
                return res.status(400).json({ status: "Kod predmeta ne postoji!" });
            }

            Student.findOne({ where: { index: req.body.indexStudenta } })
                .then(student => {
                    if (!student) {
                        return res.status(400).json({ status: "Student ne postoji!" });
                    }
                    Cas.findOne({
                        where: {
                            tip: req.body.tipCasa,
                            redniBroj: req.body.redniBrojCasa,
                            sedmica: req.body.sedmica,
                            predmetId: predmet.id
                        }
                    })
                        .then(casPostoji => {
                            if (!casPostoji) {
                                Cas.create({
                                    tip: req.body.tipCasa,
                                    redniBroj: req.body.redniBrojCasa,
                                    sedmica: req.body.sedmica,
                                    predmetId: predmet.id
                                })
                                    .then((cas) => {
                                        if (cas) {
                                            Prisustvo.create({
                                                status: req.body.statusPrisustva,
                                                casId: cas.id,
                                                studentId: student.id
                                            })
                                                .then((prisustvo) => {
                                                    if (prisustvo) {
                                                        return res.status(200).json({ status: "Kreirano prisustvo!" });
                                                    }
                                                }).catch(err => {
                                                    res.status(400).json({
                                                        status: "Desila se greška prilikom kreiranja prisustva, molimo provjerite ispravnost unesenih podataka!"
                                                    });
                                                });
                                        }
                                    }).catch(err => {
                                        res.status(400).json({
                                            status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!"
                                        });
                                    });

                            } else {
                                Prisustvo.update({ status: req.body.statusPrisustva }, {
                                    
                                    where: {
                                        casId: casPostoji.id,
                                        studentId: student.id
                                    }

                                }).then((red) => {
                                    if (red > 0) return res.status(200).json({ status: "Azurirano prisustvo!" });
                                    else {
                                        Prisustvo.findOne({
                                            where: {
                                                status: req.body.statusPrisustva,
                                                casId: casPostoji.id,
                                                studentId: student.id
                                            }
                                        }).then((prisustvo_postoji) => {
                                            if (!prisustvo_postoji) {
                                                Prisustvo.create({
                                                    status: req.body.statusPrisustva,
                                                    casId: casPostoji.id,
                                                    studentId: student.id
                                                }).then((prisustvo) => {
                                                    if (prisustvo) {
                                                        return res.status(200).json({ status: "Kreirano prisustvo!" });
                                                    }
                                                }).catch(err => {
                                                    res.status(400).json({
                                                        status: "Desila se greška prilikom kreiranja prisustva, molimo provjerite ispravnost unesenih podatakaA!"
                                                    });
                                                });
                                            } else return res.status(400).json({ status: "Desila se greška prilikom prilikom azuriranja prisustva!" });
                                        }).catch(err => {
                                            res.status(400).json({
                                                status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!"
                                            });
                                        });
                                    }
                                }).catch(err => {
                                    res.status(400).json({
                                        status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!"
                                    });
                                });
                            }
                        }).catch(err => {
                            res.status(400).json({
                                status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!"
                            });
                        });

                }).catch(err => {
                    res.status(400).json({
                        status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!"
                    });
                });
        })
        .catch(err => {
            res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
        })

        .catch(err => {
            res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
        })
};
