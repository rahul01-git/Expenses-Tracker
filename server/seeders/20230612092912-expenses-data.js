'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Expenses', [{
      title: 'lunch',
      user_id: 23,
      category_id: 8,
      amount:-1700,
      expenses_date: new Date('2023-06-12'),
      createdAt: new Date('2023-06-12'),
      updatedAt: new Date('2023-06-12'),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Expenses', null, {});
  }
};
