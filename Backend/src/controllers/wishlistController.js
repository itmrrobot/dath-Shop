const wishlistService = require("../service/wishlistService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');

const handleProductInWishList = async(req,res) => {
    try {
        let wishList = await wishlistService.getProductsInWishList(req.params.id);
        if(wishList===null) return res.status(404).send();
        res.send(wishList);
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleCreateNewWishList = async(req,res) => {
    try {
        const newWishList = await wishlistService.createNewWishlist(req.body);
        res.send(newWishList);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateWishList = async(req,res) => {
    try {
        const updateWishList = await wishlistService.updateWishlist(req.body);
        res.send(updateWishList);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

module.exports = {handleProductInWishList,handleUpdateWishList,handleCreateNewWishList};