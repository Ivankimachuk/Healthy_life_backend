// const express = require("express");
// const router = express.Router();
const { WaterIntake } = require("../models/waterIntakeSchema");

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
        const { id, amount, date } = req.body;
        const newWaterIntake = {
            id,
            amount,
            date,
        };
   console.log(newWaterIntake)
        await WaterIntake.save(newWaterIntake);
        res.json({ status: "success" });
    } catch (error) {
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
};