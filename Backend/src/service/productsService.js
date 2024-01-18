const {Product,Category} = require("../models/index");


const getProductList = async() => {
    let products = []
    products = await Product.findAll({raw:true,include: { model: Category},nest: true});
    return products;
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