const recommendService = require("../service/recommendService");

const handleRecommmendKeyWordProduct = async(req,res) => {
    try {
        const recommendList = await recommendService.getRecommendListProduct(req.body.search);
        if(recommendList?.recommendations.length===0||recommendList===null) return res.status(404).send([]);
        return res.status(200).send(recommendList);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {handleRecommmendKeyWordProduct};