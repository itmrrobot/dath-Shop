const reviewsService = require("../service/reviewsService");
const productsService = require("../service/productsService");

const handleGetReviewList = async(req,res) => {
    const id = req.params.id;
    try {
        const product = await productsService.getProductById(id);
        if(product===null) return res.status(404).send();
        let reviews = await reviewsService.getReviewsByProductId(id);
        return res.send({reviews});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleGetReviewList};