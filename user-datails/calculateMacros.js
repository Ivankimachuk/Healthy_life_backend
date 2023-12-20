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

module.exports = calculateMacros;