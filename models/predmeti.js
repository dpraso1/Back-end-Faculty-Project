const Sequelize = require("sequelize");
const sequelize = require("./konekcija.js");

module.exports = function (sequelize, DataTypes) {
    const Predmet = sequelize.define("Predmet", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kod: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Predmet;
};