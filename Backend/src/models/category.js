'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product);
      
    }
  }
  Category.init({
    ten_chuyen_muc: DataTypes.TEXT,
    slug_chuyen_muc: DataTypes.TEXT,
    hinh_anh: DataTypes.TEXT,
    tinh_trang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};