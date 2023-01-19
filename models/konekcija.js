const Sequelize = require("sequelize");

const sequelize = new Sequelize("spirala4", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});


sequelize.authenticate().then(function () {
    console.log("Konekcija uspješno uspostavljena!");
}).catch(err => {
    console.log("error:" + err);
});

sequelize.sync({ alter: true, force: false }).then(function () {
    console.log("Gotovo kreiranje tabela!");
}).catch(err => {
    console.log("error:" + err)
});


const Student = require("../models/studenti.js")(sequelize, Sequelize);
const Predmet = require("../models/predmeti.js")(sequelize, Sequelize);
const Cas = require("../models/casovi.js")(sequelize, Sequelize);
const Prisustvo = require("../models/prisustvo.js")(sequelize, Sequelize);
const studentPredmet = require("../models/student_predmet.js")(sequelize, Sequelize);
Student.sync();
Predmet.sync();
Prisustvo.sync();
Cas.sync();
studentPredmet.sync();

//Predmet ---< Cas
Predmet.hasMany(Cas, {
    foreignKey: "predmetId",
    sourceKey: "id"
});
Cas.belongsTo(Predmet, {
    foreignKey: "predmetId",
    sourceKey: "id"
});

//Cas ---< Prisustvo
Cas.hasMany(Prisustvo, {
    foreignKey: "casId",
    sourceKey: "id"
});
Prisustvo.belongsTo(Cas, {
    foreignKey: "casId",
    sourceKey: "id"
});


//Student ---< Prisustvo
Student.hasMany(Prisustvo, {
    foreignKey: "studentId",
    sourceKey: "id"
});
Prisustvo.belongsTo(Student, {
    foreignKey: "studentId",
    sourceKey: "id"
});


//međutabela student_predmet (many to many)
Student.belongsToMany(Predmet, {
    through: "student_predmet",
    as: "predmet",
    foreignKey: "studentId",
    otherKey: "predmetId"
});

Predmet.belongsToMany(Student, {
    through: "student_predmet",
    as: "student",
    foreignKey: "predmetId",
    otherKey: "studentId"
});



console.log(Student.associations);
console.log(Predmet.associations);
console.log(Cas.associations);
console.log(Prisustvo.associations.ca.target);

module.exports = { sequelize, Student, Predmet, Cas, Prisustvo, studentPredmet }
