'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Employees',
      'DepartmentId',{
        type:Sequelize.INTEGER,
        reference:{
          model: 'Departments',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Employees',
      'DepartmentId'
    )
  }
};
