const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');


router.post('/cart/create',cartController.handleCreateNewCart)
.get('/cart/:id',cartController.handleProductInCartList)
.put('/cart/update',cartController.handleUpdateCart)

module.exports = router;