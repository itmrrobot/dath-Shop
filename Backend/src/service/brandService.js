const {Brand} = require('../models/index');

const getBrandList = async() => {
    let brand = [];
    brand = await Brand.findAll({raw:true});
    return brand;
}

const getBrandById = async(id) => {
    const brand = await Brand.findOne({where:{id:id}})
    return brand;
}

const createNewBrand = async(data) => {
    try {
        const newBrand = await Brand.create({...data});
        return newBrand;
    } catch(e) {
        console.log(e);
    }
}

const updateBrand = async(id,data) => {
    try {
        await Brand.update({...data},{where:{id},raw:true});
        //console.log(Brand)
        return await getBrandById(id);
    } catch(e) {
        console.log(e);
    }
}

const deleteBrand = async(id) => {
    await Brand.destroy({where:{id}});
}

module.exports = {getBrandList,getBrandById,createNewBrand,deleteBrand,updateBrand};