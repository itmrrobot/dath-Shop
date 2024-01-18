const {User,Role} = require('../models/index');
const hashPassword = require("../common/hashPassword");

const getCurrentUser = async(id) => {
    console.log(id)
    const user = await User.findOne({where:{id},include:{model:Role},attributes:{exclude:['password','roleId','refreshToken']},raw:true});
    return user;
}

const updateUser = async(id,data) => {
    let password = await hashPassword(data.password);
    try {
        const user=await User.update({...data,password:password},{where:{id},raw:true});
        //console.log(Customer)
        return user;
    } catch(e) {
        console.log(e);
    }
}

module.exports={getCurrentUser,updateUser}