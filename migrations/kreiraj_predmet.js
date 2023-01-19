"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
   
        return queryInterface.createTable("predmet", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            naziv: Sequelize.STRING,
            kod: {
                type: Sequelize.STRING,
                unique: true
            }
        });

    },


    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("predmet");
    }
};

