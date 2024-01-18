const partnerService = require("../service/partnerService");
const path = require('path');
const imgPath = path.join(__dirname,'../public/img/');
const fs = require('fs');
const uploadImage = (req,res) => {
    console.log(req.file)
    res.send("hello")
}

const handleGetPartnerList = async(req,res) => {
    try {
        let partner = await partnerService.getCustomerList();
        console.log(partner)
        return res.send({partner});
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

const handleGetPartnerById = async(req,res) => {
    try {
        const partner = await partnerService.getPartnerById(req.params.id);
        if(partner===null) return res.status(404).send();
        res.send(partner);
    } catch(e) {
        res.status(500).send()
    }
}

const handleCreateNewPartner = async(req,res) => {
    let img =[]
    req.files.forEach((file,index) => {
        img.push(file?.originalname);
    })
    console.log(img)
    req.body.hinh_anh = JSON.stringify(img);

    try {
        const newPartner = await partnerService.createNewPartner(req.body);
        res.send(newPartner);
    } catch(e) {
        res.status(400).send()
    }
}

const handleUpdatePartner = async(req,res) => {
    let id = req.params.id;
    try {
        const partner = await partnerService.getPartnerById(id);
        if(partner===null) return res.status(404).send();
        const updatePartner = await partnerService.updatePartner(id,req.body);
        res.send(updatePartner);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
}

const handleDeletePartner= async(req,res) => {
    let id = req.params.id;
    let imgs=[]
    try {
        const partner = await partnerService.getPartnerById(id);
        if(partner===null) return res.status(404).send();
        imgs=JSON.parse(partner.hinh_anh);
        await partnerService.deletePartner(id);
        imgs.forEach((img,index) => {
            fs.unlinkSync(imgPath+img);
        })
    } catch(e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports = {handleGetPartnerList,uploadImage,handleGetPartnerById,handleCreateNewPartner,handleDeletePartner,handleUpdatePartner};