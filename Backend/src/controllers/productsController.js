const productsService = require("../service/productsService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');
const uploadImage = (req,res) => {
    console.log(req.file)
    res.send("hello")
}
const cloudinary = require('../common/cloudinary-config');

const handleGetProductList = async(req,res) => {
    try {
        const querys = req.query;
        let products = await productsService.getProductList(querys);
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
    // const folderName = 'shop_imgs'; // Specify the folder name on Cloudinary

    // const promises = req.files.map(async (file) => {
    //   const result = await cloudinary.uploader.upload(file.path, {
    //     folder: folderName
    //   });
    //   return result.secure_url;
    // });

    // const uploadedImagesUrls = await Promise.all(promises);
    // req.files.forEach((file) => {
    //   fs.unlink(file.path, (err) => {
    //     if (err) {
    //       console.error(`Error deleting file: ${file.path}`, err);
    //     } else {
    //       console.log(`File deleted: ${file.path}`);
    //     }
    //   });
    // });
    // console.log(uploadedImagesUrls)
    // req.body.img = JSON.stringify(uploadedImagesUrls);

    try {
        const newProduct = await productsService.createNewProduct(req.body,req.files);
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
        imgs=JSON.parse(product.img);
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