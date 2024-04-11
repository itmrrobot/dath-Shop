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
      Product.hasMany(models.WishList,{
        foreignKey: "id_product",
        as: "wishList"
      });
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.Inventory,{through:'ProductInventory'});
      Product.hasMany(models.Reviews,{foreignKey:"id_product"});
    }
  }
  Product.init({
    name: DataTypes.TEXT,
    slug_product: DataTypes.TEXT,
    import_quatity: DataTypes.INTEGER,
    sell_quantity: DataTypes.INTEGER,
    id_partner: DataTypes.INTEGER,
    img: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    short_description: DataTypes.TEXT,
    detail_description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    discount_price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};