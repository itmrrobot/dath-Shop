const paypal = require("paypal-rest-sdk");
const cartService = require("./cartService");
const inventoryService = require("./inventoryService");
const orderService = require("./orderService");
var totals,order,cartIds,inventorys;

paypal.configure({
  mode: process.env.PAYPAL_MODE, //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL__CLIENT_SECRET,
});

const createPayment = (req, res) => {
  const { total, item_list } = req.body;
  order = req.body?.order;
  cartIds = req.body?.product.map((p) => p.cart_id);
  inventorys = req.body?.product.map((p) => p.Inventories);
  totals = total;
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:4000/paypal/payment/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: item_list,
        amount: {
          currency: "USD",
          total: total,
        },
        description: "Iphone 4S cũ giá siêu rẻ",
      },
    ],
  };

  paypal.payment.create(create_payment_json, async function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
            
          res.json({ forwardLink: payment.links[i].href });
        }
      }
    }
  });
};

const getPaymentSuccess = async (payerId, paymentId, res) => {
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totals,
        },
      },
    ],
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        await orderService.createNewOrder({ ...order, status: 2 });
          cartIds?.forEach(async (id) => {
            await cartService.deleteCard(id);
          });
          await inventoryService.updateInventory("", {
            listInventory: inventorys,
          });
        res.redirect("http://localhost:3000/paypal/payment/success");
      }
    }
  );
};

module.exports = { createPayment, getPaymentSuccess };
