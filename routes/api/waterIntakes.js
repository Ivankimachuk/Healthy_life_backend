const express = require("express");
const router = express.Router();

const {
    getWaterIntake,
    addWaterIntake,
    deleteByIdWater
} = require("../../controllers/intakesWater");

const {
    validateBody,
    authenticate,    
} = require("../../middlewares");

const { getWater, addWater } = require("../../models/waterIntakeSchema"); // Updated schema references

const isValidWater = require("../../middlewares/isValidWater");
const { ctrlWrapper } = require("../../helpers");

// Маршрути для обробки запитів
router.get("/",
    authenticate,
    getWaterIntake);

router.post('/',
    authenticate,
    validateBody(addWater), 
    ctrlWrapper(addWaterIntake));

router.delete('/:id',
    authenticate,
    deleteByIdWater);

module.exports = router;
