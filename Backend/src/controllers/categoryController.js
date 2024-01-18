const categoryService = require("../service/categoryService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');
const uploadImage = (req,res) => {
    console.log(req.file)
    res.send("hello")
}

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
    let img =[]
    req.files.forEach((file,index) => {
        img.push(file?.originalname);
    })
    console.log(img)
    req.body.hinh_anh = JSON.stringify(img);

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
        imgs=JSON.parse(category.hinh_anh);
        await categoryService.deleteCategory(id);
        imgs.forEach((img,index) => {
            fs.unlinkSync(imgPath+img);
        })
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleGetCategoryList,uploadImage,handleGetCategoryById,handleCreateNewCategory,handleDeleteCategory,handleUpdateCategory};