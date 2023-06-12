'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Categories", {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'users_category_association',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint("Categories", {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'users_category_association',
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  }
};
