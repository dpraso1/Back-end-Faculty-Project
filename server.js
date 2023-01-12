var bodyParser = require("body-parser");
var express = require("express");
var server = express();
server.use(express.static("../public/"));

const kontroler = require("./controllers/kontroler.js");
const sequelize = require("./models/konekcija.js");
const { Sequelize } = require("sequelize");

const Student = require("./models/studenti.js")(sequelize, Sequelize);
const Predmet = require("./models/predmeti.js")(sequelize, Sequelize);
const Cas = require("./models/casovi.js")(sequelize, Sequelize);
const Prisustvo = require("./models/prisustvo.js")(sequelize, Sequelize);
Student.sync();
Predmet.sync();
Cas.sync();
Prisustvo.sync();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//student
server.post("/student", kontroler.kreirajStudenta);

//predmet
server.post("/predmet", kontroler.kreirajPredmet);


const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;