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
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    so_dien_thoai: DataTypes.STRING,
    ho_dem: DataTypes.STRING,
    ten: DataTypes.STRING,
    ngay_sinh: DataTypes.DATE,
    verify: DataTypes.INTEGER,
    change_pass: DataTypes.STRING,
    confirm_pass: DataTypes.STRING,
    ly_do_block: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};