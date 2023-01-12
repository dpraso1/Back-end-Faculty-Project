const Sequelize = require("sequelize");

const sequelize = new Sequelize("spirala4", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch(err => {
    console.log("error:" + err);
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Student = require("./studenti.js")(sequelize, Sequelize);
const Predmet = require("./predmeti.js")(sequelize, Sequelize);
const Cas = require("./casovi.js")(sequelize, Sequelize);
const Prisustvo = require("./prisustvo.js")(sequelize, Sequelize);
Student.sync();
Predmet.sync();
Cas.sync();
Prisustvo.sync();

//Predmet ---< Cas
Predmet.hasMany(Cas, {
    foreignKey: "predmetId",
    sourceKey: "id"
});
Cas.belongsTo(Predmet, {
    foreignKey: "predmetId",
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

//Cas ---< Prisustvo
Cas.hasMany(Prisustvo, {
    foreignKey: "casId",
    sourceKey: "id"
});
Prisustvo.belongsTo(Cas, {
    foreignKey: "casId",
    sourceKey: "id"
});

//međutabela student_predmet (many to many)
Student.belongsToMany(Predmet, {
    through: "student_predmet",
    as: "Predmet",
    foreignKey: "studentId",
    otherKey: "predmetId"
});

Predmet.belongsToMany(Student, {
    through: "student_predmet",
    as: "Student",
    foreignKey: "predmetId",
    otherKey: "studentId"
});


module.exports = sequelize;