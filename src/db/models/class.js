'use strict';
module.exports = (sequelize, DataTypes) => {
  const class = sequelize.define('class', {
    teacher_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    place: DataTypes.STRING
  }, {
    underscored: true,
  });
  class.associate = function(models) {
    // associations can be defined here
  };
  return class;
};