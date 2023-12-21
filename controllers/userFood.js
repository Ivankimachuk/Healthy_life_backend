const { HttpError } = require("../helpers/index");

const { ProductIntake } = require("../models/food");
 const { updateTotalFood } = require("../helpers/totalFood");

const currentDate = Date.now();
const today = new Date(currentDate);
const todayDate = today.toISOString().slice(0, 10)


const saveFoodIntake = async (req, res, next) => {
    try {
    
        const { typeFood, userFood } = req.body;
        const { _id: owner } = req.user;
    

        const food = await ProductIntake.findOne({ owner, date: todayDate })

        if (!food) {
            await ProductIntake.create({ owner });
           
        }
        if (typeFood === "breakfast") {
            const userProducts = await ProductIntake.findOne({ owner, date: todayDate })

            userProducts.breakfast.push(...userFood)
            const result = await userProducts.save()

            
            const allFood = await ProductIntake.findOne({ owner, todayDate });
            const { breakfast, dinner, lunch, snack } = allFood;
            
            const total = updateTotalFood(breakfast, dinner, snack, lunch)
            const updateTotal = await ProductIntake.findOneAndUpdate({owner, todayDate}, total, {new: true})
            
            if (!result && !updateTotal) {
                throw HttpError(404, "Not found");
            }

            res.json(updateTotal);

           
        }
        if (typeFood === "dinner") {
            const userProducts = await ProductIntake.findOne({ owner, date: todayDate })

            userProducts.dinner.push(...userFood)
            const result = await userProducts.save()
            const allFood = await ProductIntake.findOne({ owner, todayDate });
            const { breakfast, dinner, lunch, snack } = allFood;

            const total = updateTotalFood(breakfast, dinner, snack, lunch)
            const updateTotal = await ProductIntake.findOneAndUpdate({ owner, todayDate }, total, { new: true })


            if (!result && !updateTotal) {
                throw HttpError(404, "Not found");
            }

            res.json(result);

        }
        if (typeFood === "lunch") {
            const userProducts = await ProductIntake.findOne({ owner, date: todayDate })

            userProducts.lunch.push(...userFood)
            const result = await userProducts.save()
            const allFood = await ProductIntake.findOne({ owner, todayDate });
            const { breakfast, dinner, lunch, snack } = allFood;

            const total = updateTotalFood(breakfast, dinner, snack, lunch)
            const updateTotal = await ProductIntake.findOneAndUpdate({ owner, todayDate }, total, { new: true })


            if (!result && !updateTotal) {
                throw HttpError(404, "Not found");
            }

            res.json(result);

        }
    
        if (typeFood === "snack") {
            const userProducts = await ProductIntake.findOne({ owner, date: todayDate })
            userProducts.snack.push(...userFood)
            const result = await userProducts.save()
            const allFood = await ProductIntake.findOne({ owner, todayDate });
            const { breakfast, dinner, lunch, snack } = allFood;

            const total = updateTotalFood(breakfast, dinner, snack, lunch)
            const updateTotal = await ProductIntake.findOneAndUpdate({ owner, todayDate }, total, { new: true })

            if (!result && !updateTotal) {
                throw HttpError(404, "Not found");
            }

            res.json(result);
        }
              
        
    }
    catch (error) {
        next(error);
    }
};
const deleteFoodIntake = async (req, res) => {
    try {
        const {_id: owner } = req.user;
        const { typeFood } = req.body;
        const food = await ProductIntake.findOne({ owner, date: todayDate });
        food[typeFood] = [];
        const result = await food.save()
        const allFood = await ProductIntake.findOne({ owner, todayDate });
        const { breakfast, dinner, lunch, snack } = allFood;

        const total = updateTotalFood(breakfast, dinner, snack, lunch)
        const updateTotal = await ProductIntake.findOneAndUpdate({ owner, todayDate }, total, { new: true })

    if (!result && !updateTotal) {
        return res.status(404).json({ message: `Not found food` });
    }

    res.status(200).json({ message: "Food deleted success" });
}
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
}
};

const updateFoodIntake = async (req, res) => {
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
  res.json(result);
};
    module.exports = {
        updateFoodIntake,
        deleteFoodIntake,
        saveFoodIntake,
    
    };