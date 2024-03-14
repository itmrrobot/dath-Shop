'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart,{
        foreignKey: "id_product",
        as: "cart",
      });
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.Inventory,{through:'Product_Inventory'});
    }
  }
  Product.init({
    ten_san_pham: DataTypes.TEXT,
    slug_san_pham: DataTypes.TEXT,
    so_luong_nhap: DataTypes.INTEGER,
    so_luong_ban: DataTypes.INTEGER,
    id_partner: DataTypes.INTEGER,
    hinh_anh: DataTypes.TEXT,
    tinh_trang: DataTypes.INTEGER,
    mo_ta_ngan: DataTypes.TEXT,
    mo_ta_chi_tiet: DataTypes.TEXT,
    gia_ban: DataTypes.INTEGER,
    gia_khuyen_mai: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};