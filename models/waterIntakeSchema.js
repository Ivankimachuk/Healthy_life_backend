const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

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
        default: Date.now,
    }
}, { versionKey: false, timestamps: true });

waterIntakeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    value: Joi.number().required(),
    date: Joi.date().required(),
})
   

waterIntakeSchema.post("save", handleMongooseError);

const schemas = {
  addSchema,  
};

// модель для збереження інформації про споживання води
const WaterIntake = model('waterIntake', waterIntakeSchema);

module.exports = {
    WaterIntake,
    schemas,    
}
