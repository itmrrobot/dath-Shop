const brandService = require("../service/brandService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');
const cloudinary = require('../common/cloudinary-config');

const handleGetBrandList = async(req,res) => {
    try {
        let brand = await brandService.getBrandList();
        return res.send({brand});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetBrandById = async(req,res) => {
    try {
        const brand = await brandService.getBrandById(req.params.id);
        if(brand===null) return res.status(404).send();
        res.send(brand);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewBrand = async(req,res) => {
    const folderName = 'shop_imgs'; // Specify the folder name on Cloudinary

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folderName
      });
      // Delete uploaded file from local storage
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file: ${req.file.path}`, unlinkErr);
        } else {
          console.log(`File deleted: ${req.file.path}`);
        }
      });
    req.body.img = JSON.stringify(result.url);

    try {
        const newBrand = await brandService.createNewBrand(req.body);
        res.send(newBrand);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateBrand = async(req,res) => {
    let id = req.params.id;
    try {
        const brand = await brandService.getBrandById(id);
        if(brand===null) return res.status(404).send();
        const updateBrand = await brandService.updateBrand(id,req.body,req.file);
        res.send(updateBrand);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeleteBrand = async(req,res) => {
    let id = req.params.id;
  try {
    const brand = await brandService.deleteBrand(id);
    if(brand===null) return res.status(404).send();
    res.send({ msg: "Delete success" });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

module.exports = {handleGetBrandList,handleGetBrandById,handleCreateNewBrand,handleDeleteBrand,handleUpdateBrand};