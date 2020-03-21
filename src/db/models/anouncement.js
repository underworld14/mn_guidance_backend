'use strict';
module.exports = (sequelize, DataTypes) => {
  const anouncement = sequelize.define('anouncement', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  anouncement.associate = function(models) {
    // associations can be defined here
  };
  return anouncement;
};