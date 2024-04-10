const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');


router.post('/wishlist/create',wishlistController.handleCreateNewWishList)
.get('/wishlist/:id',wishlistController.handleProductInWishList)
.put('/wishlist/update',wishlistController.handleUpdateWishList)
.delete('/wishlist/delete/:id',wishlistController.handleDeleteWishList)

module.exports = router;