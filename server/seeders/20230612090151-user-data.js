'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
      
    */
    await queryInterface.bulkInsert('Users', [{
      first_name: 'rahul',
      last_name: 'neupane',
      email: 'rahul@gmail.com',
      password: '1234',
      createdAt: new Date('2023-06-12'),
      updatedAt: new Date('2023-06-12'),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
