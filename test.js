// const { User } = require("../models/user");
// const calculateMacros = require("../user-datails/calculateMacros");

// // const { ctrlWrapper } = require("../helpers/ctrlWrapper");
// const changeGoal = async (req, res) => {
//   const { newGoal, token } = req.body;
//   const user = await User.findOne({ token });
//   console.log(user);
//   const { _id: owner, BMRRate } = user;
//   console.log(owner);
//   console.log(newGoal);
//   const nutrionCalc = await calculateMacros(BMRRate, newGoal);
//   console.log(BMRRate);

//   console.log(nutrionCalc);
//   const changeUserGoal = await User.findOneAndUpdate(
//     owner,
//     { goal: newGoal },
//     { proteinRate: nutrionCalc.protein },

//     { new: true }
//   );
//   return res
//     .status(200)
//     .send({ goal: changeUserGoal.goal, proteinRate: nutrionCalc.protein });
// };

// module.exports = { changeGoal };

// const express = require("express");
// const { changeGoal } = require("../../controllers/userGoal");
// const { authenticate } = require("../../middlewares");

// const router = express.Router();

// router.put("/", authenticate, changeGoal);

// module.exports = router;

// // const { User, schemas } = require("../models/user");
// // const calculateMacros = require("../user-datails/calculateMacros");

// // const updateGoal = async (req, res) => {
// //   const { newGoal, token } = req.body;
// //   const user = await User.findOne({ token });
// //   //   console.log(user);
// //   const { _id: owner, BMRRate, proteinRate, fatRate, carbsRate } = user;
// //   //   console.log({ owner });
// //   //   const currentDate = Date.now();
// //   //   const today = new Date(currentDate);
// //   //   const todayDate = today.toISOString().slice(0, 10);
// //   //   console.log(newGoal);
// //   //   console.log(todayDate);
// //   const nutrionCalc = await calculateMacros({
// //     goal: newGoal,
// //     calories: BMRRate,
// //   });
// //   console.log(nutrionCalc);

// //   const updateGoalUser = await User.findOneAndUpdate(
// //     owner,
// //     { goal: newGoal },
// //     { BMRRate: nutrionCalc },
// //     { new: true }
// //   ).exec();
// //   console.log(updateGoalUser);
// //   res.status(200).send({ message: "success" });
// // };
// // module.exports = { updateGoal };
