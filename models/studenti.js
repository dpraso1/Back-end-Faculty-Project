"use strict";

module.exports = function (sequelize, Sequelize)  {
    const Student = sequelize.define("student", {
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
