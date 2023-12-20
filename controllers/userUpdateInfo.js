// const fs = require("fs/promises");
const { HttpError, ctrlWrapper} = require("../helpers");
const { User } = require("../models/user");
const path = require("path");
const multer = require("multer");
// import { v2 as coudinary } from 'cloudinary';

// const {
//     name,
//     email,
//     password,
//     goal,
//     gender,
//     age,
//     height,
//     weight,
//     activityLevel,
//   } = req.body;

// const cloudinary = require("cloudinary").v2;
// const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

// cloudinary.config({
//   cloud_name: CLOUD_NAME,
//   api_key: CLOUD_API_KEY,
//   api_secret: CLOUD_API_SECRET,
//   secure: true,
// })

// const uploadCloud = (pathFile) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       pathFile,
//       {
//         folder: "Avatars",
//         transformation: { width: 250, crop: "fit", angle: 0, auto: true },
//       },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         }
//         if (result) {
//           resolve(result);
//         }
//       }
//     );
//   });
// };

// async function uploadAvatar(req, res, next) {
//   try {
//     const { _id: id } = req.user;
//   const { file } = req;

//   if (!file) {
//     next(HttpError(500, "Problem with upload avatar"));
//   }
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: "Avatars",
//       transformation: { width: 250, crop: "fit", angle: 0, auto: true },
//   });
  
//     const { secure_url: avatarURL, public_id: idCloudAvatar } = result;
        
//     const { idCloudAvatar: oldAvatarId } = await User.findById(id).exec();
//     if (oldAvatarId) {
//       await cloudinary.uploader.destroy(oldAvatarId);    
//     }

//     const updateUser = await User.findByIdAndUpdate(
//       id,
//       { avatarURL, idCloudAvatar },
//       { new: true, select: "-token -password" }
//     );

//     if (!updateUser) {
//       throw new Error("User not found");
//     }

//     await fs.unlink(file.path);

//     res.json({
//       user: updateUser,
//       avatarURL,
//     });
//   } catch (error) {
//     res.status(error.status || 500).json({ message: error.message });
//   }
// }


// Зберігаю аватарки у папці uploads/avatars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req, file, cb) => {
    // Генеруємо унікальне ім"я для файлу
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name = `${basename}-${uniqueSuffix}${extname}`;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });


const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      throw HttpError(400, "No file uploaded");
    }

    const avatarURL = req.file.filename;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw HttpError(400, "User not found");
    }

    if (user.avatarUrl === avatarURL) {
      throw HttpError(400, "This avatar is already in use");
    }
    
    const avatarExists = await User.findOne({ avatarUrl: avatarURL });
    if (avatarExists) {
      throw HttpError(400, "This avatar is already in use");
    }

    user.avatarUrl = avatarURL;
    await user.save();


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: avatarURL },
      { new: true }
    );

    if (!updatedUser) {
      throw HttpError(404, "User not found");
    }

    res.json({
      user: {
      name: updatedUser.name,
      email: updatedUser.email,
      goal: updatedUser.goal,
      gender: updatedUser.gender,
      age: updatedUser.age,
      height: updatedUser.height,
      weight: updatedUser.weight,
      activityLevel: updatedUser.activityLevel,
      avatar: updatedUser.avatarUrl,
      waterRate: updatedUser.waterRate,
      BMRRate: updatedUser.BMRRate,
      proteinRate: updatedUser.proteinRate,
      fatRate: updatedUser.fatRate,
      carbsRate: updatedUser.carbsRate,
    },
    }
      
    );
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// const userUpdateInfo = async (req, res) => {
//   try {
//     const { userInfo: newUserInfo } = req.body;
//     const userId = req.user._id;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       newUserInfo,
//       { new: true }
//     ). select('-token -password');

//     if (!updatedUser) {
//       throw HttpError(404, "User not found");
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  // cloudinary,
  upload,
  uploadAvatar: ctrlWrapper(uploadAvatar),
  // userUpdateInfo: ctrlWrapper(userUpdateInfo),
};
