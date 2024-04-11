const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const {uploadImgVideo} = require('../common/upload');


router.get('/reviews/:id',reviewsController.handleGetReviewList)
.post('/reviews/create',uploadImgVideo.array('img_and_video',10),reviewsController.handleCreateReviews)

module.exports = router;