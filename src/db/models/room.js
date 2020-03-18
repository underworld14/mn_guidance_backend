"use strict";
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    "room",
    {
      hostel_id: DataTypes.INTEGER,
      name: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  room.associate = function(models) {
    // associations can be defined here
    room.belongsTo(models.hostel);
  };
  return room;
};
