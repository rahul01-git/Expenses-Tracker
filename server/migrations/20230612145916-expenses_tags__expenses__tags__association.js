'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint("expenses_tags", {
      fields: ['expenses_id'],
      type: 'foreign key',
      name: 'expenses_tags__expenses_association',
      references: {
        table: 'Expenses',
        field: 'id'
      }
    }),
      queryInterface.addConstraint("expenses_tags", {
        fields: ['tag_id'],
        type: 'foreign key',
        name: 'expenses_tags__tags_association',
        references: {
          table: 'tags',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
