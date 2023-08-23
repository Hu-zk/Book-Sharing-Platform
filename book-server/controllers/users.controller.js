const User = require("../models/user.model")

const toggleFollow = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.userId;

    try {
        const userToFollow = await User.findById(userId);
    
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found.' });
        }
    
        if (userToFollow.following.includes(currentUserId)) {
            userToFollow.following.pull(currentUserId);
            await userToFollow.save();
            res.status(200).json({ message: 'UnFollow successfully.' });
        } else {
            userToFollow.following.push(currentUserId);
            await userToFollow.save();
            res.status(200).json({ message: 'Follow successfully.' });
        }
    } catch (error) {
    res.status(500).json({ message: 'An error occurred while toggling follow status.' });
    }
};

module.exports = {toggleFollow}