const { Returns, Order, OrderDetail } = require("../models/index");

const getReturnsList = async (id) => {
  let returnsList = [];
  returnsList = await Returns.findAll({
    where: { id_user: id },
    include: [
      {
        model: Order,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: OrderDetail,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  });
  return returnsList;
};

const getReturnsById = async (id) => {
  const returnsData = await Returns.findOne({
    where: { id },
    include: [
      {
        model: Order,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: OrderDetail,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  });
  return returnsData;
};

const createReturns = async (data) => {
  const { orders, ...returnsData } = data;
  const ordersData = eval(orders);
  let newOrders;
  const newReturns = await Returns.create({ ...returnsData });
  if (ordersData) {
    ordersData.forEach(async (p) => {
      newOrders = await Order.update(
        {
          id_returns: newReturns.id,
        },
        { where: { id: p.id } }
      );
    });
  }
  return newReturns;
};

module.exports = { getReturnsList, createReturns, getReturnsById };
