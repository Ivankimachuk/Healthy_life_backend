const express = require("express");
const path = require("path");
const { authenticate, validateBody } = require("../../middlewares");
const { userUpdateInfo } = require("../../controllers/userUpdateInfo");
// const fs = require("fs/promises");

// const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrlFood = require("../../controllers/userFood");
const ctrlWater = require("../../controllers/userWater");
const ctrlStatistics = require("../../controllers/statistics");

const ctrlUserCurrent = require("../../controllers/userCurrent");
const { schemasWater } = require("../../models/waterIntakeSchema");
const ctrlUserWeight = require("../../controllers/userWeight");
const ctrlUserGoal = require("../../controllers/userGoal");
const { schemas } = require("../../models/user");
const router = express.Router();
const multer = require('multer');
// const ctrl = require("../../controllers/userAvatar");
// const upload = require("../../middlewares/uploadCloude");



//Зберігаю аватарки у папці uploads/avatars
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars');
    },
filename: (req, file, cb) => {
  cb(null, file.originalname);
    // Генеруємо унікальне ім"я для файлу
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name = `${basename}-${uniqueSuffix}${extname}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File is not a picture'), false);
  }
};

const upload = multer({ storage: storage, fileFiletr: fileFilter });

router.put('/api/user/update', upload.single('avatar'), (req, res) => {
  const userInfo = req.body;
  const avatarFile = req.file;

  res.status(200).json({ message: 'User data and photo are updated successfully.' });
});
  

// const upload = multer({ storage: storage }).fields([
//   { name: "name" },
//   { name: "gender" },
//   { name: "age" },
//   { name: "height" },
//   { name: "weight" },
//   { name: "activityLevel" },
//   // { name: "avatar", maxCount: 1 },
// ]);

router.get("/current", authenticate, ctrlUserCurrent.getCurrentUser);

router.put(
  "/update",
  authenticate,
//   upload,
  validateBody(schemas.updateUserSchema),
  userUpdateInfo
);


router.put(
  "/goal",
  authenticate,
  validateBody(schemas.goalUpdateUser),
  ctrlUserGoal.changeGoal
);

router.post(
  "/weight",
  authenticate,
  validateBody(schemas.weightUpdateUser),
  ctrlUserWeight.updateWeight
);

router.put("/update",
  authenticate,
  // upload.single("avatar"),
  // ctrlWrapper(uploadAvatar)
);

// router.patch("/update", authenticate, ctrlWrapper(updateUserInfo));

router.post("/food-intake", authenticate, ctrlFood.saveFoodIntake);

router.put("/food-intake/:id", authenticate, ctrlFood.updateFoodIntake);

router.delete("/food-intake", authenticate, ctrlFood.deleteFoodIntake);

router.post(
  "/water-intake",
  authenticate,
  validateBody(schemasWater.addWater),
  ctrlWater.addWaterIntake
);

router.delete(
  "/water-intake",
  authenticate,
  validateBody(schemasWater.deleteWater),
  ctrlWater.deleteByIdWater
);

// router.get("/daily-statistics", authenticate, ctrlStatistics.getDaily);

// router.post('/user', authenticate, upload.single('avatar'), ctrl.someFunc);

router.get(
  "/statistics",
  authenticate,
  validateBody(schemas.userStatistics),
  ctrlStatistics.getStatistics
);

module.exports = router;
