const authService = require('../service/authService');
const session = require('express-session');

const handleRegister = async(req,res) => {
    try {
        const respone = await authService.register(req.body);
        if(respone.err===0) return res.status(400).send(respone.mess);
        return res.status(200).send(respone);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

const handleLogin = async(req,res) => {
    try {
        if(!req.body.password||!req.body.email) return res.status(400).send({err:"Email or password is invalid"})
        const respone = await authService.login(req.body);
        if(respone.err===0) return res.status(400).send(respone);
        
        return res.status(200).send(respone);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

const handleLoginSuccess = async(req,res) => {
    const user = session?.user?.dataValues;
    const respone = await authService.loginSuccessGoogle(user); 
    if(user){
        res.status(200).json({message:"user Login",respone})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
}

const handleLogout = async(req,res) => {
    if(session.user) {
        delete session.user;
        return res.status(200).json({message:"Logout success",user:null})
    }
    return res.status(400).send();
}

const handleForgotPassword = async(req,res) => {
    try {
        const respone = await authService.forgotPassword(req.body.email);
        if(respone===null) return res.status(404).send();
        return res.status(200).send(respone);
    } catch(e) {
        console.log(e);
        return res.status(500).send();
    }
}

const handleRefreshToken = async(req,res) => {
    try {
        const respone = await authService.refreshToken(req.body);
        console.log(respone);
        if(respone.err===1) return res.status(400).send(respone);
        return res.status(200).send(respone);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {handleRegister,handleLogin,handleRefreshToken,handleLoginSuccess,handleLogout,handleForgotPassword};