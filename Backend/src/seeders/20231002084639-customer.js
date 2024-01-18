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
      so_dien_thoai: "4434993994",
      ho_dem: "Nguyễn",
      ten: "Đức",
      ngay_sinh: null,
      verify: null,
      change_pass: null,
      confirm_pass: null,
      ly_do_block: null
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
