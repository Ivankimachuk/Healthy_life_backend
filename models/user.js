const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
       match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
    goal: {
      type: String,
      enum: ["Lose Fat", "Maintain", "Gain Muscle"],
      default: "Lose Fat",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },
    age: {
      type: Number,
      min: [0, "Age should be positive"],
      default: 18,
      required: true,
    },
    height: {
      type: Number,
      min: 0,
      default: 150,
      required: true,
    },
    weight: {
      type: Number,
      min: 0,
      default: 40,
      required: true,
    },
    activityLevel: {
      type: Number,
      enum: [1.2, 1.375, 1.55, 1.725, 1.9],
      default: 1.2,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
      default: null,
    },
    // idCloudAvatar: {
    //   type: String,
    //   default: null
    // },
    waterRate: {
      type: Number,
      default: 0,
    },
    BMRRate: {
      type: Number,
      default: 0,
    },
    proteinRate: {
      type: Number,
      default: 0,
    },
    fatRate: {
      type: Number,
      default: 0,
    },
    carbsRate: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  goal: Joi.string(),
  gender: Joi.string(),
  age: Joi.number(),
  height: Joi.number(),
  weight: Joi.number(),
  activityLevel: Joi.number(),
});

const signinSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().valid("male", "female"),
  age: Joi.number().min(0).required(),
  height: Joi.number().min(0).required(),
  weight: Joi.number().min(0).required(),
  activityLevel: Joi.number().valid(1.2, 1.375, 1.55, 1.725, 1.9).required(),
});

const goalUpdateUser = Joi.object({
  goal: Joi.string(),
});
const weightUpdateUser = Joi.object({
  weight: Joi.number(),
});

const schemas = {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
  updateUserSchema,
  goalUpdateUser,
  weightUpdateUser,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};