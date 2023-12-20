const RecommendedFood = require("../models/recommendedFood");
const { ctrlWrapper } = require("../helpers");

const getRecommendedFoods = async (req, res) => {

  const result = await RecommendedFood.find();
  res.json(result);
};

module.exports = {
  getRecommendedFoods: ctrlWrapper(getRecommendedFoods),
};

