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
    await queryInterface.bulkInsert('Reviews', [{
      id_user: 1,
      id_product: 7,
      rating: 4,
      content: "OK",
      video: "",
      img: "",
      numberLikes: 0,
    },{
      id_user: 11741,
      id_product: 7,
      rating: 3,
      content: "OK",
      video: "",
      img: "",
      numberLikes: 0,
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
