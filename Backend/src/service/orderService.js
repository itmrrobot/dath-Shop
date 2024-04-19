const {
  Order,
  Product,
  Inventory,
  Category,
  OrderDetail,
} = require("../models/index");
const {combineArray,mergeEntries} = require("../utils/util");

const getOrderList = async (id) => {
  let orders = [];
  orders = await Order.findAll({
    where: { id_user: id },
    include: [
      {
        model: OrderDetail,
        attributes: {
          exclude: ["createdAt", "updatedAt","id_order","id_user"],
        },
      },
    ],
    raw: true,
    nest: true
  });
  return mergeEntries(combineArray(orders,"name","OrderDetails"));
};

const getOrderById = async (id) => {
  let order = {};
  order = await Order.findOne({
    where: { id },
    include: 
      {
        model: OrderDetail,
        attributes: {
          exclude: ["createdAt", "updatedAt","id_order","id_user"],
        },
      },
    
    raw: true,
    nest: true
  });
  return order;
};

const createNewOrder = async (data) => {
  try {
    const { products, ...orderData } = data;
    const productsData = eval(products);
    let orderDetail;
    const newOrder = await Order.create({ ...orderData });
    console.log(products, productsData);
    if (productsData) {
      productsData.forEach(async (p) => {
        orderDetail = await OrderDetail.create({
          id_order: newOrder?.id,
          id_user: newOrder?.id_user,
          id_product: p?.id_product,
          quantity: p?.quantity,
          size: p?.size,
        });
      });
    }
    return newOrder;
  } catch (e) {
    console.log(e);
  }
};

const updateOrder = async (id, data) => {
  try {
    await Order.update({ ...data }, { where: { id }, raw: true });
    //console.log(Order)
    return await getOrderById(id);
  } catch (e) {
    console.log(e);
  }
};

const deleteOrder = async (id) => {
  await Order.destroy({ where: { id } });
};

module.exports = {
  getOrderList,
  getOrderById,
  createNewOrder,
  deleteOrder,
  updateOrder,
};
