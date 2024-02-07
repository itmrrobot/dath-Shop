"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsTo(models.User);
      WishList.belongsTo(models.Product, { foreignKey: "id_product" });
    }
  }
  WishList.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      nameProduct: DataTypes.STRING,
      priceProduct: DataTypes.INTEGER,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WishList",
    }
  );
  return WishList;
};