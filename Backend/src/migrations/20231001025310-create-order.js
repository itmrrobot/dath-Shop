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
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_nguoi_nhan: {
        type: Sequelize.STRING
      },
      dia_chi: {
        type: Sequelize.STRING
      },
      so_dien_thoai: {
        type: Sequelize.STRING
      },
      ghi_chu: {
        type: Sequelize.STRING
      },
      tinh_trang: {
        type: Sequelize.INTEGER
      },
      tong_tien: {
        type: Sequelize.INTEGER
      },
      id_customer: {
        type: Sequelize.INTEGER
      },
      id_partner: {
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
    await queryInterface.dropTable('Order');
  }
};
