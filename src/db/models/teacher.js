"use strict";
module.exports = (sequelize, DataTypes) => {
  const teacher = sequelize.define(
    "teacher",
    {
      nip: DataTypes.INTEGER,
      name: DataTypes.STRING,
      room: DataTypes.STRING,
      phone: DataTypes.STRING,
      position: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  teacher.associate = function(models) {
    // associations can be defined here
    teacher.hasOne(models.classroom);
  };
  return teacher;
};
