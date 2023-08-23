const User = require("../models/user.model")

const toggleFollow = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.userId;

    try {
        const userToFollow = await User.findById(userId);
        const userToFollowId = userToFollow._id
        console.log(userToFollowId)
        const currentUser = await User.findById(currentUserId);
    
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found.' });
        }
    
        if (currentUser.following.includes(userToFollowId)) {
            currentUser.following.pull(userToFollowId);
            await currentUser.save();
            res.status(200).json({ message: 'UnFollow successfully.' });
        } else {
            currentUser.following.push(userToFollowId);
            await currentUser.save();
            res.status(200).json({ message: 'Follow successfully.' });
        }
    } catch (error) {
    res.status(500).json({ message: 'An error occurred while toggling follow status.' });
    }
};

module.exports = {toggleFollow}