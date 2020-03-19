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
    // classroom.hasOne(models.teacher);
    classroom.belongsTo(models.teacher);

    classroom.hasMany(models.student, {
      foreignKey: "class_id"
    });
  };

  return classroom;
};
