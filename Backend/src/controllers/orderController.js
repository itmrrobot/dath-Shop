const orderService = require("../service/orderService");
const path = require('path');

const handleGetOrderList = async(req,res) => {
    try {
        let order = await orderService.getOrderList();
        console.log(order)
        return res.send({order});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetOrderById = async(req,res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if(order===null) return res.status(404).send();
        res.send(order);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewOrder = async(req,res) => {
    try {
        const newOrder = await orderService.createNewOrder(req.body);
        res.status(201).send(newOrder);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateOrder = async(req,res) => {
    let id = req.params.id;
    try {
        const order = await orderService.getOrderById(id);
        if(order===null) return res.status(404).send();
        const updateOrder = await orderService.updateOrder(id,req.body);
        res.send(updateOrder);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeleteOrder = async(req,res) => {
    let id = req.params.id;
    try {
        const order = await orderService.getOrderById(id);
        if(order===null) return res.status(404).send();
        await orderService.deleteOrder(id);
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleGetOrderList,handleGetOrderById,handleCreateNewOrder,handleDeleteOrder,handleUpdateOrder};