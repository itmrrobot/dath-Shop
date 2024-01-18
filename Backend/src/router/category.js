const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const upload = require('../common/upload');

router.get('/category',categoryController.handleGetCategoryList)
.get('/category/:id',categoryController.handleGetCategoryById)
.post('/category/create',upload.single('img'),categoryController.handleCreateNewCategory)
.post('/category/upload',upload.single('upload'),categoryController.uploadImage)
.put('/category/update/:id',categoryController.handleUpdateCategory)
.delete('/category/delete/:id',categoryController.handleDeleteCategory)

module.exports = router;