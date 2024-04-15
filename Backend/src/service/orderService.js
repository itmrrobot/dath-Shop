const {Order,Product,Inventory,Category} = require('../models/index');

const getOrderList = async(id) => {
    let order = {};
    order = await Order.findOne({where:{id},raw:true});
    const products = await Product.findAll({where:{id:order.ids_product},include: [
        { model: Category },
        {
          model: Inventory,
          as: "Inventories",
          through: { attributes: [] },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "ProductInventory",
              "InventoryId",
              "ProductId",
            ],
          },
        },
      ]});
    order.products = products;
    console.log(products);
    return order;
}

const getOrderById = async(id) => {
    const order = await Order.findOne({where:{id:id}})
    return order;
}

const createNewOrder = async(data) => {
    try {
        const newOrder = await Order.create({...data});
        return newOrder;
    } catch(e) {
        console.log(e);
    }
}

const updateOrder = async(id,data) => {
    try {
        await Order.update({...data},{where:{id},raw:true});
        //console.log(Order)
        return await getOrderById(id);
    } catch(e) {
        console.log(e);
    }
}

const deleteOrder = async(id) => {
    await Order.destroy({where:{id}});
}

module.exports = {getOrderList,getOrderById,createNewOrder,deleteOrder,updateOrder};