"use strict";
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "student",
    {
      class_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      nis: DataTypes.INTEGER,
      name: DataTypes.STRING,
      guardian: DataTypes.STRING,
      district: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthplace: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY
    },
    {
      underscored: true
    }
  );
  student.associate = function(models) {
    // associations can be defined here
    student.belongsTo(models.classroom, {
      foreignKey: "class_id"
    });

    student.belongsTo(models.room);
  };
  return student;
};
