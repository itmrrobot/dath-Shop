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
      // // define association here
      // WishList.belongsTo(models.User);
      WishList.belongsTo(models.Product, { foreignKey: "id_product" });
    }
  }
  WishList.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      nameProduct: DataTypes.TEXT,
      priceProduct: DataTypes.INTEGER,
      img: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "WishList",
    }
  );
  return WishList;
};