const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../models/user");
const {
  calculateMacros,
  calculateWaterRate,
  calculateBMR,
} = require("../user-datails/calculateMacros");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    goal,
    gender,
    age,
    height,
    weight,
    activityLevel,
  } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw HttpError(409, "Email already in use");
  }

  const BMR = calculateBMR(gender, weight, height, age);

  const { protein, fat, carbs } = await calculateMacros(BMR, goal);

  const newWaterRate = await calculateWaterRate(weight, activityLevel);

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    goal,
    gender,
    age,
    height,
    weight,
    activityLevel,
    waterRate: newWaterRate,
    avatarUrl,
    BMRRate: BMR,
    proteinRate: protein,
    fatRate: fat,
    carbsRate: carbs,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10 years" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      goal: newUser.goal,
      gender: newUser.gender,
      age: newUser.age,
      height: newUser.height,
      weight: newUser.weight,
      activityLevel: newUser.activityLevel,
      avatar: newUser.avatarUrl,
      waterRate: newUser.waterRate,
      BMRRate: newUser.BMRRate,
      proteinRate: newUser.proteinRate,
      fatRate: newUser.fatRate,
      carbsRate: newUser.carbsRate,
    },
    token,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10 years" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    user: {
      name: user.name,
      email: user.email,
      goal: user.goal,
      gender: user.gender,
      age: user.age,
      height: user.height,
      weight: user.weight,
      activityLevel: user.activityLevel,
      avatar: user.avatarUrl,
      waterRate: user.waterRate,
      BMRRate: user.BMRRate,
      proteinRate: user.proteinRate,
      fatRate: user.fatRate,
      carbsRate: user.carbsRate,
    },
    token,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
};
