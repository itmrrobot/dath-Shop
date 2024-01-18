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
    await queryInterface.createTable('Customer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ho_lot: {
        type: Sequelize.STRING
      },
      ngay_sinh: {
        type: Sequelize.DATE
      },
      role: {
        type: Sequelize.STRING
      },
      so_dien_thoai: {
        type: Sequelize.STRING
      },
      dia_chi: {
        type: Sequelize.STRING
      },
      ma_so_thue: {
        type: Sequelize.STRING
      },
      ten_cong_ty: {
        type: Sequelize.STRING
      },
      anh_minh_chung: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      tinh_trang: {
        type: Sequelize.INTEGER
      },
      tong_tien_da_ban: {
        type: Sequelize.DECIMAL(15,2)
      },
      tong_don_hang_da_ban: {
        type: Sequelize.INTEGER
      },
      tong_don_hang_doi_tra: {
        type: Sequelize.INTEGER
      },
      change_pass: {
        type: Sequelize.STRING
      },
      confirm_pass: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Customer');
  }
};
