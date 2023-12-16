const { User } = require("../models/user");
const { WaterIntake, waterIntakeSchema } = require("../models/waterIntakeSchema");


const getWaterIntake = async (req, res) => {
    try {
        console.log("get")
        const userId = req.user.id;
        const waterIntakeRecord = await WaterIntake.find({ owner: userId });
        console.log(waterIntakeRecord);

        res.status(200).json({ status: "success", waterIntakeRecord });
            
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get water intake for date" });
    }
};

const addWaterIntake = async (req, res, next) => {
    try {    
        const { value, token } = req.body;
           
        const user = await User.findOne({ token });
        // console.log(user)
        const { _id: owner } = user;
        // console.log(owner)
        const currentDate = Date.now();
        const today = new Date(currentDate);
        const todayDate = today.toISOString().slice(0,10)
        
        const water = await WaterIntake.findOne({ owner, date: todayDate})
        console.log(water)

        if (!water) {
            const result = await WaterIntake.create({ owner, value });   
            return res.json({ message: "success", result});
        }
        
        water.value += Number(value);
        water.save()
        res.json({ message: "success", water});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete water intake" });
    }
};

// const saveWaterIntake = async (req, res) => {
//     try {
//         const { value } = req.body;
//         console.log(req.body)
//         const currentDate = Date.now();
//         const userId = req.user.id;

//         if (!WaterIntake) {
//             return res.status(500).json({
//                 message: "WaterIntake model is not defined.",
//             });
//         }
//         const waterIntakeRecord = await WaterIntake.findOne({ owner: userId, date: currentDate });
            
//         if (!waterIntakeRecord) {
//             const newWaterIntake = await WaterIntake.create({
//                 value,
//                 date: currentDate,
//                 owner: userId,
//             });
//             res.status(201).json({
//                 status: "success",
//                 code: 201,
//                 date: {
//                     date: currentDate,
//                     value: newWaterIntake.value,
//                 }
//             });
//         } else {
//             waterIntakeRecord.value += value;
//             await waterIntakeRecord.save();
//             res.status(200).json({
//                 status: "success",
//                 code: 200,
//                 date: {
//                     date: currentDate,
//                     value: waterIntakeRecord.value,
//                 }
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Failed to update water intake",
//         });
//     };
// };

const deleteByIdWater = async (req, res) => {
    try {
        const currentDate = Date.now();
        const userId = req.user.id;

        await WaterIntake.findByIdAndDelete({owner: userId, date: currentDate});
        
        res.json({ status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete water intake" });
    }
};

        module.exports = {
            getWaterIntake,
            addWaterIntake,
            deleteByIdWater,
        }