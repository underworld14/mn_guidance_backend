"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "violations",
      [
        {
          student_id: 9,
          user_id: 1,
          date: "2020-04-02",
          type: "medium",
          detail: "Merokok di kamar mandi",
          punishment: "Botak",
          period: "2021",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 6,
          user_id: 1,
          date: "2020-04-02",
          type: "easy",
          detail: "Terlambat izin",
          punishment: "Membersihkan kamar mandi",
          period: "2021",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 89,
          user_id: 3,
          date: "2020-04-02",
          type: "hard",
          detail: "Membohongi guru",
          punishment: "Botak",
          period: "2021",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 120,
          user_id: 3,
          date: "2020-04-02",
          type: "medium",
          detail: "Keluar tanpa izin",
          punishment: "Botak",
          period: "2021",
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
    return queryInterface.bulkDelete("violations", null, {});
  },
};
