const reviewsService = require("../service/reviewsService");
const productsService = require("../service/productsService");

const handleGetReviewList = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productsService.getProductById(id);
    if (product === null) return res.status(404).send();
    let reviews = await reviewsService.getReviewsByProductId(id);
    return res.send({ reviews });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

const handleCreateReviews = async (req, res) => {
  try {
    const newReviews = await reviewsService.createReviews(req.body,req.files);
    res.send(newReviews);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { handleGetReviewList, handleCreateReviews };
