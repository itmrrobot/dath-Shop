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
          ten_chuyen_muc: "Áo vest",
          slug_chuyen_muc: "",
          hinh_anh: "aovest1.jpg",
          tinh_trang: 1,
        },
        {
          ten_chuyen_muc: "Áo hoodie",
          slug_chuyen_muc: "",
          hinh_anh: "aohoodie1.jpg",
          tinh_trang: 1,
        },
        {
          ten_chuyen_muc: "Áo gia đình",
          slug_chuyen_muc: "",
          hinh_anh: "aogiadinh1.jpg",
          tinh_trang: 1,
        },
        {
          ten_chuyen_muc: "Áo thun",
          slug_chuyen_muc: "",
          hinh_anh: "aothun1.jpg",
          tinh_trang: 1,
        },
        {
          ten_chuyen_muc: "Set đồ gym",
          slug_chuyen_muc: "",
          hinh_anh: "gym1.jpg",
          tinh_trang: 1,
        },
        {
          ten_chuyen_muc: "Đồng hồ rolex",
          slug_chuyen_muc: "",
          hinh_anh: "rolex.jpg",
          tinh_trang: 1,
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
