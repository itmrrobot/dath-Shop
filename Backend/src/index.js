const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");
require("dotenv").config();
const connection = require("./common/connection");
const cors = require("cors");
const paymentRouter = require("./router/payment");
const productsRouter = require("./router/products");
const categoryRouter = require("./router/category");
const brandRouter = require("./router/brand");
const orderRouter = require("./router/order");
const retunrsRouter = require("./router/returns");
const customerRouter = require("./router/customer");
const authRouter = require("./router/users");
const cartRouter = require("./router/cart");
const wishlistRouter = require("./router/wishlist");
const paypalRouter = require("./router/paypalPayment");
const inventoryRouter = require("./router/invertory");
const chatbotRouter = require("./router/chatbot");
const reviewsRouter = require("./router/reviews");
const orderDetailRouter = require("./router/orderDetail");
const recommendRouter = require("./router/recommend");
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const session = require('express-session');
const {User} = require('./models/index');
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 8888;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', true);


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    exposedHeaders: "X-Total-Count"
}
app.use(cors(corsOptions));

// setup session
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new OAuth2Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"https://backend-datn-production.up.railway.app/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await User.findOne({where:{email:profile.emails[0].value}});
            
            if(!user){
                user = await User.create({
                    id:Number(profile.id.slice(0,5)),
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    avatar:profile.photos[0].value
                });
            }
            return done(null,user)

        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('img'));
app.use(paymentRouter);
app.use(productsRouter);
app.use(categoryRouter);
app.use(brandRouter);
app.use(orderRouter);
app.use(customerRouter);
app.use(authRouter);
app.use(cartRouter);
app.use(wishlistRouter);
app.use(paypalRouter);
app.use(inventoryRouter);
app.use(chatbotRouter);
app.use(reviewsRouter);
app.use(retunrsRouter);
app.use(orderDetailRouter);
app.use(recommendRouter);
app.use(cors());
connection();
app.listen(port,() => {
    console.log(`Server start on port ${port}`);
});