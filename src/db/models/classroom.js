"use strict";
module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define(
    "classroom",
    {
      teacher_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      place: DataTypes.STRING
    },
    {
      underscored: true
    }
  );

  classroom.associate = function(models) {
    // associations can be defined here
  };

  return classroom;
};