const { Inventory } = require("../models/index");

const getInventoryList = async () => {
  let inventory = [];
  inventory = await Inventory.findAll({ raw: true });
  return inventory;
};

const getInventoryById = async (id) => {
  const inventory = await Inventory.findOne({ where: { id: id } });
  return inventory;
};

const createNewInventory = async (data) => {
  try {
    const newinventory = await Inventory.create({ ...data });
    return newinventory;
  } catch (e) {
    console.log(e);
  }
};

const updateInventory = async (id, data) => {
  try {
    console.log(data.listInventory, typeof data.listInventory);
    data.listInventory.forEach(async (item) => {
      await Inventory.update(
        {size:item.size,quantity:item.quantity},
        { where: {id:item.id}, raw: true }
      );
    });
    return {msg:"Update success!"}
  } catch (e) {
    console.log(e);
  }
};

const deleteInventory = async (id) => {
  await Inventory.destroy({ where: { id } });
};

module.exports = {
  getInventoryList,
  getInventoryById,
  createNewInventory,
  updateInventory,
  deleteInventory,
};
