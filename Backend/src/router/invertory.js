const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const upload = require('../common/upload');

router.get('/inventory',inventoryController.handleGetInventoryList)
.get('/inventory/:id',inventoryController.handleGetInventoryById)
.post('/inventory/create',inventoryController.handleCreateNewInventory)
.put('/inventory/update/:id',inventoryController.handleUpdateInventory)
.delete('/inventory/delete/:id',inventoryController.handleDeleteInventory)

module.exports = router;