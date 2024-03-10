const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController');

router.post('/paypal/payment',paypalController.handelCreateNewPayment);

router.get('/paypal/payment/success',paypalController.handelGetPaymentSuccess);

router.get('/paypal', (req, res) => res.render('paypal'));

module.exports = router;