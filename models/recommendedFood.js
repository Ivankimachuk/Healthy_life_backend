const { Schema, model } = require("mongoose");

const recommendedFoodSchema = new Schema(
    {
        name: {
            type: String,
        },
        amout: {
            type: String,
        },
        img: {
            type: String,
        },
        calories: {
            type: Number,
        },
        nutrition: {
            carbohydrates: {
                type: Number,
            },
            protein: {
                type: Number,
            },
            fat: {
                type: Number,
            },
        },
    },
    { versionKey: false, timestamps: true }
);

const RecommendedFood = model("recommendedfood", recommendedFoodSchema);

module.exports = RecommendedFood;