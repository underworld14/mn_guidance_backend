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
    username: "kxsehspftkzeqq",
    password: "hf99d580e4a6a6b072cf0b7f6bbed8fc7b1fd1d9282554f9612297e11755cf2f7",
    database: "mdfuu199ko2agdi",
    host: "ec2-23-20-129-146.compute-1.amazonaws.com",
    dialect: "mysql",
  },
};
