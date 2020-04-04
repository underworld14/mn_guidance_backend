"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      "users",
      [
        {
          teacher_id: 6,
          email: "ilhamhadi@gmail.com",
          password: "$2a$10$0VOtlQmeyvyYoAgqxaAqFOMQNGiZA8hRbZ6up.4TPf18YGoiAKDx2",
          role: "supervisor",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          teacher_id: 1,
          email: "firman@gmail.com",
          password: "$2a$10$ODPMKQV1UPY7JvzaqfCQI.2W0t.fhwLSfNzFSqG4p6oubHboscpQO",
          role: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          teacher_id: 5,
          email: "naufaladam@gmail.com",
          password: "$2a$10$ODPMKQV1UPY7JvzaqfCQI.2W0t.fhwLSfNzFSqG4p6oubHboscpQO",
          role: "admin",
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
    return queryInterface.bulkDelete("announcements", null, {});
  },
};
