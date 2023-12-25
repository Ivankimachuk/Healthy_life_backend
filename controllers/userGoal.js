const { User } = require("../models/user");
const { calculateMacros } = require("../helpers/calculations");

const { ctrlWrapper } = require("../helpers");

const changeGoal = async (req, res) => {
  try {
    const { goal: newGoal } = req.body;
    const { _id, BMRRate } = req.user;

    const nutrionCalc = calculateMacros(BMRRate, newGoal);

    const changeUserGoal = await User.findOneAndUpdate(
      _id,
      {
        goal: newGoal,
        proteinRate: nutrionCalc.protein,
        fatRate: nutrionCalc.fat,
        carbsRate: nutrionCalc.carbs,
      },
      { new: true }
    );

    res.json({
      message: "Goal updated",
      user: {
        goal: changeUserGoal.goal,
        proteinRate: changeUserGoal.proteinRate,
        fatRate: changeUserGoal.fatRate,
        carbsRate: changeUserGoal.carbsRate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Goal is not correct" });
  }
};

module.exports = { changeGoal: ctrlWrapper(changeGoal) };
