"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {

        return queryInterface.createTable("student", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            ime: Sequelize.STRING,

            prezime: Sequelize.STRING,
            index: {
                type: Sequelize.STRING,
                unique: true
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable("student");
    }
};
