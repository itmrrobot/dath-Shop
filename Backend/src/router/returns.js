const express = require('express');
const router = express.Router();
const returnsController = require('../controllers/returnsController');
const {upload} = require('../common/upload');

router.get('/list/returns/:id',returnsController.handleGetReturnsList)
.get('/returns/:id',returnsController.handleGetReturnsById)
.post('/create/returns/',returnsController.handleCreateReturns)

module.exports = router;