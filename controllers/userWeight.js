const { User } = require("../models/user");
const { Weight } = require("../models/weightModel");
const { ctrlWrapper } = require("../helpers");

const {
  calculateBMR,
  calculateWaterRate,
  calculateMacros,
} = require("../helpers/calculations");

const updateWeight = async (req, res, next) => {
  const { weight: value } = req.body;
  const { _id, gender, height, age, activityLevel, goal } = req.user;

  const currentDate = Date.now();
  const today = new Date(currentDate);
  const todayDate = today.toISOString().slice(0, 10);

  try {
    const findWeight = await Weight.findOne({ owner: _id, date: todayDate });
    if (!findWeight) {
      await Weight.create({ owner: _id, value, date: todayDate });
    } else {
      await Weight.findOneAndUpdate(
        { owner: _id, date: todayDate },
        { value, date: todayDate, owner: _id }
      );
    }

    const newBMR = calculateBMR(gender, value, height, age);
    const newWaterRate = calculateWaterRate(value, activityLevel);
    const { protein, fat, carbs } = calculateMacros(newBMR, goal);

    const result = await User.findByIdAndUpdate(
      _id,
      {
        weight: value,
        BMRRate: newBMR,
        waterRate: newWaterRate,
        proteinRate: protein,
        fatRate: fat,
        carbsRate: carbs,
      },
      { new: true }
    ).exec();

    res.json({
      message: "Weight is updated",
      user: {
        weight: result.weight,
        BMRRate: result.BMRRate,
        waterRate: result.waterRate,
        proteinRate: result.proteinRate,
        fatRate: result.fatRate,
        carbsRate: result.carbsRate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Some problem with updating weight ",
    });
  }
};
module.exports = { updateWeight: ctrlWrapper(updateWeight) };
