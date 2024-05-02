const { Category } = require("../models/index");
const fs = require("fs");
const cloudinary = require("../common/cloudinary-config");

const getCategoryList = async () => {
  let category = [];
  category = await Category.findAll({ raw: true });
  return category;
};

const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: { id: id } });
  return category;
};

const createNewCategory = async (data) => {
  try {
    const newCategory = await Category.create({ ...data });
    return newCategory;
  } catch (e) {
    console.log(e);
  }
};

const updateCategory = async (id, data, file) => {
  try {
    const folderName = "shop_imgs"; // Specify the folder name on Cloudinary
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderName,
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
    }
    await Category.update({ ...data }, { where: { id }, raw: true });
    //console.log(Category)
    return await getCategoryById(id);
  } catch (e) {
    console.log(e);
  }
};

const deleteCategory = async (id) => {
  const category = await getCategoryById(id);
  if (!category) {
    return null;
  }
  await Category.destroy({ where: { id } });
};

module.exports = {
  getCategoryList,
  getCategoryById,
  createNewCategory,
  deleteCategory,
  updateCategory,
};
