const {
  Product,
  Category,
  Inventory,
  Brand,
} = require("../models/index");
const Sequelize = require("sequelize");
const cloudinary = require("../common/cloudinary-config");
const fs = require("fs");
const { getPublicIdFromUrl } = require("../utils/util");

const getProductList = async (querys) => {
  //let products = []
  const {
    page,
    limit,
    categoryId,
    sort,
    order,
    price_gte,
    price_lte,
    brandId,
  } = querys;
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
  if (brandId) {
    whereClause.BrandId = brandId;
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
        attributes: {
          exclude: ["createdAt", "updatedAt", "id_product"],
        },
      },
      { model: Brand },
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
  let productsArray = combinedProductsArray;
  if (order?.toUpperCase() === "ASC") {
    productsArray = productsArray.sort((a, b) => a.price - b.price);
  } else if (order?.toUpperCase() === "DESC") {
    productsArray = productsArray.sort((a, b) => b.price - a.price);
  }
  console.log("Array:",productsArray)
  const totalCount = await Product.count({ where: whereClause });
  return { productsArray, totalCount };
};

const getProductById = async (id) => {
  const product = await Product.findOne({
    where: { id: id },
    include: [
      { model: Category },
      {
        model: Inventory,
        as: "Inventories",
        attributes: {
          exclude: ["createdAt", "updatedAt", "id_product"],
        },
        order: [['id', 'DESC']]
      },
      { model: Brand
       },
    ],
  });
  product.Inventories = product.Inventories.sort((a, b) => a.id - b.id);
  return product;
};

const createNewProduct = async (data, files) => {
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

  const listInventory = data.listInventory;
  let array = eval(listInventory);
  // const category = await Category.create({
  //   category_name: data.category_name,
  // });
  // const brand = await Brand.create({
  //   brand_name: data.brand_name,
  // });
  //data.import_quantity = Number(data.import_quantity)
  const newProduct = await Product.create({ ...data });
  if (listInventory?.length !== 0) {
    for (const list of array) {
      await Inventory.create({
        size: list.size,
        quantity: list.quantity,
        id_product: newProduct.id,
      });
    }
  }
  return newProduct;
};

const updateProduct = async (id, data, files) => {
  try {
    const product = await getProductById(id);
    const arrayImgs = product.img;
    let uploadedImagesUrls;
    const folderName = "shop_imgs"; // Specify the folder name on Cloudinary
    if (files) {
      const promises = files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: folderName,
        });
        return result.secure_url;
      });

      uploadedImagesUrls = await Promise.all(promises);
      files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`Error deleting file: ${file.path}`, err);
          } else {
            console.log(`File deleted: ${file.path}`);
          }
        });
      });
    }
    if (
      data.imgsSelectedEdit &&
      files.length === JSON.parse(data.imgsSelectedEdit).length &&
      files
    ) {
      JSON.parse(data.imgsSelectedEdit).forEach((value, index) => {
        const newValue = uploadedImagesUrls[index];
        if (value > 3) {
          return;
        }
        if (index >= 0 && index < arrayImgs.length) {
          arrayImgs[value] = newValue;
        }
      });
    }
    data.img = JSON.stringify(arrayImgs);
    await Product.update({ ...data }, { where: { id }, raw: true });
    //console.log(product)
    return await getProductById(id);
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (id) => {
  console.log(id);
  const product = await getProductById(id);
  if (!product) {
    return null;
  }
  const publicIds = product?.img.map((url) => {
    const id = getPublicIdFromUrl(url);
    return id;
  });
  publicIds?.length !== 0 &&
    publicIds?.forEach(async (publicId) => {
      try {
        await cloudinary.uploader.destroy(`shop_imgs/${publicId}`);
      } catch (error) {
        console.error(
          `Error deleting image with public ID ${publicId}:`,
          error
        );
      }
    });
  await Product.destroy({ where: { id } });
};

module.exports = {
  getProductList,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
};
