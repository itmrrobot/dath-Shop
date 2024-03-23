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
        type: Sequelize.TEXT
      },
      birth: {
        type: Sequelize.DATE
      },
      role: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      ma_so_thue: {
        type: Sequelize.TEXT
      },
      ten_cong_ty: {
        type: Sequelize.TEXT
      },
      anh_minh_chung: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER
      },
      total_da_ban: {
        type: Sequelize.DECIMAL(15,2)
      },
      tong_don_hang_da_ban: {
        type: Sequelize.INTEGER
      },
      tong_don_hang_doi_tra: {
        type: Sequelize.INTEGER
      },
      change_pass: {
        type: Sequelize.TEXT
      },
      confirm_pass: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
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
