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
     await queryInterface.bulkInsert('Customer', [{
      email: "customer1@gmail.com",
      password: "123",
      role: "customer",
      phone: "4434993994",
      last_name: "Nguyễn",
      ten: "Đức",
      birth: null,
      verify: null,
      change_pass: null,
      confirm_pass: null,
      reason_block: null
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
