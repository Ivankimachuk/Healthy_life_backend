const { Schema, model } = require("mongoose");

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

const Weight = model("weight", weightSchema);

module.exports = { Weight };
