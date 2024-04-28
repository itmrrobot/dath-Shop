const express = require('express');
const router = express.Router();
const returnsController = require('../controllers/returnsController');
const {uploadImgVideo} = require('../common/upload');
const { verifyToken } = require('../middleware/verifyToken');
const { isAdmin } = require('../middleware/verifyRole');

router.get('/list/returns/:id',returnsController.handleGetReturnsList)
.get('/returns/:id',returnsController.handleGetReturnsById)
.get('/returns',verifyToken,isAdmin,returnsController.handleGetAllReturns)
.post('/create/returns/',uploadImgVideo.array('imgVideo',5),returnsController.handleCreateReturns)
.put('/returns/update/:id',verifyToken,isAdmin,returnsController.handleUpdateReturns)

module.exports = router;