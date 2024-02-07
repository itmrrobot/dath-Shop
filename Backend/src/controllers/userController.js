const userService = require('../service/userService');

const handleGetUser = async(req,res) => {
    console.log(req.user);
    try {
        const user = await userService.getCurrentUser(req.user.id);
        if(user===null) return res.status(404).send();
        res.send(req.user);
    } catch(e) {
        console.log(e);
    }
}

const handleGetAllUser = async(req,res) => {
    try {
        const user = await userService.getAllUser();
        return res.send(user);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

const handleUpdateUser = async(req,res) => {
    try {
        const user = await userService.updateUser(req.params.id,req.body);
        res.send(user);
    } catch(e) {
        console.log(e);
    }
}

module.exports = {handleGetUser,handleUpdateUser,handleGetAllUser};