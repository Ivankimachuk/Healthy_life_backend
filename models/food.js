const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const currentDate = Date.now();
const today = new Date(currentDate);
const todayDate = today.toISOString().slice(0, 10);
const todayMonth = today.getMonth() + 1;
const ProductSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
    default: todayDate,
  },
  month: {
    type: Number,
    default: todayMonth,
  },
  breakfast: [
    {
      name: {
        type: String,
        required: true,
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
    },
  ],
  dinner: [
    {
      name: {
        type: String,
        required: true,
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
    },
  ],
  lunch: [
    {
      name: {
        type: String,
        required: true,
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
    },
  ],
  snack: [
    {
      name: {
        type: String,
        required: true,
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
    },
  ],
  totalProteins: {
    type: Number,
    default: 0,
  },
  totalFats: {
    type: Number,
    default: 0,
  },
  totalCarbs: {
    type: Number,
    default: 0,
  },
  totalCalories: {
    type: Number,
    default: 0,
  },
});
ProductSchema.post("save", handleMongooseError);

const ProductJoiSchema = Joi.object({
  typeFood: Joi.string().valid('breakfast', 'dinner', 'lunch', 'snack').required(),
  userFood: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        calories: Joi.number().required(),
        nutrition: Joi.object({
          fat: Joi.number().required(),
          protein: Joi.number().required(),
          carbogidrate: Joi.number().required(),
        }),
      })
    )
    .required(),
});

const FoodJoiSchema = Joi.object({
  typeFood: Joi.string().valid('breakfast', 'dinner', 'lunch', 'snack').required(),
 
  userFood: Joi.object({}).required(),
});

const ProductIntake = model("ProductIntake", ProductSchema);

module.exports = {
  FoodJoiSchema,
  ProductJoiSchema,
  ProductIntake,
};
