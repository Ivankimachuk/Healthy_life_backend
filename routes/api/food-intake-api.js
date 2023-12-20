const express = require("express");

const router = express.Router();

const ctrlFood = require("../../controllers/userFood");

 /* const { validateBody, isValidId, authenticate } = require("../../middlewares"); */

/* const { FoodIntakeSchema} = require("../../models/food-intake"); */


router.post("/food-intake", ctrlFood.saveFoodIntake);
router.put("/food-intake/:id", ctrlFood.updateFoodIntake);


router.delete("/food-intake", ctrlFood.deleteFoodIntake); 

module.exports = router;