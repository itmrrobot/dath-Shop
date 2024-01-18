const {Customer} = require('../models/index');
const hashPassword = require('../common/hashPassword');

const getCustomerList = async() => {
    let customer = []
    customer = await Customer.findAll({raw:true});
    return customer;
}

const getCustomerById = async(id) => {
    const customer = await Customer.findOne({where:{id:id}})
    return customer;
}

const createNewCustomer = async(data) => {
    data.password = await hashPassword(data.password);
    try {
        const newCustomer = await Customer.create({...data});
        return newCustomer;
    } catch(e) {
        console.log(e);
    }
}

const updateCustomer = async(id,data) => {
    data.password = await hashPassword(data.password);
    try {
        await Customer.update({...data},{where:{id},raw:true});
        //console.log(Customer)
        return await getCustomerById(id);
    } catch(e) {
        console.log(e);
    }
}

const deleteCustomer = async(id) => {
    await Customer.destroy({where:{id}});
}

module.exports = {getCustomerList,getCustomerById,createNewCustomer,deleteCustomer,updateCustomer};