// const express = require("express");
// const router = express.Router();
const { WaterIntake } = require("../models/waterIntakeSchema");

const calculateWaterIntake = (weight, activityLevel) => {
    const waterIntake = weight * 0.03; // базова потреба у воді

    switch (activityLevel) {
        case "low":
            waterIntake += 0.35; // легка активність
            break;
        case "medium":
            waterIntake += 0.35; // середня активність
            break;
        case "high":
            waterIntake += 0.35; // висока активність
            break;
        case "very_high":
            waterIntake += 0.7; // дуже висока активність
            break;
        default:
            break;
    }
    return waterIntake;
};

const getWaterConsumption = async (req, res) => {
    try {
        const waterIntakeRecords = await WaterIntake.find();
        // отримую поточну вагу користувача
        const weight = req.user.weight;
        const today = new Date().toDateString();
 
        // фільтрую записи для поточної дати
        const todayWaterIntakes = waterIntakeRecords.filter(intake => intake.date.toDateString() === today);
 
        // обчислюю спожиту воду за сьогодні
        const todayWaterConsumed = todayWaterIntakes.reduce((total, intake) => total + intake.amount, 0);

        // отримую рівень активності користувача
        const activityLevel = req.user.activityLevel;

        // обчислюю залишок води до норми 
        const dailyWaterIntake = calculateWaterIntake(weight, activityLevel);
        const waterLeft = dailyWaterIntake - todayWaterConsumed;
        res.json({
            message: "Water consumption",
            waterConsumed: todayWaterConsumed,
            left: waterLeft > 0 ? waterLeft : 0
        })
    } catch (error) {
        res.satus(500).json({ message: "Server error" });
    }
};

// повертає всі записи про спожиту воду користувачем
const getwaterIntake = async (req, res) => {
    try {
        const result = await WaterIntake.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const addWaterIntake = async (req, res) => {
    try {
        const { id, amountInML, weightInKG } = req.body;
        console.log(req.body)
        const date = Date.now();

        const newWaterIntake = new WaterIntake({
            id,
            amount: amountInML,
            date,
            weight: weightInKG,
        });

   console.log(newWaterIntake)
        await newWaterIntake.save();
        res.json({ status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add water intake" });
    }
};

const deleteByIdWater = async (req, res) => {
    try {
        const { id } = req.params;
        await WaterIntake.findByIdAndDelete(id);
        res.json({ status: "success" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete water intake" });
    }
};

module.exports = {
    getwaterIntake,
    addWaterIntake,
    deleteByIdWater,
    getWaterConsumption,
};