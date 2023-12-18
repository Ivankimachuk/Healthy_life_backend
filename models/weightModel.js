const { Schema, model } = require("mongoose");
const Joi = require("joi");

const currentDate = Date.now();
const today = new Date(currentDate);
const todayDate = today.toISOString().slice(0, 10);

const weightSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: String,
      default: todayDate,
    },
  },
  { versionKey: false, timestamps: true }
);
const updateWeight = Joi.object({
  weight: Joi.number().required(),
});

const schemaWeight = { updateWeight };
const Weight = model("weight", weightSchema);

module.exports = { Weight, schemaWeight };
