const orderDetailService = require("../service/orderDetailService");

const handleUpdateOrderDetail = async(req,res) => {
    let id = req.params.id;
    try {
        const updateOrder = await orderDetailService.updateOrderDetail({id,data:req.body});
        res.send(updateOrder);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

module.exports = {handleUpdateOrderDetail};