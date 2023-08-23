const User = require("../models/user.model")

const getAllUsers = async (req, res)=>{
    const users = await User.find();
    res.send(users)
}

const getProfile = async (req, res)=>{
    const user = await User.findById(req.user._id)
    res.send(user)
}

const toggleFollow = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.userId;

    try {
        const userToFollow = await User.findById(userId);
    
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found.' });
        }
    
        if (userToFollow.followers.includes(currentUserId)) {
            userToFollow.followers.pull(currentUserId);
        } else {
            userToFollow.followers.push(currentUserId);
        }

        await userToFollow.save();

        res.status(200).json({ message: 'Follow status toggled successfully.' });
    } catch (error) {
    res.status(500).json({ message: 'An error occurred while toggling follow status.' });
    }
};

module.exports = {getAllUsers,toggleFollow, getProfile}