const { Cart, Product, CartProduct,Inventory } = require("../models/index");
const {mergeEntries} = require("../utils/util");

const getProductsInCart = async (id) => {
  let cart = [];
  cart = await Cart.findAll({
    where: {
      id_user: id,
    },
  });
  cart.sort((a, b) => a.id - b.id);
  return cart;
};

const getCartById = async (id) => {
  const card = await Cart.findOne({ where: { id: id } });
  return card;
};

const getCartByUserId = async (id) => {
  const card = await Cart.findAll({ where: { id_user: id } });
  return card;
};

const createNewCart = async (data) => {
  try {
    const product = await Cart.findOne({where:{id_product:data.id_product,size:data.size,id_user:data.id_user}});
    let carts;
    if(product) {
      await Cart.update({quantity:product.quantity+data.quantity},{ where: { id_product: data.id_product,size:data.size }, raw: true });
      return await Cart.findOne({where:{id_product: data.id_product,size:data.size}});
    } else {
      carts = await Cart.create(data);
    }
    return carts;
  } catch (e) {
    console.log(e);
  }
};

const updateCart = async (data) => {
  try {
    await Cart.update(
      { ...data },
      { where: { id: data.id }, raw: true }
    );
    //console.log(Cart)
    return getProductsInCart(data.id_user);
  } catch (e) {
    console.log(e);
  }
};

const deleteCard = async (id) => {
  await Cart.destroy({ where: { id } });
};

const deleteProductInCard = async (id, listIds) => {
  const productsInCart = await getCartByUserId(id);
  let isExsist = false;
  const idsProductsInCart = productsInCart.map(
    (obj) => obj?.dataValues?.id
  );
  for (let idProduct of JSON.parse(listIds)) {
    if (!idsProductsInCart.includes(idProduct)) {
      isExsist = true;
    } else {
      isExsist = false;
    }
  }
  for (let idProduct of JSON.parse(listIds)) {
    console.log(idProduct);
    await Cart.destroy({
      where: { id: String(idProduct), id_user: id },
    });
  }
  if (isExsist === true) {
    return { msg: "Delete failed ,products not in cart user" };
  }
  return {
    msg: "Delete success",
    newCart: await Cart.findAll({ where: { id_user: Number(id) } }),
  };
};

module.exports = {
  getProductsInCart,
  createNewCart,
  updateCart,
  getCartById,
  deleteCard,
  deleteProductInCard,
  getCartByUserId,
};
