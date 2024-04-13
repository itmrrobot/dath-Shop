"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product, { foreignKey: "id_product" });
    }
  }
  Cart.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      nameProduct: DataTypes.TEXT,
      priceProduct: DataTypes.INTEGER,
      img: DataTypes.TEXT,
      size: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
