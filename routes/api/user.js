const express = require("express");

const { authenticate } = require("../../middlewares");

const ctrlUser = require("../../controllers/user");
const ctrlFood = require("../../controllers/userFood");
const ctrlWater = require("../../controllers/userWater");
const ctrlStatistics = require("../../controllers/statistics");

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

module.exports = router;
