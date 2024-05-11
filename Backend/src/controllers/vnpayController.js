const vnpayService = require('../service/vnpayService');

const handelCreateNewPayment = async(req,res) => {
    await vnpayService.createPayment(req,res);
}

const handelGetPaymentSuccess = async(req,res) => {
    await vnpayService.getPaymentSuccess(res);
}

const handleGetVnpayIPN = async(req,res) => {
    await vnpayService.getVnpayIPN(req,res);
}

module.exports = {handelCreateNewPayment,handelGetPaymentSuccess,handleGetVnpayIPN};