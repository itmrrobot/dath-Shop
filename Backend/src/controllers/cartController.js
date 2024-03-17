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

const handleDeleteCart= async(req,res) => {
    let id = req.params.id;
    try {
        const cart = await cartService.getCartById(id);
        if(cart===null) return res.status(404).send();
        await cartService.deleteCard(id);
        res.status(200).send({msg:'Delete success'});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleDeleteProductInCart= async(req,res) => {
    let listIds = req.body.listIds;
    let id = req.params.id;
    try {
        const cart = await cartService.getCartByUserId(id);
        if(cart===null) return res.status(404).send();
        const newCart = await cartService.deleteProductInCard(id,listIds);
        res.status(200).send(newCart);
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleProductInCartList,handleUpdateCart,handleCreateNewCart,handleDeleteCart,handleDeleteProductInCart};