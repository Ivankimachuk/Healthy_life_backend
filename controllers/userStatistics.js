const { ctrlWrapper } = require("../helpers");

const { Weight } = require("../models/weightModel");
const { WaterIntake } = require("../models/waterIntakeSchema");
const { ProductIntake } = require("../models/food");

const getStatistics = async (req, res) => {
  const monthNumber = req.query.queryMonth;

  const { _id: owner } = req.user;

  const weightMonth = await Weight.find(
    { owner, month: monthNumber },
    { value: 1, date: 1 }
  ).sort({
    date: 1,
  });
  const waterMonth = await WaterIntake.find(
    { owner, month: monthNumber },
    { value: 1, date: 1 }
  ).sort({ date: 1 });

  const caloriesMonth = await ProductIntake.find(
    { owner, month: monthNumber },
    { totalCalories: 1, date: 1 }
  ).sort({ date: 1 });

  res.json({
    weightMonth: weightMonth,
    waterMonth: waterMonth,
    caloriesMonth: caloriesMonth,
  });
};

module.exports = {
  getStatistics: ctrlWrapper(getStatistics),
};
