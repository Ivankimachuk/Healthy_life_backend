

// const calculationBMR = (userData) => {
//   const { gender, age, height, weight, activityLevel } = userData;

//   let bmr;

//   if (gender === "male") {
//     bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
//   } else {
//     bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
//   }

//   const dailyCalories = bmr * activityLevel;

//   return dailyCalories;
// };

// const calculateMacros = (goal, calories) => {
//   let proteinPercentage, fatPercentage, carbPercentage;

//   switch (goal) {
//     case 'weight_loss':
//       proteinPercentage = 0.25;
//       fatPercentage = 0.20;
//       break;
//     case 'muscle_gain':
//       proteinPercentage = 0.30;
//       fatPercentage = 0.20;
//       break;
//     case 'weight_maintenance':
//       proteinPercentage = 0.20;
//       fatPercentage = 0.25;
//       break;
//     default:
//       proteinPercentage = 0.25;
//       fatPercentage = 0.20;
//   }

//   carbPercentage = 1 - (proteinPercentage + fatPercentage);

//   const protein = Math.round((proteinPercentage * calories) / 4);
//   const fat = Math.round((fatPercentage * calories) / 9);
//   const carbs = Math.round((carbPercentage * calories) / 4);

//   return { protein, fat, carbs };
// };

// module.exports = {
//   calculationBMR,
//   calculateMacros,
// };


// //////////////////


// const calculateMacros = (gender, weight, height, age, activityLevel, goal) => {
//   const calculateBMR = () => {
//     const weightInKg = weight;
//     const heightInCm = height;
//     const ageInYears = age;

//     const genderFactor = gender === "female" ? 447.593 : 88.362;

//     const bmr =
//       (genderFactor +
//         13.397 * weightInKg +
//         4.799 * heightInCm -
//         5.677 * ageInYears) *
//       activityLevel;

//     return bmr;
//   };

//   const calculateCalories = () => {
//     const bmr = calculateBMR();
//     const calories = Math.round(bmr);

//     return calories;
//   };

//   const calculateMacronutrients = (calories) => {
//     let proteinPercentage, fatPercentage, carbPercentage;

//     switch (goal) {
//       case "weight_loss":
//         proteinPercentage = 0.25;
//         fatPercentage = 0.2;
//         break;
//       case "muscle_gain":
//         proteinPercentage = 0.3;
//         fatPercentage = 0.2;
//         break;
//       case "weight_maintenance":
//         proteinPercentage = 0.2;
//         fatPercentage = 0.25;
//         break;
//       default:
//         proteinPercentage = 0.25;
//         fatPercentage = 0.2;
//     }

//     carbPercentage = 1 - (proteinPercentage + fatPercentage);

//     const protein = Math.round((proteinPercentage * calories) / 4);
//     const fat = Math.round((fatPercentage * calories) / 9);
//     const carbs = Math.round((carbPercentage * calories) / 4);

//     return { protein, fat, carbs };
//   };

//   const calories = calculateCalories();
//   const macros = calculateMacronutrients(calories);

//   return { calories, ...macros };
// };

// module.exports = { calculateMacros };


// const calculateBMR = (userData) => {
//   const { gender, weight, height, age, activityLevel } = userData;

//   // Коефіцієнт фізичної активності залежно від рівня активності
//   const activityFactor = getActivityFactor(activityLevel);

//   let bmr;

//   if (gender === 'male') {
//     // Формула для чоловіків
//     bmr =
//       88.362 +
//       13.397 * weight +
//       4.799 * height -
//       5.677 * age;
//   } else if (gender === 'female') {
//     // Формула для жінок
//     bmr =
//       447.593 +
//       9.247 * weight +
//       3.098 * height -
//       4.330 * age;
//   } else {
//     throw new Error('Invalid gender');
//   }

//   // Застосування коефіцієнта фізичної активності
//   return bmr * activityFactor;
// };

// // Функція отримання коефіцієнта фізичної активності
// const getActivityFactor = (activityLevel) => {
//   switch (activityLevel) {
//     case 1:
//       return 1.2; // Мінімальна або відсутність фізичної активності
//     case 2:
//       return 1.4; // Легка активність
//     case 3:
//       return 1.6; // Середня активність
//     case 4:
//       return 1.8; // Висока активність
//     case 5:
//       return 2.0; // Дуже висока активність
//     default:
//       throw new Error('Invalid activity level');
//   }
// };

// // Функція розрахунку денної норми води
// const calculateDailyWaterIntake = (weight) => {
//   // Формула для розрахунку денної норми води
//   return weight * 0.03;
// };

// // Функція розрахунку співвідношення макроелементів до BMR
// const calculateMacroRatioToBMR = (goal, bmr) => {
//   let proteinPercentage, fatPercentage, carbPercentage;

//   switch (goal) {
//     case 'weight_loss':
//       proteinPercentage = 0.25;
//       fatPercentage = 0.20;
//       break;
//     case 'muscle_gain':
//       proteinPercentage = 0.30;
//       fatPercentage = 0.20;
//       break;
//     case 'weight_maintenance':
//       proteinPercentage = 0.20;
//       fatPercentage = 0.25;
//       break;
//     default:
//       proteinPercentage = 0.25;
//       fatPercentage = 0.20;
//   }

//   carbPercentage = 1 - (proteinPercentage + fatPercentage);

//   const protein = Math.round((proteinPercentage * bmr) / 4);
//   const fat = Math.round((fatPercentage * bmr) / 9);
//   const carbs = Math.round((carbPercentage * bmr) / 4);

//   return { protein, fat, carbs };
// };

// module.exports = {
//   calculateBMR,
//   calculateDailyWaterIntake,
//   calculateMacroRatioToBMR,
// };

const calculateMacros = (calories, goal) => {
    let proteinPercentage, fatPercentage;
  
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
  
    const carbPercentage = 1 - (proteinPercentage + fatPercentage);
  
    const protein = Math.round((proteinPercentage * calories) / 4);
    const fat = Math.round((fatPercentage * calories) / 9);
    const carbs = Math.round((carbPercentage * calories) / 4);
  
    return { protein, fat, carbs };
  };

  module.exports= calculateMacros;