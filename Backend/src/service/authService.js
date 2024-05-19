const hashPassword = require('../common/hashPassword');
const {User,Role} = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {generateRandomPassword} = require("../utils/util");
const sendMail = require("../common/send-mail");

const register = async(data) => {
    console.log(data);
    let password =await hashPassword(data.password);
    try {
        const res = await User.findOrCreate({where:{email:data.email},defaults:{...data,password:password}});
        console.log(res);
        const access_token = res[1] ? jwt.sign({id:res[0].id,email:res[0].email,roleId:res[0].roleId},process.env.JWT_SECRET,{expiresIn:'5d'}):null;
        const refresh_token = res[1] ? jwt.sign({id:res[0].id},process.env.JWT_SECRET_REFRESH_TOKEN,{expiresIn:'60s'}):null;
        if(refresh_token) {
            await User.update({refreshToken:refresh_token},{where:{id:res[0].id}});
        }
        return res[1]?{err:1,mess:"Register success",access_token,refresh_token,user:res[0]}:{err:0,mess:"Email is used"};
    } catch(e) {
        console.log(e);
    }
}

const login = async(data) => {
    console.log(data)
    try {
        const res = await User.findOne({where:{email:data.email},raw:true,include: { model: Role, as: 'Role',attributes: ["id","name"]},nest: true,attributes: {exclude: ['createdAt','updatedAt','RoleId','roleId']}});
        console.log(res);
        const isChecked = res && bcrypt.compareSync(data.password,res.password);
        const access_token = isChecked && jwt.sign({id:res.id,email:res.email,roleId:res.roleId},process.env.JWT_SECRET,{expiresIn:'5d'});
        //const token = res[1] ? jwt.sign({id:res[0].id,email:res[0].email,roleId:res[0].roleId},process.env.JWT_SECRET,{expiresIn:'120s'}):null;
        const refresh_token = isChecked ? jwt.sign({id:res.id},process.env.JWT_SECRET_REFRESH_TOKEN,{expiresIn:'5d'}):null;
        if(refresh_token) {
            await User.update({refreshToken:refresh_token},{where:{id:res.id}});
        }
        delete res.password
        return access_token?{err:1,mess:"Login success",res,"access_token":access_token?`${access_token}`:null,refresh_token}:res?{err:0,mess:"Password is wrong"}:{err:0,mess:"Email is not registered"};
    } catch(e) {
        console.log(e);
    }
}

const loginSuccessGoogle = async(data) => {
    const access_token = data && jwt.sign({id:data.id,email:data.email,roleId:3},process.env.JWT_SECRET,{expiresIn:'5d'});
    //const token = res[1] ? jwt.sign({id:res[0].id,email:res[0].email,roleId:res[0].roleId},process.env.JWT_SECRET,{expiresIn:'120s'}):null;
    const refresh_token = data ? jwt.sign({id:data.id},process.env.JWT_SECRET_REFRESH_TOKEN,{expiresIn:'5d'}):null;
    if(refresh_token) {
        await User.update({refreshToken:refresh_token},{where:{id:data.id}});
    }
    data.access_token = access_token;
    return data;
}

const forgotPassword = async(email) => {
    const user = await User.findOne({where:{email}});
    if(!user) {
        return null;
    }
    const password = user?.password;
    let newPassword,newPassworDB;
    if(password) {
        newPassword = generateRandomPassword(12)
        newPassworDB =await hashPassword(newPassword);
        const info = await sendMail({email,newPassword});
        await User.update({password:newPassworDB},{where:{email}});
        return {msg:'Change password success!',info}
    }
}

const refreshToken = async(data) => {

    let refresh_token = data.refreshToken;
    try {
        const res = await User.findOne({where:{refreshToken:refresh_token}})
        if(res) {
            const result=jwt.verify(refresh_token,process.env.JWT_SECRET_REFRESH_TOKEN,(err) => {
                if(err) {return {err:1,msg:"Refresh token has expired. Required login!"}}
                else {
                    const access_token = jwt.sign({id:res.id,email:res.email,roleId:res.roleId},process.env.JWT_SECRET,{expiresIn:'5d'});
                    return {err:access_token?0:1,msg:access_token?"OK":"Cannot generate access token",access_token:access_token?`${access_token}`:null,refresh_token}
                }
            })
            return result;
        }
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    register,login,refreshToken,forgotPassword,loginSuccessGoogle
}