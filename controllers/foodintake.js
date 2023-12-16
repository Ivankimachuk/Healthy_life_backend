const { HttpError } = require("../helpers/index");

/* const Joi = require('joi') */

const { ProductIntake } = require("../models/food");
const { User } = require("../models/user");





const addFoodIntake = async (req, res, next) => {
    try {
    
        const { token, typeFood, userFood } = req.body;
        const user = await User.findOne({ token });
        
        const { _id: owner } = user;
        const food = await ProductIntake.findOne({ owner })

        if (!food) {
            await ProductIntake.create({ owner });
           
        }
        if (typeFood === "breakfast") {
            const userProducts = await ProductIntake.findOne({ owner })
            
            userProducts.breakfast.push(userFood)
            const result = await userProducts.save()

            if (!result) {
                throw HttpError(404, "Not found");
            }

            res.json(result);

           
        }
        if (typeFood === "dinner") {
            const userProducts = await ProductIntake.findOne({ owner })

            userProducts.dinner.push(userFood)
            const result = await userProducts.save()

            if (!result) {
                throw HttpError(404, "Not found");
            }

            res.json(result);

        }
        if (typeFood === "lunch") {
            const userProducts = await ProductIntake.findOne({ owner })

            userProducts.lunch.push(userFood)
            const result = await userProducts.save()

            if (!result) {
                throw HttpError(404, "Not found");
            }

            res.json(result);

        }
    
        if (typeFood === "snack") {
            const userProducts = await ProductIntake.findOne({ owner })

            userProducts.snack.push(userFood)
            const result = await userProducts.save()

            if (!result) {
                throw HttpError(404, "Not found");
            }

            res.json(result);
        }
    }
    catch (error) {
        next(error);
    }
};
    

const removeFood = async (req, res) => {
    const { id } = req.params;
    const result = await ProductIntake.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateFood = async (req, res) => {
    const { id } = req.params;
    const result = await ProductIntake.findOneByIdAndUpdate({ id }, req.body, { new: true });
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