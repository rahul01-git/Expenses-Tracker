'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Expenses", {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'users_expenses_association',
      references: {
        table: 'Users',
        field: 'id'
      }
    }),
      queryInterface.addConstraint("Expenses", {
        fields: ['category_id'],
        type: 'foreign key',
        name: 'category_expenses_association',
        references: {
          table: 'Categories',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('Expenses', 'users_expenses_association'),
    queryInterface.removeConstraint('Expenses', 'category_expenses_association')
  }
};
