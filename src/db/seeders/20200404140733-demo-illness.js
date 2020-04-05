"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "illnesses",
      [
        {
          student_id: 9,
          user_id: 1,
          date: "2020-04-02",
          description: "Sakit panas",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 21,
          user_id: 1,
          date: "2020-04-04",
          description: "Demam",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 42,
          user_id: 3,
          date: "2020-04-04",
          description: "Keseleo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 105,
          user_id: 3,
          date: "2020-04-03",
          description: "Keseleo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 89,
          user_id: 1,
          date: "2020-04-03",
          description: "Tipes",
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
    return queryInterface.bulkDelete("People", null, {});
  },
};
