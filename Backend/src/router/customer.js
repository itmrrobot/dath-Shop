const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const upload = require('../common/upload');

router.get('/customer',customerController.handleGetCustomerList)
.get('/customer/:id',customerController.handleGetCustomerById)
.post('/customer/create',upload.single('img'),customerController.handleCreateNewCustomer)
.post('/customer/upload',upload.single('upload'),customerController.uploadImage)
.put('/customer/update/:id',customerController.handleUpdateCustomer)
.delete('/customer/delete/:id',customerController.handleDeleteCustomer)

module.exports = router;