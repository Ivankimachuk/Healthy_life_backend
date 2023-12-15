const { HttpError } = require("../helpers/index");

/* const Joi = require('joi') */

const { FoodIntake } = require("../models/food");









const addFoodIntake = async (req, res, next) => {
    try {
      
        const { id, date, totalCalories } = req.params;


        const result = await FoodIntake.create(id, date, totalCalories);

        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

const removeFood = async (req, res) => {
    const { id } = req.params;
    const result = await FoodIntake.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateFood = async (req, res) => {
    const { id } = req.params;
    const result = await FoodIntake.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};
module.exports = {
    updateFood,
    removeFood,
    addFoodIntake,
    
};