"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "organizations",
      [
        {
          name: "test-1",
          isActive: "active",
          isDefault: false,
          isDelete: true,
          isActive: true,
          isDelete: false,
          createdBy: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("organizations", null, {});
  },
};
