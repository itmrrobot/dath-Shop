const inventoryService = require("../service/inventoryService");
const path = require('path');

const handleGetInventoryList = async(req,res) => {
    try {
        let inventory = await inventoryService.getOrderList();
        console.log(order)
        return res.send({inventory});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetInventoryById = async(req,res) => {
    try {
        const inventory = await inventoryService.getOrderById(req.params.id);
        if(inventory===null) return res.status(404).send();
        res.send(inventory);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewInventory = async(req,res) => {
    try {
        const newinventory = await inventoryService.createNewInventory(req.body);
        res.status(201).send(newinventory);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateInventory = async(req,res) => {
    let id = req.params.id;
    try {
        //const inventory = await inventoryService.getOrderById(id);
        //if(inventory===null) return res.status(404).send();
        const updateOrder = await inventoryService.updateInventory(id,req.body);
        res.send(updateOrder);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeleteInventory= async(req,res) => {
    let id = req.params.id;
    try {
        const inventory = await inventoryService.getOrderById(id);
        if(inventory===null) return res.status(404).send();
        await inventoryService.deleteOrder(id);
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleGetInventoryList,handleGetInventoryById,handleCreateNewInventory,handleUpdateInventory,handleDeleteInventory};