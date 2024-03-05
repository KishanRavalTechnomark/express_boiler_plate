"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //root user

    let password = "P@ssw0rd";
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          organizationId: null,
          firstName: "admin",
          middleName: "hrms",
          lastName: "admin",
          email: "admin@hrms.com",
          phoneNumber: "8888888888",
          gender: null,
          location: null,
          employeeCode: "EMP001",
          department: null,
          process: null,
          role: null,
          designation: null,
          isAprrover: "Yes",
          rightToRequistion: "Yes",
          requistionInAMonth: "0",
          startDate: new Date(),
          endDate: new Date(),
          password: hash,
          emailConfirmed: true,
          rememberMe: false,
          ssoLogin: false,
          isDepartmentHead: true,
          isReportingManager: false,
          isActive: true,
          isDelete: false,
          createdBy: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    // await queryInterface.bulkInsert(
    //   "users",
    //   [
    //     {
    //       organizationId: null,
    //       firstName: "admin",
    //       middleName: "hrms",
    //       lastName: "admin",
    //       email: "vimal.patel@technomark.io",
    //       phoneNumber: "8888888888",
    //       gender: null,
    //       location: null,
    //       employeeCode: "EMP001",
    //       department: null,
    //       process: null,
    //       role: null,
    //       designation: null,
    //       isAprrover: "Yes",
    //       rightToRequistion: "Yes",
    //       requistionInAMonth: "0",
    //       startDate: new Date(),
    //       endDate: new Date(),
    //       password: hash,
    //       emailConfirmed: true,
    //       rememberMe: false,
    //       ssoLogin: false,
    //       isDepartmentHead: true,
    //       isReportingManager: false,
    //       isActive: true,
    //       isDelete: false,
    //       createdBy: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
