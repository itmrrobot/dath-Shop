"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviews.belongsTo(models.Product,{foreignKey:"id_product"});
      Reviews.belongsTo(models.User,{foreignKey:"id_user"});
    }
  }
  Reviews.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      video: DataTypes.TEXT,
      img: DataTypes.TEXT,
      numberLikes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};