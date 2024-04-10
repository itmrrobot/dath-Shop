const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.post('/cart/create',cartController.handleCreateNewCart)
.get('/cart/:id',cartController.handleProductInCartList)
.put('/cart/update',cartController.handleUpdateCart)
// Xoá tất cả
.delete('/cart/delete/:id',cartController.handleDeleteCart)
// Xoá từng sản phẩm và xoá tát cả
.post('/cart/delete/product/:id',cartController.handleDeleteProductInCart)

module.exports = router;