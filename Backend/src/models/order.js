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
      Order.belongsTo(models.User,{foreignKey:"id_user"});
      Order.hasMany(models.OrderDetail,{foreignKey:"id_order"});
      Order.belongsTo(models.Returns,{foreignKey:"id_returns"});
    }
  }
  Order.init({
    name: DataTypes.TEXT,
    address: DataTypes.INTEGER,
    phone: DataTypes.TEXT,
    note: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    total: DataTypes.DECIMAL(15,2),
    payed: DataTypes.INTEGER,
    returnDate: DataTypes.DATE,
    id_user: DataTypes.INTEGER,
    id_returns: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};