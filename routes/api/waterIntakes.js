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

const { addWater, deleteWater } = require("../../models/waterIntakeSchema"); 

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

router.delete('/',
    authenticate,
    validateBody(deleteWater), 
    isValidWater,
    deleteByIdWater);

module.exports = router;
