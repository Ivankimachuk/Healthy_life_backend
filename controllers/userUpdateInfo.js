const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");
const {
  calculateBMR,
  calculateWaterRate,
  calculateMacros,
} = require("../user-datails/calculateMacros"); 
const { upload } = require('../middlewares/uploadFile');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  use_filename: true,
  unique_filename: false,
  overwrite: true,
})


const userUpdateInfo = async (req, res, next) => {
  
    try {
      const formData = req.body;
      const { _id } = req.user;
      const avatarData = req.file;
    
      const user = await User.findById(_id);
      if (!user) {
        throw new HttpError(404, "User not found");
      }

      if (req.file) {
      const avatarURL = avatarData.path;
      if (user.avatarUrl !== avatarURL) {
        const avatar = await cloudinary.uploader.upload(avatarURL)
        user.avatarUrl = avatar.secure_url;
      }
    }

    Object.keys(formData).forEach((field) => {
        if (field !== 'avatar') {
          user[field] = formData[field];
        }
    });

        // if (formData.avatar) {
        //   user.avatarUrl = req.file.filename;
        // }

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

        res.status(200).json(updatedUserData);
    
      } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ message: error.message });
      }
    };
  
    

module.exports = {
         userUpdateInfo: ctrlWrapper(userUpdateInfo),
    };
