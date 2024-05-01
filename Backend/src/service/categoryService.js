const { Category } = require("../models/index");

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

const updateCategory = async (id, data) => {
  try {
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
