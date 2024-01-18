const {Partner} = require('../models/index');
const hashPassword = require('../common/hashPassword');

const getPartnerList = async() => {
    let partner = []
    partner = await Partner.findAll({raw:true});
    return partner;
}

const getPartnerById = async(id) => {
    const partner = await Partner.findOne({where:{id:id}})
    return partner;
}

const createNewPartner = async(data) => {
    data.password = await hashPassword(data.password);
    try {
        const newPartner = await Partner.create({...data});
        return newPartner;
    } catch(e) {
        console.log(e);
    }
}

const updatePartner = async(id,data) => {
    data.password = await hashPassword(data.password);
    try {
        await Partner.update({...data},{where:{id},raw:true});
        //console.log(Partner)
        return await getPartnerById(id);
    } catch(e) {
        console.log(e);
    }
}

const deletePartner = async(id) => {
    await Partner.destroy({where:{id}});
}

module.exports = {getPartnerList,getPartnerById,createNewPartner,deletePartner,updatePartner};