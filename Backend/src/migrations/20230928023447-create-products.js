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
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_san_pham: {
        type: Sequelize.STRING
      },
      slug_san_pham: {
        type: Sequelize.STRING
      },
      so_luong_nhap: {
        type: Sequelize.INTEGER
      },
      so_luong_ban: {
        type: Sequelize.INTEGER
      },
      id_partner: {
        type: Sequelize.INTEGER
      },
      hinh_anh: {
        type: Sequelize.JSON
      },
      tinh_trang: {
        type: Sequelize.INTEGER
      },
      mo_ta_ngan: {
        type: Sequelize.STRING
      },
      mo_ta_chi_tiet: {
        type: Sequelize.STRING
      },
      gia_ban: {
        type: Sequelize.INTEGER
      },
      gia_khuyen_mai: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Product');
  }
};
