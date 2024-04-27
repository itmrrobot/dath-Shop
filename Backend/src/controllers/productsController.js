const productsService = require("../service/productsService");
const path = require("path");
const imgPath = path.join(__dirname, "../public/img/");
const fs = require("fs");

const handleGetProductList = async (req, res) => {
  try {
    const querys = req.query;
    const {combinedProductsArray,totalCount} = await productsService.getProductList(querys);
    res.header('x-total-count', totalCount);
    return res.send({ products:combinedProductsArray });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

const handleGetProductById = async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    if (product === null) return res.status(404).send();
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
};

const handleCreateNewProduct = async (req, res) => {
  try {
    const newProduct = await productsService.createNewProduct(
      req.body,
      req.files
    );
    res.send(newProduct);
  } catch (e) {
    res.status(400).send();
  }
};

const handleUpdateProduct = async (req, res) => {
  let id = req.params.id;
  try {
    const product = await productsService.getProductById(id);
    if (product === null) return res.status(404).send();
    const updateProduct = await productsService.updateProduct(id, req.body);
    res.send(updateProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

const handleDeleteProduct = async (req, res) => {
  let id = req.params.id;
  let imgs = [];
  try {
    const product = await productsService.getProductById(id);
    if (product === null) return res.status(404).send();
    imgs = JSON.parse(product.img);
    await productsService.deleteProduct(id);
    imgs.forEach((img, index) => {
      fs.unlinkSync(imgPath + img);
    });
    res.send({ msg: "Delete success" });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

module.exports = {
  handleGetProductList,
  handleGetProductById,
  handleCreateNewProduct,
  handleDeleteProduct,
  handleUpdateProduct,
};
