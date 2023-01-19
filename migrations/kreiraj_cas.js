"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        
        return queryInterface.createTable("cas", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            redniBroj: Sequelize.STRING,
            tip: Sequelize.STRING,
            sedmica: Sequelize.STRING,
            predmetId: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                allowNull: false,
                onDelete: "cascade",
                onUpdate: "cascade"
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("cas");
    }
};
