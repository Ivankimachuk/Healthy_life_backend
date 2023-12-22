const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const crypto = require("crypto");

const { User } = require("../models/user");

const {
  calculateMacros,
  calculateWaterRate,
  calculateBMR,
} = require("../user-datails/calculateMacros");

const { HttpError, ctrlWrapper } = require("../helpers");
const sendEmail = require("../helpers/sendEmail");

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

const forgot = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const { name } = user;

  const newPassword = crypto.randomBytes(8).toString("hex");
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const newPasswordEmail = {
    to: email,
    subject: "Your new password",
    html: `
        <h1>Hello ${name},</h1>
        <p>Your password has been reset. Here is your new password: <strong>${newPassword}</strong></p>
        <p>Please log in and change your password immediately.</p>
        <p>Best regards,<br>Your dream Team</p>
      `,
  };

  await sendEmail(newPasswordEmail);

  const userUpdate = await User.findOneAndUpdate(
    { email },
    { password: hashPassword }
  );

  if (!userUpdate) {
    throw HttpError(404, "User not found");
  }

  res.status(200).json({
    message:
      "Password updated successfully. Check your email for the new password.",
  });
};

const signout = async (req, res) => {
  const { token } = req.user;
  await User.findOneAndUpdate({ token }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  forgot: ctrlWrapper(forgot),
  signout: ctrlWrapper(signout),
};
