const Sequelize = require("sequelize");
const sequelize = require("./konekcija.js");

module.exports = function (sequelize, DataTypes) {
    const Prisustvo = sequelize.define("Prisustvo", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        studentId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
            references: {
                model: "Student",
                key: "id",
                as: "studentId",
            }
        },
        casId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
            references: {
                model: "Cas",
                key: "id",
                as: "casId",
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
});
    return Prisustvo;
};