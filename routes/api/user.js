const express = require("express");
// const path = require("path");
const { authenticate, validateBody } = require("../../middlewares");
const { userUpdateInfo } = require("../../controllers/userUpdateInfo");

const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrlFood = require("../../controllers/userFood");
const ctrlWater = require("../../controllers/userWater");
const ctrlStatistics = require("../../controllers/statistics");

const ctrlUserCurrent = require("../../controllers/userCurrent");
const { schemasWater } = require("../../models/waterIntakeSchema");
const ctrlUserWeight = require("../../controllers/userWeight");
const ctrlUserGoal = require("../../controllers/userGoal");
const { schemas } = require("../../models/user");
const router = express.Router();

router.get("/current", authenticate, ctrlUserCurrent.getCurrentUser);

router.put("/update", authenticate, ctrlWrapper(userUpdateInfo));

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

// router.put("/update",
//   authenticate,
//   upload.single("avatar"),
//   ctrlWrapper(uploadAvatar)
// );

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

router.get(
  "/statistics",
  authenticate,
  validateBody(schemas.userStatistics),
  ctrlStatistics.getStatistics
);

module.exports = router;
