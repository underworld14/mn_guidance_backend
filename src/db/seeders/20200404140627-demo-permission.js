"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "permissions",
      [
        {
          student_id: 4,
          user_id: 2,
          type: "goHome",
          time_begin: "2020-04-04 06:36:30",
          time_end: "2020-04-07 06:36:30",
          month: 4,
          reason: "Ingin pulang Ke rumah",
          destination: "Rumah di tangsel",
          status: "ON PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 6,
          user_id: 1,
          type: "goOutside",
          time_begin: "2020-04-04 06:36:30",
          time_end: "2020-04-06 06:36:30",
          month: 4,
          reason: "Ingin pulang Ke rumah",
          destination: "Rumah di tangsel",
          status: "ON PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 8,
          user_id: 1,
          type: "goTreatment",
          time_begin: "2020-04-04 06:36:30",
          time_end: "2020-04-07 06:36:30",
          month: 4,
          reason: "Ingin pulang Ke rumah",
          destination: "Rumah di tangsel",
          status: "ON PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 80,
          user_id: 3,
          type: "goHome",
          time_begin: "2020-04-04 06:36:30",
          time_end: "2020-04-07 06:36:30",
          month: 4,
          reason: "Ingin pulang Ke rumah",
          destination: "Rumah di tangsel",
          status: "ON PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 80,
          user_id: 3,
          type: "goHome",
          time_begin: "2020-04-04 06:36:30",
          time_end: "2020-04-07 06:36:30",
          month: 4,
          reason: "Ingin pulang Ke rumah",
          destination: "Rumah di tangsel",
          status: "ON PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 65,
          user_id: 2,
          type: "goOutside",
          time_begin: "2020-04-04 06:36:30",
          time_end: "2020-04-07 06:36:30",
          month: 4,
          reason: "Ingin pulang Ke rumah",
          destination: "Rumah di tangsel",
          status: "ON PROGRESS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 43,
          user_id: 1,
          type: "goHome",
          time_begin: "2020-04-04 06:36:30",
          time_end: "2020-04-07 06:36:30",
          month: 4,
          reason: "Ingin pulang Ke rumah",
          destination: "Rumah di tangsel",
          status: "ON PROGRESS",
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
    return queryInterface.bulkDelete("permissions", null, {});
  },
};
