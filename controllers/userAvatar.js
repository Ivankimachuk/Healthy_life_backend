// const { ctrlWrapper } = require("../helpers");
// const { User } = require("../models/user"); 

// const someFunc = async (req, res) => {
//     const avatarURL = req.file.path;

//     const updateAvatarUser = await User.findByIdAndUpdate(
//         req.user._id,
//         { avatarUrl: avatarURL },
//         { new: true }
//     )

    
//     res.json({ updateAvatarUser });
//  };   
//     module.exports = { someFunc: ctrlWrapper(someFunc) }; 