const { Cart, Product,CartProduct } = require("../models/index");


const getProductsInCart = async (id) => {
    let cart=[]
    cart = await Cart.findAll({
      where: {
        id_user:id,
      },
    });
    let newList = [];
cart.forEach((e)=>{
   let el=newList.find(n => n.nameProduct==e.nameProduct);
   if (el) el.so_luong+=e.so_luong;
   else newList.push(e);
});
    return newList;
};

const getCartById = async(id) => {
  const card = await Cart.findOne({where:{id:id}})
  return card;
}

const createNewCart = async (data) => {
  try {
    const carts = await Cart.create(data);
    return carts;
  } catch (e) {
    console.log(e);
  }
};

const updateCart = async (data) => {
  try {
    await Cart.update({ ...data }, { where: { id_product:data.id_product }, raw: true });
    //console.log(Cart)
    return getProductsInCart(data.id_user);
  } catch (e) {
    console.log(e);
  }
};

const deleteCard = async(id) => {
  await Cart.destroy({where:{id}});
}

module.exports = { getProductsInCart, createNewCart,updateCart,getCartById,deleteCard };
