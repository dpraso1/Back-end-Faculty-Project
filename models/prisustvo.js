"use strict";

module.exports = function (sequelize, Sequelize) {
    const Prisustvo = sequelize.define("prisustvo", {
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
                model: "student",
                key: "id",
                as: "studentId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        },
        casId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
            
            references: {
                model: "cas",
                key: "id",
                as: "casId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
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
