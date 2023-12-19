const calculateMacros = (calories, goal) => {
  let proteinPercentage, fatPercentage;

  switch (goal) {
    case "Lose Fat":
      proteinPercentage = 0.25;
      fatPercentage = 0.2;
      break;
    case "Maintain":
      proteinPercentage = 0.3;
      fatPercentage = 0.2;
      break;
    case "Gain Muscle":
      proteinPercentage = 0.2;
      fatPercentage = 0.25;
      break;
    default:
      proteinPercentage = 0.25;
      fatPercentage = 0.2;
  }

  const carbPercentage = 1 - (proteinPercentage + fatPercentage);

  const protein = Math.round((proteinPercentage * calories) / 4);
  const fat = Math.round((fatPercentage * calories) / 9);
  const carbs = Math.round((carbPercentage * calories) / 4);
  return { protein, fat, carbs };
};

const calculateWaterRate = (weight, activityLevel) => {
  let waterRate = weight * 0.03 * 1000; // базова потреба у воді

  switch (activityLevel) {
    case 1.2:
      waterRate += 0; // легка активність
      break;
    case 1.375:
      waterRate += 350; // середня активність
      break;
    case 1.55:
      waterRate += 350; // висока активність
      break;
    case 1.725:
      waterRate += 350; // дуже висока активність
      break;
    case 1.9:
      waterRate += 700;
      break;
    default:
      break;
  }
  return Math.round(waterRate);
};

module.exports = {
  calculateMacros,
  calculateWaterRate,
};
