var bodyParser = require("body-parser");
var express = require("express");
var server = express();
server.use(express.static("../public/"));
const kontroler = require("./controllers/kontroler.js");


server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//http://localhost:3000/student
server.post("/student", kontroler.kreirajStudenta);

//http://localhost:3000/predmet
server.post("/predmet", kontroler.kreirajPredmet);

//http://localhost:3000/prisustvo
server.post("/prisustvo", kontroler.kreirajPrisustvo);

//http://localhost:3000/prisustvo?kodPredmeta=kodPredmetaValue&indexStudenta=indexStudentaValue&sedmica=sedmicaValue
server.get("/prisustvo", kontroler.dajPrisustvo);


const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = server;
