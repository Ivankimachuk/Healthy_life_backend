const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const ProductSchema = new Schema({
     
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
        name: {
            type: String,
            required: true
        },
        calories: {
            type: Number,
            default: 0,
        },
        nutrition: {
            carbogidrate: {
                type: Number,
                default: 0,
            },
            protein: {
                type: Number,
                require: true,
                default: 0,
            },
            fat: {
                type: Number,
                require: true,
                default: 0,

            },

        },
    }
);


const foodSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            // required: true,
        },
        date: {
            type: Date,
            default: Date.now
        },
        totalCalories: {
            type: Number,
            default: 0,
        },
        diary: {
            breakfast: [{
                ProductSchema

            }],
            dinner: [{
                ProductSchema
            }],
            lunch: [
                { ProductSchema }
            ],
        }
    }
)
        
              

foodSchema.post("save", handleMongooseError);
ProductSchema.post("save", handleMongooseError)
const FoodIntakeSchema = Joi.object({
    id: Joi.string().required(),
    date: Joi.date().required(),
    totalCalories: Joi.number().required(),
    
   
});



const ProductMongooseSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.date().required(),
    calories: Joi.number().required(),
    fat: Joi.number().required(),
    proteine: Joi.number().required(),
    carbogidrate: Joi.number().required(),
    

})

const FoodIntake = model("FoodIntake", foodSchema);
const ProductIntake = model("ProductIntake", ProductSchema);

module.exports = {
    FoodIntake,
    FoodIntakeSchema,
    ProductMongooseSchema,
    ProductIntake,
}
