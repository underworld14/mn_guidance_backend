"use strict";
module.exports = (sequelize, DataTypes) => {
  const announcement = sequelize.define(
    "announcement",
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      underscored: true,
    }
  );
  announcement.associate = function (models) {
    // associations can be defined here
    announcement.belongsTo(models.user);
  };
  return announcement;
};
