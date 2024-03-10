const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");
require("dotenv").config();
const connection = require("./common/connection");
const cors = require("cors");
const paymentRouter = require("./router/payment");
const productsRouter = require("./router/products");
const categoryRouter = require("./router/category");
const orderRouter = require("./router/order");
const customerRouter = require("./router/customer");
const authRouter = require("./router/users");
const cartRouter = require("./router/cart");
const wishlistRouter = require("./router/wishlist");
const paypalRouter = require("./router/paypalPayment");


const app = express();
const port = process.env.PORT || 8888;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('img'));
app.use(paymentRouter);
app.use(productsRouter);
app.use(categoryRouter);
app.use(orderRouter);
app.use(customerRouter);
app.use(authRouter);
app.use(cartRouter);
app.use(wishlistRouter);
app.use(paypalRouter);
app.use(cors());
connection();
app.listen(port,() => {
    console.log(`Server start on port ${port}`);
});