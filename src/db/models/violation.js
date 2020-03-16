"use strict";
module.exports = (sequelize, DataTypes) => {
  const violation = sequelize.define(
    "violation",
    {
      student_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      type: {
        type: DataTypes.ENUM,
        values: ["easy", "medium", "hard"]
      },
      detail: DataTypes.STRING,
      punishment: DataTypes.STRING,
      period: DataTypes.STRING
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
