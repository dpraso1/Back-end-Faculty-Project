"use strict";

const { Sequelize } = require("sequelize");
const { sequelize, Student, Predmet, Cas, Prisustvo, studentPredmet } = require("../models/konekcija.js");

console.log(Student.associations);
console.log(Predmet.associations);
console.log(Cas.associations);
console.log(Prisustvo.associations);

//http://localhost:3000/student
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

//http://localhost:3000/predmet
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

//http://localhost:3000/prisustvo
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

//http://localhost:3000/prisustvo?kodPredmeta=kodPredmetaValue&indexStudenta=indexStudentaValue&sedmica=sedmicaValue
exports.dajPrisustvo = function (req, res) {

    const { kodPredmeta, indexStudenta, sedmica } = req.query;

    Predmet.findOne({ where: { kod: kodPredmeta } })
        .then(predmet => {
            if (!predmet) {
                return res.status(400).json({ status: "Prisustvo ne postoji!" });
            }
            Cas.findOne({ where: { sedmica: sedmica } })
                .then(cas => {
                    if (!cas) {
                        return res.status(400).json({ status: "Prisustvo ne postoji!" });
                    }

                    Student.findOne({ where: { index: indexStudenta } })
                        .then(student => {
                            if (!student) {
                                return res.status(400).json({ status: "Prisustvo ne postoji!" });
                            }

                            Prisustvo.findAll({

                                include: [
                                    {
                                        model: Cas, where: { sedmica: sedmica },
                                        include: [
                                            {
                                                model: Predmet, where: { kod: kodPredmeta }
                                            }]
                                    },
                                    { model: Student, where: { index: indexStudenta } }
                                ]

                            })
                                .then(prisustvo => {
                                    if (!prisustvo) {
                                        return res.status(400).json({ status: "Prisustvo ne postoji!" });
                                    }
                                    else {

                                        let prisutan = 0;
                                        let odsutan = 0;
                                        let nijeUneseno = 0;
                                        const statusi = prisustvo.map(p => p.status);

                                        statusi.forEach(status => {
                                            if (status === "prisutan") {
                                                prisutan++;
                                            } else if (status === "odsutan") {
                                                odsutan++;
                                            } else if (status === "nijeUneseno") {
                                                nijeUneseno++;
                                            }
                                        });
                                        if (prisutan == 0 && odsutan == 0 && nijeUneseno == 0) {
                                            return res.status(400).json({ status: "Prisustvo ne postoji!" });
                                        } else {
                                            return res.status(200).json({
                                                status: "prisustvoZaSedmicu: " + sedmica + ", prisutan: " + prisutan + ", odsutan: " + odsutan + ", nijeUneseno: " + nijeUneseno
                                            });
                                        }
                                    }
                                }).catch(err => {
                                    res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
                                })
                        }).catch(err => {
                            res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
                        })
                }).catch(err => {
                    res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
                })
        }).catch(err => {
            res.status(400).json({ status: "Desila se greška prilikom obrade zahtjeva, molimo provjerite ispravnost unesenih podataka!" });
        })

};
