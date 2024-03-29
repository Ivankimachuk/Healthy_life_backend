const { ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const {
    name,
    email,
    goal,
    gender,
    birthDate,
    height,
    weight,
    activityLevel,
    avatarUrl,
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
      birthDate,
      height,
      weight,
      activityLevel,
      avatar: avatarUrl,
      waterRate,
      BMRRate,
      proteinRate,
      fatRate,
      carbsRate,
    },
  });
};

module.exports = { getCurrentUser: ctrlWrapper(getCurrentUser) };
