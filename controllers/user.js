const { HttpError, ctrlWrapper} = require("../helpers");
const { User } = require("../models/user");
// const path = require("path");
// const multer = require("multer");
const {
  calculateBMR,
  calculateWaterRate,
  calculateMacros,
} = require("../user-datails/calculateMacros"); 


// Зберігаю аватарки у папці uploads/avatars
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/avatars");
//   },
//   filename: (req, file, cb) => {
//     // Генеруємо унікальне ім"я для файлу
//     const extname = path.extname(file.originalname);
//     const basename = path.basename(file.originalname, extname);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const name = `${basename}-${uniqueSuffix}${extname}`;
//     cb(null, name);
//   },
// });

// const upload = multer({ storage: storage });


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

    res.json({ user });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


const userUpdateInfo = async (req, res) => {
  const { _id } = req.user;
//   const { name, gender, weight, height, age, activityLevel, avatarUrl, goal } = req.body;
  
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new HttpError(404, "User not found");
    }
      
      const updateFields = {
          ...req.body,
          avatarUrl: req.file ? req.file.filename : user.avatarUrl
      };

      Object.assign(user, updateFields);

    const newBMR = calculateBMR(user.gender, user.weight, user.height, user.age);
    const newWaterRate = calculateWaterRate(user.weight, user.activityLevel);
    const { protein, fat, carbs } = calculateMacros(newBMR, user.goal);

    user.waterRate = newWaterRate;
    user.BMRRate = newBMR;
    user.proteinRate = protein;
    user.fatRate = fat;
    user.carbsRate = carbs;

    await user.save();

    const filteredUserData = {
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

    res.json(filteredUserData);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
    module.exports = {
      uploadAvatar: ctrlWrapper(uploadAvatar),
      userUpdateInfo: ctrlWrapper(userUpdateInfo),
    };