const express = require("express");
const router = express.Router();

const {
    getWaterIntake,
    addWaterIntake,
    // saveWaterIntake,
    // deleteByIdWater
} = require("../../controllers/intakesWater");

const {
    validateBody,
    authenticate,    
} = require("../../middlewares");

const { getWater, addWater } = require("../../models/waterIntakeSchema"); // Updated schema references

const isValidWater = require("../../middlewares/isValidWater");
const { ctrlWrapper } = require("../../helpers");

// Routes for handling requests

router.get("/",
    authenticate,
    // Updated validation reference
    getWaterIntake);

router.post('/',
    authenticate,
    validateBody(addWater), // Updated validation reference
    ctrlWrapper(addWaterIntake));

// router.delete('/:id',
//     authenticate,
//     isValidWater,
//     ctrlWrapper(deleteByIdWater));

module.exports = router;
