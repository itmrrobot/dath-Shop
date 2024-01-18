const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');


router.post('/auth/register',authController.handleRegister)
.post('/auth/login',authController.handleLogin)
.post('/auth/refresh-token',authController.handleRefreshToken)
.get('/auth/user',verifyToken,userController.handleGetUser)
.put('/auth/user/update/:id',userController.handleUpdateUser)

module.exports = router;