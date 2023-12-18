const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { calculateMacros } = require("../user-datails/calculateMacros");

const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email alreade in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10 years" });

  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    verify: newUser.verify,
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name, avatarURL, goal, weight, height, age, activityLevel } =
    req.user;

  // Обчислення bmr по статі ///
  const isMale = req.user.gender === "male";
  const bmr = isMale
    ? (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * activityLevel
    : (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * activityLevel;

  // Обчислення макроелементів ///
  const calories = Math.round(bmr);
  console.log(calories);
  const { protein, fat, carbs } = calculateMacros(calories, goal);

  const updateData = {
    calories,
    protein,
    fat,
    carbs,
  };

  // Знаходить користувача та оновлює дані
  await User.findOneAndUpdate({ email }, { $set: updateData });

  res.json({
    userData: {
      name,
      email,
      avatarURL,
    },
    userInfo: {
      calories,
      protein,
      fat,
      carbs,
    },
  });
};

// const signup = async (req, res) => {
//   try {
//     const {
//       email,
//       password,
//       gender,
//       weight,
//       height,
//       age,
//       activityLevel,
//       goal,
//     } = req.body;

//     const { calories, protein, fat, carbs } = calculateMacros(
//       gender,
//       weight,
//       height,
//       age,
//       activityLevel,
//       goal
//     );

//     const user = await User.findOne({ email });
//     if (user) {
//       throw HttpError(409, "Email already in use");
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       ...req.body,
//       password: hashPassword,
//       calories,
//       protein,
//       fat,
//       carbs,
//     });

//     const payload = {
//       id: newUser._id,
//     };

//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10 years" });

//     await User.findByIdAndUpdate(newUser._id, { token });

//     res.status(201).json({
//       name: newUser.name,
//       email: newUser.email,
//       password: newUser.password,
//       goal: newUser.goal,
//       gender: newUser.gender,
//       age: newUser.age,
//       height: newUser.height,
//       weight: newUser.weight,
//       calories,
//       protein,
//       fat,
//       carbs,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const signup = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, "Email alreade in use");
//   }

//   const hashPassword = await bcrypt.hash(password, 10);

//   const newUser = await User.create({ ...req.body, password: hashPassword });

//   const payload = {
//     id: newUser._id,
//   };

//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10 years" });

//   await User.findByIdAndUpdate(newUser._id, { token });

//   res.status(201).json({
//     name: newUser.name,
//     email: newUser.email,
//     password: newUser.password,
//     goal: newUser.goal,
//     gender: newUser.gender,
//     age: newUser.age,
//     height: newUser.height,
//     weight: newUser.weight,
//     token,
//   });
// };

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

  res.json({
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
  getCurrent: ctrlWrapper(getCurrent),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
};
