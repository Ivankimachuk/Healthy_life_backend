const { Schema, model } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

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


const WaterIntake = model("WaterIntake", waterIntakeSchema); 


const addWater = Joi.object({
    value: Joi.number().required(), 
    token: Joi.string(),
});

const deleteWater = Joi.object({
    _id: Joi.objectId().required(),    
});

const getWater = Joi.object({
    value: Joi.number(),
    date: Joi.string(),
});

module.exports = {
    WaterIntake,
    addWater,
    deleteWater,
    getWater,
    waterIntakeSchema,
};
