const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const {upload} = require('../common/upload');

router.get('/brand',brandController.handleGetBrandList)
.get('/brand/:id',brandController.handleGetBrandById)
.post('/brand/create',upload.single('img'),brandController.handleCreateNewBrand)
.put('/brand/update/:id',upload.single('img'),brandController.handleUpdateBrand)
.delete('/brand/delete/:id',brandController.handleDeleteBrand)

module.exports = router;