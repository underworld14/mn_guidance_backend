require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "mn_guidance",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    username: "izzadb",
    password: "helloworld14",
    database: "mn_guidance",
    host: "192.168.1.15",
    dialect: "mysql",
    operatorsAliases: false,
  },
};
