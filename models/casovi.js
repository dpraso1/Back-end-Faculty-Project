"use strict";


module.exports = function (sequelize, Sequelize) {
    const Cas = sequelize.define("cas", {
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
    return Cas;
};
