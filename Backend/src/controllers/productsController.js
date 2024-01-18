const productsService = require("../service/productsService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');
const uploadImage = (req,res) => {
    console.log(req.file)
    res.send("hello")
}

const handleGetProductList = async(req,res) => {
    try {
        let products = await productsService.getProductList();
        console.log(products)
        return res.send({products});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetProductById = async(req,res) => {
    try {
        const product = await productsService.getProductById(req.params.id);
        if(product===null) return res.status(404).send();
        res.send(product);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewProduct = async(req,res) => {
    let img =[]
    req.files.forEach((file,index) => {
        img.push(file?.originalname);
    })
    console.log(img)
    req.body.hinh_anh = JSON.stringify(img);

    try {
        const newProduct = await productsService.createNewProduct(req.body);
        res.send(newProduct);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateProduct = async(req,res) => {
    let id = req.params.id;
    try {
        const product = await productsService.getProductById(id);
        if(product===null) return res.status(404).send();
        const updateProduct = await productsService.updateProduct(id,req.body);
        res.send(updateProduct);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeleteProduct = async(req,res) => {
    let id = req.params.id;
    let imgs=[]
    try {
        const product = await productsService.getProductById(id);
        if(product===null) return res.status(404).send();
        imgs=JSON.parse(product.hinh_anh);
        await productsService.deleteProduct(id);
        imgs.forEach((img,index) => {
            fs.unlinkSync(imgPath+img);
        })
        res.send({msg:"Delete success"});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleGetProductList,uploadImage,handleGetProductById,handleCreateNewProduct,handleDeleteProduct,handleUpdateProduct};