'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Partner.init({
    ho_lot: DataTypes.STRING,
    ten: DataTypes.INTEGER,
    ngay_sinh: DataTypes.DATE,
    role: DataTypes.STRING,
    so_dien_thoai: DataTypes.STRING,
    dia_chi: DataTypes.STRING,
    ma_so_thue: DataTypes.STRING,
    ten_cong_ty: DataTypes.STRING,
    anh_minh_chung: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tinh_trang: DataTypes.INTEGER,
    tong_tien_da_ban: DataTypes.DECIMAL(15,2),
    tong_don_hang_da_ban: DataTypes.INTEGER,
    tong_don_hang_doi_tra: DataTypes.INTEGER,
    change_pass: DataTypes.STRING,
    confirm_pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partner',
  });
  return Partner;
};