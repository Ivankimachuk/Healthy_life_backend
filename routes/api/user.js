const express = require("express");

const path = require('path');
const { authenticate } = require("../../middlewares/authenticate");

const ctrlUser = require("../../controllers/user");
const ctrlFood = require("../../controllers/userFood");
const ctrlWater = require("../../controllers/userWater");
const ctrlStatistics = require("../../controllers/statistics");
const { ctrlWrapper } = require("../../helpers");
const multer = require("multer");


// const { schemas } = require("../../models/user");

const router = express.Router();

 router.get("/current", authenticate, ctrlUser.getCurrent);

 router.put("/update", authenticate, ctrlUser.updateUser);

router.put("/goal", authenticate, ctrlUser.updateGoal);

  router.post("/weight", authenticate, ctrlUser.updateWeight);

 router.post("/food-intake", authenticate, ctrlFood.saveFoodIntake);

 router.put("/food-intake/:id", authenticate, ctrlFood.updateFoodIntake);

 router.delete("/food-intake", authenticate, ctrlFood.deleteFoodIntake);

 router.post("/water-intake", authenticate, ctrlWater.waterIntake);

 router.delete("/water-intake", authenticate, ctrlWater.deleteWaterIntake);

 router.get("/daily-statistics", authenticate, ctrlStatistics.getDaily);

 router.get("/statistics", authenticate, ctrlStatistics.getMonth);


// Функції для завантаження аватара та оновлення інформації користувача
const { uploadAvatar, updateUserInfo } = require("../../controllers/user");

// Збаерігаю аватарки у папці uploads/avatars
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars');
    },
    filename: (req, file, cb) => {
        // Генеруємо унікальне ім"я для файлу

        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const fileExtension = path.extname(file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const name = `${basename}-${uniqueSuffix}${extname}`;
        cb(null, name);
    },
});

// Перевірка типу файлів, що завантажуємо
const fileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};


const upload = multer({ storage, fileFilter });

router.patch("/avatar", authenticate, upload.single("avatarURL"), ctrlWrapper(uploadAvatar));
router.patch("/update", authenticate, ctrlWrapper(updateUserInfo));


module.exports = router;