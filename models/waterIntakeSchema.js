const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const { handleMongooseError } = require("../helpers");

const currentDate = Date.now();
        const today = new Date(currentDate);
        const todayDate = today.toISOString().slice(0,10)

const waterIntakeSchema = Schema({
    value: {
        type: Number,
        default: 0,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    date: {
        type: String,
        default: todayDate,
    }
}, { versionKey: false, timestamps: true });

// waterIntakeSchema.post("save", handleMongooseError);
const WaterIntake = model("WaterIntake", waterIntakeSchema); // Creating the model


const addWater = Joi.object({
    value: Joi.number().required(), 
    token: Joi.string(),
});

const updateWaterIntake = Joi.object({
    value: Joi.number().required(),
    date: Joi.string(),
});

const getWater = Joi.object({
    value: Joi.number(),
    date: Joi.string(),
});

module.exports = {
    WaterIntake,
    addWater,
    updateWaterIntake,
    getWater,
    waterIntakeSchema,
};
