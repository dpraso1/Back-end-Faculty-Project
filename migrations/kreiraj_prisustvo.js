"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("prisustvo", {
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
                onDelete: "cascade",
                onUpdate: "cascade"
            },
            casId: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                allowNull: false,
                onDelete: "cascade",
                onUpdate: "cascade"
            },
           status: Sequelize.STRING
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("prisustvo");
    }
};
