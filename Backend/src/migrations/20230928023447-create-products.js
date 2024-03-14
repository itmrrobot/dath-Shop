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
        type: Sequelize.TEXT
      },
      slug_san_pham: {
        type: Sequelize.TEXT
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
        type: Sequelize.TEXT
      },
      mo_ta_chi_tiet: {
        type: Sequelize.TEXT
      },
      gia_ban: {
        type: Sequelize.INTEGER
      },
      gia_khuyen_mai: {
        type: Sequelize.INTEGER
      },
      CategoryId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Product');
  }
};
