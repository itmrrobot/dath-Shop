const { Reviews } = require("../models/index"); 

const getReviewsByProductId = async(id) => {
    const reviewsList = await Reviews.findAll({where:{id_product:id}})
    return reviewsList;
}

module.exports = {getReviewsByProductId};