"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
    return queryInterface.bulkInsert(
      "teachers",
      [
        {
          id: 1,
          nip: 123213,
          name: "Muhammad Firman",
          room: "Saudi",
          phone: "1234567890",
          position: "Bps & Market",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          nip: 32432423,
          name: "Jarir Oktajab",
          room: "BPS",
          phone: "1234567890",
          position: "Art Section",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          nip: 32823984,
          name: "Muhammad Rizki",
          room: "BPS",
          phone: "1234567890",
          position: "BPS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          nip: 321312,
          name: "Muhamad Adriansyah",
          room: "BPS",
          phone: "1234567890",
          position: "BPS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          nip: 123213,
          name: "Naufal Adam Fadillah",
          room: "BPS",
          phone: "1234567890",
          position: "BPS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          nip: 3242365,
          name: "Ilham Hadiwijaya",
          room: "BPS",
          phone: "1234567890",
          position: "BPS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          nip: 183213129,
          name: "M Raihan",
          room: "BPS",
          phone: "1234567890",
          position: "BPS",
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
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("teachers", null, {});
  },
};
