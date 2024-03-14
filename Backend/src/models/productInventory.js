"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductInventory.init(
    {
      InventoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Inventory', // 'Movies' would also work
          key: 'id'
        }
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Product', // 'Actors' would also work
          key: 'id'
        }
    }},
    {
      sequelize,
      modelName: "ProductInventory",
    }
  );
  return ProductInventory;
};