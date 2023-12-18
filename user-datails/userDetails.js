const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const calculationBMR = (userData) => {
  const { gender, age, height, weight, activityLevel } = userData;

  let bmr;

  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  // коефіцієнт фізичної активності //////
  // const activityLevelDefaultData = {
  //   1.2: 1.2,
  //   1.375: 1.375,
  //   1.55: 1.55,
  //   1.725: 1.725,
  //   1.9: 1.9,
  // };

  // const activityFactor = activityLevelDefaultData[activityLevel];

  const dailyCalories = bmr * activityLevel;
  

  return dailyCalories;
};

// Розрахунок пропорцій макроелементів за вказаними цілями ////
const calculateMacros = () => {
  const { goal, calories } = userData;
  let proteinPercentage, fatPercentage, carbPercentage;

  switch (goal) {
    case 'weight_loss':
      proteinPercentage = 0.25;
      fatPercentage = 0.20;
      break;
    case 'muscle_gain':
      proteinPercentage = 0.30;
      fatPercentage = 0.20;
      break;
    case 'weight_maintenance':
      proteinPercentage = 0.20;
      fatPercentage = 0.25;
      break;
    default:
      proteinPercentage = 0.25;
      fatPercentage = 0.20;
  }

  carbPercentage = 1 - (proteinPercentage + fatPercentage);

  const protein = Math.round((proteinPercentage * calories) / 4);
  const fat = Math.round((fatPercentage * calories) / 9);
  const carbs = Math.round((carbPercentage * calories) / 4);

  return { protein, fat, carbs };
};
// const calculateMacroDistribution = (goal) => {
//   const goals = {
//     "Lose Fat": { protein: 25, fat: 20 },
//     "Maintain": { protein: 20, fat: 25 },
//     "Gain Muscle": { protein: 30, fat: 20 },
//   };

//   return goals[goal] || goals["Lose Fat"];
// };

const saveUserDataToDatabase = async (userId, userData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw HttpError(404, "Not user found");
  }
  user.dailyCalories = calculationBMR(userData);
  user.macroDistribution = calculateMacros(userData.goal);
  await user.save();
};

module.exports = {
  calculationBMR,
  saveUserDataToDatabase,
};
