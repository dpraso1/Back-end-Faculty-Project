const Sequelize = require("sequelize");
const sequelize = require("./konekcija.js");

module.exports = function (sequelize, DataTypes) {
    const Cas = sequelize.define("Cas", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        redniBroj: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sedmica: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        predmetId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
            references: {
                model: "Predmet",
                key: "id",
                as: "predmetId",
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
});
    return Cas;
};