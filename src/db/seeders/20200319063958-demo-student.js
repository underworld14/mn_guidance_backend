"use strict";

const read = require("../source/student");

let data = read.map((val) => {
  return {
    ...val,
    birthdate: val.birthdate ? new Date(val.birthdate) : null,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert("students", data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("students", null, {});
  },
};
