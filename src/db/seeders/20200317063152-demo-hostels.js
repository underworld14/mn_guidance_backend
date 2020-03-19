"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "hostels",
      [
        {
          id: 1,
          teacher_id: 1,
          name: "Indonesia",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          teacher_id: 2,
          name: "Saudi",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          teacher_id: 3,
          name: "Makkah",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          teacher_id: 4,
          name: "Syiria",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 5,
          teacher_id: 5,
          name: "Sudan",
          created_at: new Date(),
          updated_at: new Date()
        }
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
  }
};
