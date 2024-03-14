const {Product,Category,Inventory} = require("../models/index");


const getProductList = async() => {
    //let products = []
    let products = await Product.findAll({raw:true,include: [{ model: Category},{model: Inventory,through:'Product_Inventory',attributes: {exclude: ['createdAt','updatedAt','Product_Inventory']}}],nest: true});
    const combinedProducts = {};

// Loop through each product
products.forEach(product => {
    // Check if the product ID already exists in combinedProducts
    if (combinedProducts[product.id]) {
        // If exists, push the inventory to the existing product's Inventories array
        combinedProducts[product.id].Inventories.push(product.Inventories);
    } else {
        // If not exists, add the product to combinedProducts and initialize the Inventories array
        combinedProducts[product.id] = { ...product, Inventories: [product.Inventories] };
    }
});

// Convert the combined products object to an array
const combinedProductsArray = Object.values(combinedProducts);
    return combinedProductsArray;
}

const getProductById = async(id) => {
    const product = await Product.findOne({where:{id:id}})
    return product;
}

const createNewProduct = async(data) => {
    try {
        const category = await Category.create({ten_chuyen_muc:data.ten_chuyen_muc})
        const newProduct = await Product.create({...data,categoryId:category.id});
        
        return newProduct;
    } catch(e) {
        console.log(e);
    }
}

const updateProduct = async(id,data) => {
    try {
        await Product.update({...data},{where:{id},raw:true});
        //console.log(product)
        return await getProductById(id);
    } catch(e) {
        console.log(e);
    }
}

const deleteProduct = async(id) => {
    await Product.destroy({where:{id}});
}

module.exports = {getProductList,getProductById,createNewProduct,deleteProduct,updateProduct};