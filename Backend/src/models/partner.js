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
    ho_lot: DataTypes.TEXT,
    ten: DataTypes.INTEGER,
    ngay_sinh: DataTypes.DATE,
    role: DataTypes.TEXT,
    so_dien_thoai: DataTypes.TEXT,
    dia_chi: DataTypes.TEXT,
    ma_so_thue: DataTypes.TEXT,
    ten_cong_ty: DataTypes.TEXT,
    anh_minh_chung: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    tinh_trang: DataTypes.INTEGER,
    tong_tien_da_ban: DataTypes.DECIMAL(15,2),
    tong_don_hang_da_ban: DataTypes.INTEGER,
    tong_don_hang_doi_tra: DataTypes.INTEGER,
    change_pass: DataTypes.TEXT,
    confirm_pass: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Partner',
  });
  return Partner;
};