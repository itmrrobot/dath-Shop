"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Returns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsTo(models.User);
      Returns.hasMany(models.Order, { foreignKey: "id_returns" });
      Returns.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }
  Returns.init(
    {
      address: DataTypes.TEXT,
      additional: DataTypes.TEXT,
      description: DataTypes.TEXT,
      phone: DataTypes.TEXT,
      img: DataTypes.TEXT,
      video: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      date_pickup: DataTypes.DATE,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Returns",
    }
  );
  return Returns;
};