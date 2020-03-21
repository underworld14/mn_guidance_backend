"use strict";
module.exports = (sequelize, DataTypes) => {
  const wanted = sequelize.define(
    "wanted",
    {
      student_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      description: DataTypes.STRING,
      level: DataTypes.STRING,
      confirmed: DataTypes.BOOLEAN
    },
    {
      underscored: true
    }
  );
  wanted.associate = function(models) {
    // associations can be defined here
  };
  return wanted;
};
