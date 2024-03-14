'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Customer.init({
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: DataTypes.TEXT,
    so_dien_thoai: DataTypes.TEXT,
    ho_dem: DataTypes.TEXT,
    ten: DataTypes.TEXT,
    ngay_sinh: DataTypes.DATE,
    verify: DataTypes.INTEGER,
    change_pass: DataTypes.TEXT,
    confirm_pass: DataTypes.TEXT,
    ly_do_block: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};