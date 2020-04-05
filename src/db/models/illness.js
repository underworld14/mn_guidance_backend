"use strict";
module.exports = (sequelize, DataTypes) => {
  const illness = sequelize.define(
    "illness",
    {
      student_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      description: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  illness.associate = function (models) {
    // associations can be defined here
    illness.belongsTo(models.student);
    illness.belongsTo(models.user);
  };
  return illness;
};
