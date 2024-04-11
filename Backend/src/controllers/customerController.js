const customerService = require("../service/customerService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');

const handleGetCustomerList = async(req,res) => {
    try {
        let customer = await customerService.getCustomerList();
        console.log(customer)
        return res.send({customer});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetCustomerById = async(req,res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        if(customer===null) return res.status(404).send();
        res.send(customer);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewCustomer = async(req,res) => {
    let img =[]
    req.files.forEach((file,index) => {
        img.push(file?.originalname);
    })
    console.log(img)
    req.body.img = JSON.stringify(img);

    try {
        const newCategory = await customerService.createNewCustomer(req.body);
        res.send(newCategory);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdateCustomer = async(req,res) => {
    let id = req.params.id;
    try {
        const customer = await customerService.getCustomerById(id);
        if(customer===null) return res.status(404).send();
        const updateCustomer = await customerService.updateCustomer(id,req.body);
        res.send(updateCustomer);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeleteCustomer = async(req,res) => {
    let id = req.params.id;
    let imgs=[]
    try {
        const customer = await customerService.getCustomerById(id);
        if(customer===null) return res.status(404).send();
        imgs=JSON.parse(customer.img);
        await customerService.deleteCustomer(id);
        imgs.forEach((img,index) => {
            fs.unlinkSync(imgPath+img);
        })
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleGetCustomerList,handleGetCustomerById,handleCreateNewCustomer,handleDeleteCustomer,handleUpdateCustomer};