const isAdmin = (req,res,next) => {
    const {RoleId} = req.user;
    if(RoleId!==1) return res.status(401).send({err:"You are not admin to allow"});
    next();
}

module.exports = {isAdmin};