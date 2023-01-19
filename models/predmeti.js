"use strict";

module.exports = function (sequelize, Sequelize) {
    const Predmet = sequelize.define("predmet", {
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
