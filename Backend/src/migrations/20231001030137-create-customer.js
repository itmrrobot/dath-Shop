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
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      so_dien_thoai: {
        type: Sequelize.STRING
      },
      ho_dem: {
        type: Sequelize.STRING
      },
      ten: {
        type: Sequelize.STRING
      },
      ngay_sinh: {
        type: Sequelize.DATE
      },
      verify: {
        type: Sequelize.INTEGER
      },
      change_pass: {
        type: Sequelize.STRING
      },
      confirm_pass: {
        type: Sequelize.STRING
      },
      ly_do_block: {
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
