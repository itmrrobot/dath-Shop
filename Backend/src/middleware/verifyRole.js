const isAdmin = (req,res,next) => {
    const {roleId} = req.user;
    if(roleId!==1) return res.status(401).send({err:"You are not admin to allow"});
    next();
}

module.exports = {isAdmin};