'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.belongsTo(models.Product,{foreignKey:"id_product"});
    }
  }
  Inventory.init({
    size: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};