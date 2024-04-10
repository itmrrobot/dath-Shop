const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');


router.get('/reviews/:id',reviewsController.handleGetReviewList)

module.exports = router;