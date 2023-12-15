const express = require("express");
const { authenticate } = require("../../middlewares");

const router = express.Router();

const ctrl = require("../../controllers/recommendedFoods");

router.get("/", authenticate, ctrl.getRecommendedFoods);

module.exports = router;
