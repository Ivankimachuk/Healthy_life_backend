const { ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const {
    name,
    email,
    goal,
    gender,
    age,
    height,
    weight,
    activityLevel,
    avatar,
    waterRate,
    BMRRate,
    proteinRate,
    fatRate,
    carbsRate,
  } = req.user;

  res.status(200).json({
    user: {
      name,
      email,
      goal,
      gender,
      age,
      height,
      weight,
      activityLevel,
      avatar,
      waterRate,
      BMRRate,
      proteinRate,
      fatRate,
      carbsRate,
    },
  });
};

module.exports = { getCurrentUser: ctrlWrapper(getCurrentUser) };
