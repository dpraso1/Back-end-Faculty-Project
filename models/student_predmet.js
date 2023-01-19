"use strict";

module.exports = function (sequelize, Sequelize) {
    const studentPredmet = sequelize.define("student_predmet", {
        studentId: {
            type: Sequelize.INTEGER,
            references: {
                model: "student",
                key: "id",
                as: "studentId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        },
        predmetId: {
            type: Sequelize.INTEGER,
            references: {
                model: "predmet",
                key: "id",
                as: "predmetId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return studentPredmet;
};
