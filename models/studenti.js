const Sequelize = require("sequelize");
const sequelize = require("./konekcija.js");

module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define("Student", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prezime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        index: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false
});
    return Student;
};