const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');


router.get('/reviews/:id',reviewsController.handleGetReviewList)
.post('/reviews/create',reviewsController.handleCreateReviews)

module.exports = router;