'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role)
      User.hasMany(models.Reviews,{foreignKey:"id_user"})
      User.hasMany(models.Order,{foreignKey:"id_user"})
      User.hasMany(models.Returns,{foreignKey:"id_user"})
      //User.hasOne(models.Cart)
    }
  }
  User.init({
    fullname: DataTypes.TEXT,
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    RoleId: DataTypes.INTEGER,
    phone: DataTypes.TEXT,
    address: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    refreshToken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};