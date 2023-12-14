const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");


    const waterIntakeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    }
});

waterIntakeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  id: Joi.string().required(),
  date: Joi.date().required(),
  amount: Joi.number().required(),
})


const schemas = {
  addSchema,  
};


// Модель для збереження інформації про споживання води
const WaterIntake = model('waterIntake', waterIntakeSchema);

module.exports = {
    WaterIntake,
    schemas,
    
}
