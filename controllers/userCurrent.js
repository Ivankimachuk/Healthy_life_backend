const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await User.findById(_id);
  const userCurrentData = {
    name: currentUser.name,
    email: currentUser.email,
    goal: currentUser.goal,
    gender: currentUser.gender,
    age: currentUser.age,
    height: currentUser.height,
    weight: currentUser.weight,
    activityLevel: currentUser.activityLevel,
    avatarUrl: currentUser.avatarUrl,
    waterRate: currentUser.waterRate,
    BMRRate: currentUser.BMRRate,
    proteinRate: currentUser.proteinRate,
    fatRate: currentUser.fatRate,
    carbsRate: currentUser.carbsRate,
  };
  res.status(200).json({ data: userCurrentData });
};

module.exports = { getCurrentUser: ctrlWrapper(getCurrentUser) };
