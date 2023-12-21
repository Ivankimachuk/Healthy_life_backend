// const fs = require("fs/promises");
const { HttpError, ctrlWrapper} = require("../helpers");
const { User } = require("../models/user");

const {
  calculateBMR,
  calculateWaterRate,
  calculateMacros,
} = require("../user-datails/calculateMacros"); 
// import { v2 as coudinary } from 'cloudinary';


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


const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      throw new HttpError(400, "No file uploaded");
    }

    const avatarURL = req.file.filename;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError(400, "User not found");
    }

    if (user.avatarUrl === avatarURL) {
      throw new HttpError(400, "This avatar is already in use");
    }
    
    const avatarExists = await User.findOne({ avatarUrl: avatarURL });
    if (avatarExists) {
      throw new HttpError(400, "This avatar is already in use");
    }

    user.avatarUrl = avatarURL;
    await user.save();

    const updatedUserData = {
      name: user.name,
      gender: user.gender,
      age: user.age,
      height: user.height,
      weight: user.weight,
      activityLevel: user.activityLevel,
      avatar: user.avatarUrl, 
      waterRate: user.waterRate,
      BMRRate: user.BMRRate,
      proteinRate: user.proteinRate,
      fatRate: user.fatRate,
      carbsRate: user.carbsRate,
    };

    res.json(updatedUserData);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


const userUpdateInfo = async (req, res) => {
  
  const { name, gender, weight, height, age, activityLevel, avatarUrl, goal } = req.body;
  const { _id } = req.user;
  // const updateFields = req.body;
  
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    Object.keys(req.body).forEach((field) => {
      user[field] = req.body[field];
    });

    const newBMR = calculateBMR(user.gender, user.weight, user.height, user.age);
    const newWaterRate = calculateWaterRate(user.weight, user.activityLevel);
    const { protein, fat, carbs } = calculateMacros(newBMR, user.goal);

    user.waterRate = newWaterRate;
    user.BMRRate = newBMR;
    user.proteinRate = protein;
    user.fatRate = fat;
    user.carbsRate = carbs;

    await user.save();

    const updatedUserData = {
      name: user.name,
      gender: user.gender,
      age: user.age,
      height: user.height,
      weight: user.weight,
      activityLevel: user.activityLevel,
      avatar: user.avatarUrl, 
      waterRate: user.waterRate,
      BMRRate: user.BMRRate,
      proteinRate: user.proteinRate,
      fatRate: user.fatRate,
      carbsRate: user.carbsRate,
    };

    res.json(updatedUserData);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
    module.exports = {
      uploadAvatar: ctrlWrapper(uploadAvatar),
      userUpdateInfo: ctrlWrapper(userUpdateInfo),
    };
