"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
      await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      "Category",
      [
        {
          category_name: "Áo vest",
          category_slug: "",
          img: "aovest1.jpg",
          status: 1,
        },
        {
          category_name: "Áo hoodie",
          category_slug: "",
          img: "aohoodie1.jpg",
          status: 1,
        },
        {
          category_name: "Áo gia đình",
          category_slug: "",
          img: "aogiadinh1.jpg",
          status: 1,
        },
        {
          category_name: "Áo thun",
          category_slug: "",
          img: "aothun1.jpg",
          status: 1,
        },
        {
          category_name: "Set đồ gym",
          category_slug: "",
          img: "gym1.jpg",
          status: 1,
        },
        {
          category_name: "Đồng hồ rolex",
          category_slug: "",
          img: "rolex.jpg",
          status: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
