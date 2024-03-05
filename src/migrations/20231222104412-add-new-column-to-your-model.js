"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "newColumnName", {
      type: Sequelize.STRING, // Change the data type as needed
      allowNull: true, // Modify as needed
      defaultValue: null, // Set a default value if needed
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "newColumnName");
  },
};
