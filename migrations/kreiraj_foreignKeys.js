"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint("cas", {
            fields: ["predmetId"],
            type: "foreign key",
            name: "cas_ibfk_1",
            references: {
                table: "predmet",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        });
        await queryInterface.addConstraint("prisustvo", {
            fields: ["studentId"],
            type: "foreign key",
            name: "prisustvo_ibfk_1",
            references: {
                table: "student",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        });
        await queryInterface.addConstraint("prisustvo", {
            fields: ["casId"],
            type: "foreign key",
            name: "prisustvo_ibfk_2",
            references: {
                table: "cas",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint("cas", "cas_ibfk_1");
        await queryInterface.removeConstraint("prisustvo", "prisustvo_ibfk_1");
        await queryInterface.removeConstraint("prisustvo", "prisustvo_ibfk_2");
    }
};