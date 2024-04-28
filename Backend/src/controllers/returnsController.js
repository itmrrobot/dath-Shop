const returnsService = require('../service/returnsService');

const handleGetReturnsList = async(req,res) => {
    try {
        const returnsList = await returnsService.getReturnsList(req.params.id);
        return res.status(200).send(returnsList);
    } catch(e) {
        res.status(500).send();
    }
}

const handleGetReturnsById = async(req,res) => {
    try {
        const returns = await returnsService.getReturnsById(req.params.id);
        if(returns===null) return res.status(404).send();
        return res.status(200).send(returns);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

const handleGetAllReturns = async(req,res) => {
    try {
        const returns = await returnsService.getAllReturns();
        return res.status(200).send(returns);
    } catch(e) {
        res.status(500).send();
    }
}

const handleCreateReturns = async(req,res) => {
    try {
        const returns = await returnsService.createReturns(req.body,req.files);
        return res.status(200).send(returns);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleUpdateReturns = async(req,res) => {
    try {
        const returns = await returnsService.updateReturns(req.params.id,req.body);
        return res.status(200).send(returns);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

module.exports = {handleGetReturnsList,handleGetReturnsById,handleCreateReturns,handleGetAllReturns,handleUpdateReturns};