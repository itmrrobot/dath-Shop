const cartService = require("../service/cartService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');

const handleProductInCartList = async(req,res) => {
    try {
        let cart = await cartService.getProductsInCart(req.params.id);
        if(cart===null) return res.status(404).send();
        res.send(cart);
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetCategoryById = async(req,res) => {
    try {
        const cart = await cartService.getCategoryById(req.params.id);
        if(cart===null) return res.status(404).send();
        res.send(cart);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewCart = async(req,res) => {
    try {
        const newCart = await cartService.createNewCart(req.body);
        res.send(newCart);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateCart = async(req,res) => {
    try {
        const updateCart = await cartService.updateCart(req.body);
        res.send(updateCart);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeleteCategory = async(req,res) => {
    let id = req.params.id;
    let imgs=[]
    try {
        const cart = await cartService.getCategoryById(id);
        if(cart===null) return res.status(404).send();
        imgs=JSON.parse(cart.hinh_anh);
        await cartService.deleteCategory(id);
        imgs.forEach((img,index) => {
            fs.unlinkSync(imgPath+img);
        })
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleProductInCartList,handleUpdateCart,handleCreateNewCart,handleDeleteCategory};