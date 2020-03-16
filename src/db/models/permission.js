"use strict";
module.exports = (sequelize, DataTypes) => {
  const permission = sequelize.define(
    "permission",
    {
      student_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      time_begin: DataTypes.DATE,
      time_end: DataTypes.DATE,
      month: DataTypes.INTEGER,
      reason: DataTypes.STRING,
      destination: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  permission.associate = function(models) {
    // associations can be defined here
  };
  return permission;
};
