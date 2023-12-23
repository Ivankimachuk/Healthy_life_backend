const express = require("express");
const { authenticate, validateBody } = require("../../middlewares");
const { userUpdateInfo } = require("../../controllers/userUpdateInfo");
const { upload } = require("../../middlewares/uploadFile");

const ctrlFood = require("../../controllers/userFood");
const ctrlWater = require("../../controllers/userWater");
const ctrlStatistics = require("../../controllers/userStatistics");

const ctrlUserCurrent = require("../../controllers/userCurrent");
const { schemasWater } = require("../../models/waterIntakeSchema");
const ctrlUserWeight = require("../../controllers/userWeight");
const ctrlUserGoal = require("../../controllers/userGoal");
const { schemas } = require("../../models/user");
const router = express.Router();
const { ProductJoiSchema, FoodJoiSchema } = require("../../models/food");
router.get("/current", authenticate, ctrlUserCurrent.getCurrentUser);

router.put(
  "/update",
  authenticate,
  upload.single("avatar"),
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
router.post(
  "/food-intake",
  authenticate,
  validateBody(ProductJoiSchema),
  ctrlFood.saveFoodIntake
);

router.put(
  "/food-intake/:id",
  authenticate,
  validateBody(ProductJoiSchema),
  ctrlFood.updateFoodIntake
);
router.get(
  "/food-intake",
  authenticate,
  ctrlFood.getAll
);


router.delete(
  "/food-intake",
  authenticate,
  validateBody(FoodJoiSchema),
  ctrlFood.deleteFoodIntake
);

router.get(
  "/water-intake",
  authenticate,
  ctrlWater.getWaterIntake
);
    

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

router.get("/statistics", authenticate, ctrlStatistics.getStatistics);

module.exports = router;
