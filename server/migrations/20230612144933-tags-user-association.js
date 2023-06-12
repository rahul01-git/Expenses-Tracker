'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint("tags", {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'users_tags_association',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint("tags", {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'users_tags_association',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
  }
};
