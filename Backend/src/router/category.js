const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {upload} = require('../common/upload');

router.get('/category',categoryController.handleGetCategoryList)
.get('/category/:id',categoryController.handleGetCategoryById)
.post('/category/create',upload.single('img'),categoryController.handleCreateNewCategory)
.put('/category/update/:id',upload.single('img'),categoryController.handleUpdateCategory)
.delete('/category/delete/:id',categoryController.handleDeleteCategory)

module.exports = router;