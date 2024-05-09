'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order,{foreignKey:"id_order"});
      OrderDetail.belongsTo(models.Product,{foreignKey:"id_product"});
    }
  }
  OrderDetail.init({
    quantity: DataTypes.INTEGER,
    size: DataTypes.TEXT,
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};