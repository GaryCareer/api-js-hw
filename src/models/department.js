'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
  };
  return Department;
};