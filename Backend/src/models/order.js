'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Order.init({
    ten_nguoi_nhan: DataTypes.TEXT,
    dia_chi: DataTypes.INTEGER,
    so_dien_thoai: DataTypes.TEXT,
    ghi_chu: DataTypes.TEXT,
    tinh_trang: DataTypes.INTEGER,
    tong_tien: DataTypes.DECIMAL(15,2),
    id_customer: DataTypes.INTEGER,
    id_partner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};