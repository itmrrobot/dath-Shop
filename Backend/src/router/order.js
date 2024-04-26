const express = require('express');
const router = express.Router();
const upload = require('../common/upload');
const orderController = require('../controllers/orderController');
const {isAdmin} = require('../middleware/verifyRole');

router.get('/order/:id',orderController.handleGetOrderById)
.get('/orders',isAdmin,orderController.handleGetAllOrder)
.get('/orders/:id',orderController.handleGetOrderList)
.post('/order/create',orderController.handleCreateNewOrder)
.put('/order/update/:id',orderController.handleUpdateOrder)
.delete('/order/delete/:id',orderController.handleDeleteOrder)

module.exports = router;