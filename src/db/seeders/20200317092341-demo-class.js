"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "classrooms",
      [
        {
          teacher_id: 1,
          name: "1A",
          place: "New Building",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          teacher_id: 2,
          name: "1B",
          place: "New Building",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          teacher_id: 3,
          name: "2A",
          place: "New Building",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          teacher_id: 4,
          name: "2B",
          place: "New Building",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          teacher_id: 5,
          name: "3A",
          place: "New Building",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          teacher_id: 6,
          name: "3B",
          place: "New Building",
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
