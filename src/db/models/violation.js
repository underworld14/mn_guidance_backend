"use strict";
module.exports = (sequelize, DataTypes) => {
  const violation = sequelize.define(
    "violation",
    {
      student_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      datetime: DataTypes.DATEONLY,
      violation_detail: DataTypes.STRING,
      type: DataTypes.STRING,
      punishment: DataTypes.STRING,
      on_period: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  violation.associate = function(models) {
    // associations can be defined here
  };
  return violation;
};
