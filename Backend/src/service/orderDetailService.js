const { OrderDetail } = require("../models/index");

const updateOrderDetail = async (dataOrderDetail) => {
  try {
    const { id, data } = dataOrderDetail;
    const { id_order, ...restData } = data;
    await OrderDetail.update({ ...restData }, { where: { id, id_order } });
    return await OrderDetail.findOne({where:{id,id_order}});
  } catch (e) {
    console.log(e);
  }
};

module.exports = { updateOrderDetail };
