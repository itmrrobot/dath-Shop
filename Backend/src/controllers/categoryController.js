const categoryService = require("../service/categoryService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dzznxekfg',
  api_key: '651378936647749',
  api_secret: 'L-YVnYmTUNndTCTi52L_O-keBnk'
});

const handleGetCategoryList = async(req,res) => {
    try {
        let category = await categoryService.getCategoryList();
        console.log(category)
        return res.send({category});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetCategoryById = async(req,res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if(category===null) return res.status(404).send();
        res.send(category);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewCategory = async(req,res) => {
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
    console.log(result)
    req.body.img = JSON.stringify(result.url);

    try {
        const newCategory = await categoryService.createNewCategory(req.body);
        res.send(newCategory);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateCategory = async(req,res) => {
    let id = req.params.id;
    try {
        const category = await categoryService.getCategoryById(id);
        if(category===null) return res.status(404).send();
        const updateCategory = await categoryService.updateCategory(id,req.body);
        res.send(updateCategory);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeleteCategory = async(req,res) => {
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

module.exports = {handleGetCategoryList,handleGetCategoryById,handleCreateNewCategory,handleDeleteCategory,handleUpdateCategory};