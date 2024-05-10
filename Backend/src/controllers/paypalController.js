const paypalService = require('../service/paypalService');

const handelCreateNewPayment = async(req,res) => {
    await paypalService.createPayment(req,res);
}

const handelGetPaymentSuccess = async(req,res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    await paypalService.getPaymentSuccess(payerId,paymentId,res);
}

module.exports = {handelCreateNewPayment,handelGetPaymentSuccess};