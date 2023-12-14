const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/recommendedFoods");

router.get("/", ctrl.getRecommendedFoods);

module.exports = router;
