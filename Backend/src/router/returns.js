const express = require('express');
const router = express.Router();
const returnsController = require('../controllers/returnsController');
const {uploadImgVideo} = require('../common/upload');

router.get('/list/returns/:id',returnsController.handleGetReturnsList)
.get('/returns/:id',returnsController.handleGetReturnsById)
.post('/create/returns/',uploadImgVideo.array('imgVideo',5),returnsController.handleCreateReturns)

module.exports = router;