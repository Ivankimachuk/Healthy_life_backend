const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
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
      // required: true
      // default:
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: null,
      // required:true,
    },
    age: {
      type: Number,
      // required: true,
    },
    height: {
      type: Number,
      // required: true
    },
    weight: {
      type: Number,
      // required: true
    },
    activity: {
      type: String,
    },
    // avatarUrl: {
    //   type: String,
    //   required: true,
    // },
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
  activity: Joi.string(),
});

const signinSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  signupSchema,
  signinSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};