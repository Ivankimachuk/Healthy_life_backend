const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");


const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            throw HttpError(400, "No file uploaded");
        }

        const avatarURL = req.file.path;
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(userId, { avatarUrl: avatarURL }, { new: true });
        
        if (!updatedUser) {
            throw HttpError(404, "User not found");
        }

        res.json({ avatarUrl: updatedUser.avatarUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Функція для оновлення інформації користувача 
const updateUserInfo = async (req, res) => {
    try {
        const { name, age, height, weight, activity } = req.body;
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, age, height, weight, activity },
            { new: true }
        );

        if (!updatedUser) {
          throw HttpError(404, "User not found");
        }

        res.json(updatedUser) 
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports = {
    uploadAvatar: ctrlWrapper(uploadAvatar),
    updateUserInfo: ctrlWrapper(updateUserInfo),
};
