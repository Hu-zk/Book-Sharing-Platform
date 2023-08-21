const User = require("../models/users.model")

const getStays = async(req, res) => {
     const {id} = req.params
   
     const stays = [];
     const users = await User.find();
     users.forEach(user=>{
          stays.push(...user.stays)
     })

     if(!id) return res.send(stays)

     const stay = stays.find(stay=> stay._id === id)
     return res.send(stay)
}

const getMyStays = async (req, res)=> {
     const user = await User.findById(req.user._id);

     res.send(user.stays)
}

module.exports = {getMyStays, getStays}