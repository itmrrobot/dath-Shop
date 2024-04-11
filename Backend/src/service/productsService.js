const {
  Product,
  Category,
  Inventory,
  ProductInventory,
} = require("../models/index");
const Sequelize = require("sequelize");
const cloudinary = require("../common/cloudinary-config");
const fs = require("fs");

const getProductList = async (querys) => {
  //let products = []
  const { page, limit, categoryId, sort, order, price_gte, price_lte } = querys;
  console.log(page, limit, order, sort, typeof sort === "string");
  const pages = page || 1;
  const pageSize = limit || 10;
  const minPrice = price_gte;
  const maxPrice = price_lte;
  let whereClause = {};
  let orderOption = [];

  if (sort && order && typeof sort === "string" && typeof order === "string") {
    // Sort by price in ascending order
    orderOption = [[`${sort}`.toLowerCase(), `${order}`.toUpperCase()]];
  }
  console.log(orderOption);
  if (categoryId) {
    whereClause.CategoryId = categoryId;
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    // Specify the price range condition
    whereClause.price = {
      [Sequelize.Op.between]: [minPrice, maxPrice],
    };
  }
  let queryOptions = {
    raw: true,
    include: [
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
    ],
    where: whereClause,
    nest: true,
  };

  // Conditionally add pagination options
  if (limit !== undefined) {
    queryOptions.limit = pageSize;
    queryOptions.offset = (pages - 1) * pageSize;
  }
  if (orderOption.length > 0) {
    queryOptions.order = orderOption;
  }

  let products = await Product.findAll(queryOptions);
  const combinedProducts = {};

  // Loop through each product
  products.forEach((product) => {
    // Check if the product ID already exists in combinedProducts
    if (combinedProducts[product.id]) {
      // If exists, push the inventory to the existing product's Inventories array
      combinedProducts[product.id].Inventories.push(product.Inventories);
    } else {
      // If not exists, add the product to combinedProducts and initialize the Inventories array
      combinedProducts[product.id] = {
        ...product,
        Inventories: [product.Inventories],
      };
    }
  });

  // Convert the combined products object to an array
  const combinedProductsArray = Object.values(combinedProducts);
  if (order?.toUpperCase() === "ASC") {
    return combinedProductsArray.sort((a, b) => a.price - b.price);
  } else if (order?.toUpperCase() === "DESC") {
    return combinedProductsArray.sort((a, b) => b.price - a.price);
  }
  return combinedProductsArray;
};

const getProductById = async (id) => {
  const product = await Product.findOne({ where: { id: id },include: [
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
  ], });
  return product;
};

const createNewProduct = async (data, files) => {
  try {
    const folderName = "shop_imgs"; // Specify the folder name on Cloudinary

    const promises = files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderName,
      });
      return result.secure_url;
    });

    const uploadedImagesUrls = await Promise.all(promises);
    files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error deleting file: ${file.path}`, err);
        } else {
          console.log(`File deleted: ${file.path}`);
        }
      });
    });
    data.img = JSON.stringify(uploadedImagesUrls);

    const listInventoryId = JSON.parse(data.listInventoryId);

    console.log(data.img, listInventoryId, data.category_name);
    const category = await Category.create({
      category_name: data.category_name,
    });
    const newProduct = await Product.create({
      ...data,
      categoryId: category.id,
    });
    console.log(data.id);
    if (listInventoryId?.length !== 0) {
      const createProductInventory = async () => {
        for (const id of listInventoryId) {
          await ProductInventory.create({
            ProductId: newProduct.id,
            InventoryId: id,
          });
        }
      };
      createProductInventory();
    }
    return newProduct;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const updateProduct = async (id, data) => {
  try {
    await Product.update({ ...data }, { where: { id }, raw: true });
    //console.log(product)
    return await getProductById(id);
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (id) => {
  await Product.destroy({ where: { id } });
};

module.exports = {
  getProductList,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
};
