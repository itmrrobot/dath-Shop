const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

router
.put('/order-detail/update/:id',orderDetailController.handleUpdateOrderDetail)

module.exports = router;