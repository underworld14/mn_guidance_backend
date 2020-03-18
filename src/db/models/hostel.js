"use strict";
module.exports = (sequelize, DataTypes) => {
  const hostel = sequelize.define(
    "hostel",
    {
      teacher_id: DataTypes.INTEGER,
      name: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  hostel.associate = function(models) {
    // associations can be defined here
    hostel.hasMany(models.room);
    hostel.belongsTo(models.teacher);
  };
  return hostel;
};
