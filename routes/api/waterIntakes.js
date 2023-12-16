const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/intakesWater");
const { isValidIdWater, authenticate, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/waterIntakeSchema")


router.get("/", authenticate, ctrl.getwaterIntake);

router.post('/', authenticate, ctrl.addWaterIntake);

router.delete('/:id', authenticate, isValidId, ctrl.deleteByIdWater);

module.exports = router;
