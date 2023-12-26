const { HttpError } = require("../helpers/index");

const { ProductIntake } = require("../models/food");
 const { updateTotalFood } = require("../helpers/totalFood");
const date =() => {
    const currentDate = Date.now();
    const today = new Date(currentDate);
   return  today.toISOString().slice(0, 10)
}


const getAll = async (req, res, next) => {
    try {
        const todayDate = date()
        const { _id: owner } = req.user;
        const result = await ProductIntake.findOne({ owner, date: todayDate });
        res.json(result);
       
    }
    catch (error) {
    next(error);
}
};
const saveFoodIntake = async (req, res, next) => {
    try {
        const todayDate = date()
        const { typeFood, userFood } = req.body;
        const { _id: owner } = req.user;
    

        const food = await ProductIntake.findOne({ owner, date: todayDate })

        if (!food) {
            await ProductIntake.create({ owner });
           
        }
        
            const userProducts = await ProductIntake.findOne({ owner, date: todayDate })

            userProducts[typeFood].push(...userFood)
            const result = await userProducts.save()

            
        const allFood = await ProductIntake.findOne({ owner, date: todayDate });
            const { breakfast, dinner, lunch, snack } = allFood;
            
            const total = updateTotalFood(breakfast, dinner, snack, lunch)
        const updateTotal = await ProductIntake.findOneAndUpdate({ owner, date: todayDate }, total, {new: true})
            const resUpdateTotal = await updateTotal.save()
            if (!result && !updateTotal) {
                throw HttpError(404, "Not found");
            }

        res.json(resUpdateTotal)       
        
    }
    catch (error) {
        next(error);
    }
};
const deleteFoodIntake = async (req, res) => {
    try {
        const todayDate = date()
        const {_id: owner } = req.user;
        const { typeFood } = req.body;
        const food = await ProductIntake.findOne({ owner, date: todayDate });
        if (food === null || food[typeFood] === null) {
            res.status(404).json({ message: `Not found food` });
        }
        food[typeFood] = [];
        const result = await food.save()

        if (!result) {
            return res.status(500).json({ message: `Internal server Error` });
        }

        const allFood = await ProductIntake.findOne({ owner, date: todayDate });
        if (allFood === null) {
            res.status(404).json({ message: `Not found any food` });
        }

        const { breakfast, dinner, lunch, snack } = allFood;

        const total = updateTotalFood(breakfast, dinner, snack, lunch)
        const updateTotal = await ProductIntake.findOneAndUpdate({ owner, date: todayDate }, total, { new: true })
        const resultTotal = await updateTotal.save()
    

        res.status(200).json({ message: "Food deleted success", resultTotal });
}
    catch (error) {
    res.status(500).json({ message: "error" });
}
};

const updateFoodIntake = async (req, res) => {
    try {
        const todayDate = date();
        const { id } = req.params;

        const { typeFood, userFood } = req.body;
        const { _id: owner } = req.user;

        const food = await ProductIntake.findOne({ _id: id });
        food[typeFood] = [...userFood];
        const result = await food.save()

        const allFood = await ProductIntake.findOne({ owner, todayDate });
        const { breakfast, dinner, lunch, snack } = allFood;

        const total = updateTotalFood(breakfast, dinner, snack, lunch)
        const updateTotal = await ProductIntake.findOneAndUpdate({ owner, todayDate }, total, { new: true })

        if (!result && !updateTotal) {
            throw HttpError(404, "Not found");
        }
        res.json(updateTotal);
    } catch (error) {
        res.status(500).json({ message: "error" });
    }
    
    
    
};

    module.exports = {
        updateFoodIntake,
        deleteFoodIntake,
        saveFoodIntake,
        getAll,
    
    };