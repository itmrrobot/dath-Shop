const {
  Order,
  Product,
  Inventory,
  Category,
  OrderDetail,
} = require("../models/index");
const { mergeEntries } = require("../utils/util");

const getOrderList = async (id) => {
  let orders = [];
  orders = await Order.findAll({
    where: { id_user: id },
    include: {
      model: OrderDetail,
      attributes: {
        exclude: ["createdAt", "updatedAt", "id_order", "id_user"],
      },
    },
    raw: true,
    nest: true,
  });
  return mergeEntries(orders);
};

const getOrderById = async (id) => {
  let order = {};
  order = await Order.findAll({
    where: { id },
    include: {
      model: OrderDetail,
      attributes: {
        exclude: ["createdAt", "updatedAt", "id_order", "id_user"],
      },
    },

    raw: true,
    nest: true,
  });
  const object = Object.assign(
    {},
    ...mergeEntries(order).map((item) => ({ [item.id]: item }))
  );
  const newOrder = Object.values(object)[0];
  return newOrder;
};

const getAllOrders = async () => {
  const orders = await Order.findAll({
    include: {
      model: OrderDetail,
      attributes: {
        exclude: ["createdAt", "updatedAt", "id_order", "id_user"],
      },
      include: {
        model: Product,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Inventory,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      },
    },
  });
  return orders.sort((a, b) => a.id - b.id);
};

const createNewOrder = async (data) => {
  try {
    const { products, ...orderData } = data;
    console.log(products, orderData);
    const productsData = eval(products);
    let orderDetail;
    const newOrder = await Order.create({ ...orderData });
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
  getAllOrders,
  createNewOrder,
  deleteOrder,
  updateOrder,
};
