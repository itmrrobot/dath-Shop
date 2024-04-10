const wishlistService = require("../service/wishlistService");
const path = require('path');

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

const handleDeleteWishList = async(req,res) => {
    let id = req.params.id;
    let imgs=[]
    try {
        const category = await categoryService.getCategoryById(id);
        if(category===null) return res.status(404).send();
        imgs=JSON.parse(category.img);
        await categoryService.deleteCategory(id);
        imgs.forEach((img,index) => {
            fs.unlinkSync(imgPath+img);
        })
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleProductInWishList,handleUpdateWishList,handleCreateNewWishList};