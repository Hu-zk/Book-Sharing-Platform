const User = require("../models/user.model")

const getAllUsers = async (req, res)=>{
    const users = await User.find();
    res.send(users)
}

const getProfile = async (req, res)=>{
    const user = await User.findById(req.user._id)
    res.send(user)
}

module.exports = {getAllUsers, getProfile}