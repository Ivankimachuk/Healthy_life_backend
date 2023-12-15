const express = require("express");

const userRouter = express.Router();

const ctrl = require("../../controllers/foodintake");

 /* const { validateBody, isValidId, authenticate } = require("../../middlewares"); */

/* const { FoodIntakeSchema} = require("../../models/food-intake"); */


userRouter.post("/food-intake", ctrl.addFoodIntake);

userRouter.put("/food-intake/:id", ctrl.updateFood);



userRouter.delete("/food-intake/:id", ctrl.removeFood); 

module.exports = userRouter;