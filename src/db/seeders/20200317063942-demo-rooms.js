"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "rooms",
      [
        {
          hostel_id: 1,
          name: "101",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 1,
          name: "102",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 2,
          name: "101",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 2,
          name: "102",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 3,
          name: "101",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 3,
          name: "102",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 4,
          name: "101",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 4,
          name: "102",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 5,
          name: "101",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          hostel_id: 5,
          name: "102",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("rooms", null, {});
  },
};
