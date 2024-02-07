const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');
const { isAdmin } = require('../middleware/verifyRole');


router.post('/auth/register',authController.handleRegister)
.post('/auth/login',authController.handleLogin)
.post('/auth/refresh-token',authController.handleRefreshToken)
.get('/auth/user',verifyToken,userController.handleGetUser)
.get('/auth/all-user',verifyToken,isAdmin,userController.handleGetAllUser)
.put('/auth/user/update/:id',userController.handleUpdateUser)

module.exports = router;