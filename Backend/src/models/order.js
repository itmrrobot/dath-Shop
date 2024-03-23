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
    name: DataTypes.TEXT,
    address: DataTypes.INTEGER,
    phone: DataTypes.TEXT,
    note: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    total: DataTypes.DECIMAL(15,2),
    id_customer: DataTypes.INTEGER,
    id_partner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};