const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/intakesWater");
const { isValidIdWater } = require("../../middlewares");

// const { schemas } = require("../../models/waterIntakeSchema")


router.get("/", ctrl.getwaterIntake);

router.post('/', isValidIdWater, ctrl.addWaterIntake);

router.delete('/:id', ctrl.deleteByIdWater);

module.exports = router;
