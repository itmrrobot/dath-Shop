const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const upload = require('../common/upload');

router.get('/partner',partnerController.handleGetPartnerList)
.get('/partner/:id',partnerController.handleGetPartnerById)
.post('/partner/create',upload.single('img'),partnerController.handleCreateNewPartner)
.post('/partner/upload',upload.single('upload'),partnerController.uploadImage)
.put('/partner/update/:id',partnerController.handleUpdatePartner)
.delete('/partner/delete/:id',partnerController.handleDeletePartner)

module.exports = router;