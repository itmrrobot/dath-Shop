const jwt = require('jsonwebtoken');
const {User} = require('../models/index');

const verifyToken = async(req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        console.log(token)
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({where:{ id: decoded.id}})

        if(!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch(e) {
        console.log(e)
        if(e) {

            const isChecked = e instanceof jwt.TokenExpiredError;
            if(!isChecked) return res.status(401).send({err:2,msg:"Token is invalid"})
            else return res.status(401).send({err:1,msg:"Token has expired"})
        }
    }
}

module.exports = {verifyToken}