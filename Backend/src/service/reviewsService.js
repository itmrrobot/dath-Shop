const { Reviews } = require("../models/index"); 

const getReviewsByProductId = async(id) => {
    const reviewsList = await Reviews.findAll({where:{id_product:id}})
    return reviewsList;
}

const createReviews = async(data) => {
    try {
        const reviews = await Reviews.create(data);
        return reviews;
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
}

module.exports = {getReviewsByProductId,createReviews};