"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "announcements",
      [
        {
          title: "Ramadhan Sebentar Lagi",
          image: "https://cdn2.tstatic.net/kaltim/foto/bank/images/ramadhan-puasa-isbat-1440.jpg",
          content: "Yuk persiapan ramadhan sebentar lagi banyak banyak ibdadah",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Hati hati dengan virus corona",
          image: "https://cdn2.tstatic.net/kaltim/foto/bank/images/ramadhan-puasa-isbat-1440.jpg",
          content: "Jaga kesehatan dan kebersihan dan jangan lupa cuci tangan",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Mudik tahun ini ditiadakan",
          image: "https://cdn2.tstatic.net/kaltim/foto/bank/images/ramadhan-puasa-isbat-1440.jpg",
          content: "Lebaran di rumah aja",
          user_id: 1,
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
