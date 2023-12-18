const { HttpError } = require("../helpers/index");

/* const Joi = require('joi') */

const { ProductIntake } = require("../models/food");
const { User } = require("../models/user");
 const { updateTotalFood } = require("../helpers/totalFood");

const currentDate = Date.now();
const today = new Date(currentDate);
const todayDate = today.toISOString().slice(0, 10)


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
            const userProducts = await ProductIntake.findOne({ owner, date: todayDate })

            userProducts.breakfast.push(userFood)
            const result = await userProducts.save()

            

            // const userProducts = await ProductIntake.findOne({ owner, todayDate })
            // userFood.map(item => userProducts.breakfast.push(item))
           
            // const result = await userProducts.save().then(saveDoc => {console.log(saveDoc)})

            // const data = await ProductIntake.findOneAndUpdate({owner}, {
            //     $push: {breakfast: {...userFood}}
            // },{new:true})

            const allFood = await ProductIntake.findOne({ owner, todayDate });
            const { breakfast, dinner, lunch, snack } = allFood;
            
            const total = updateTotalFood(breakfast, dinner, snack, lunch)
            const updateTotal = await ProductIntake.findOneAndUpdate({owner, todayDate}, total, {new: true})
            
            if (!result && !updateTotal) {
                throw HttpError(404, "Not found");
            }

            res.json(result);

           
        }
        if (typeFood === "dinner") {
            const userProducts = await ProductIntake.findOne({ owner, date: todayDate })

            userProducts.dinner.push(userFood)
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

            userProducts.lunch.push(userFood)
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

            userProducts.snack.push(userFood)
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
    

const removeFood = async (req, res) => {
    const { id } = req.params;
    const result = await ProductIntake.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({ message: "food deleted" });
};

const updateFood = async (req, res) => {
    const { id } = req.params;
    
    const result = await ProductIntake.findByIdAndUpdate( {id} , req.body, { new: true });
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