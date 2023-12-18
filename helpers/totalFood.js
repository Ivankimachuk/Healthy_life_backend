function updateTotalFood(breakfast, dinner, snack, lunch) {
    const totalProteins = breakfast.concat(lunch, dinner, snack).reduce((sum, item) =>  sum + (item.nutrition.protein || 0), 0);
    const totalFats = breakfast.concat(lunch, dinner, snack).reduce((sum, item) => sum + (item.nutrition.fat || 0), 0);
    const totalCarbs = breakfast.concat(lunch, dinner, snack).reduce((sum, item) => sum + (item.nutrition.carbogidrate || 0), 0);
    const totalCalories = breakfast.concat(lunch, dinner, snack).reduce((sum, item) => sum + (item.calories || 0), 0);
    
    return { totalProteins, totalFats, totalCarbs, totalCalories };

}

// const result = calculateNutrition(totalProteins + totalFatsto + totalCarbs + totalCalories);
//      console.log("Total proteins:  + result.totalProteins");
//     console.log("Total fats:  + result.totalFats ");
//      console.log("Total carbohydrates: + result.totalCarbs");
//     console.log("Total calories: + result.totalCalories");

module.exports = {
    updateTotalFood,
        
    }
