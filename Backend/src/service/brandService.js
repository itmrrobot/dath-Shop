const { Brand } = require("../models/index");
const fs = require('fs');
const cloudinary = require('../common/cloudinary-config');

const getBrandList = async () => {
  let brand = [];
  brand = await Brand.findAll({ raw: true });
  return brand;
};

const getBrandById = async (id) => {
  const brand = await Brand.findOne({ where: { id: id } });
  return brand;
};

const createNewBrand = async (data) => {
  try {
    const newBrand = await Brand.create({ ...data });
    return newBrand;
  } catch (e) {
    console.log(e);
  }
};

const updateBrand = async (id, data,file) => {
  try {
    const folderName = 'shop_imgs'; // Specify the folder name on Cloudinary

    const result = await cloudinary.uploader.upload(file.path, {
        folder: folderName
      });
      // Delete uploaded file from local storage
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file: ${file.path}`, unlinkErr);
        } else {
          console.log(`File deleted: ${file.path}`);
        }
      });
    data.img = JSON.stringify(result.url);
    console.log(data);
    await Brand.update({ ...data }, { where: { id }, raw: true });
    //console.log(Brand)
    return await getBrandById(id);
  } catch (e) {
    console.log(e);
  }
};

const deleteBrand = async (id) => {
  const brand = await getBrandById(id);
  if (!brand) {
    return null;
  }
  await Brand.destroy({ where: { id } });
};

module.exports = {
  getBrandList,
  getBrandById,
  createNewBrand,
  deleteBrand,
  updateBrand,
};
