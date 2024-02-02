const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

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
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: '',
    },
    goal: {
      type: String,
      enum: ['Lose Fat', 'Maintain', 'Gain Muscle'],
      default: 'Lose Fat',
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
      required: true,
    },
    birthDate: {
      type: Date,
      min: ['1900-01-01', 'Age should be above'],
      max: new Date(),
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
      default: '',
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
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

userSchema.post('save', handleMongooseError);

const signupSchema = Joi.object({
  name: Joi.string().required().empty(false),
  password: Joi.string().min(6).required().empty(false),
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in the format alex@gmail.com.',
  }),
  goal: Joi.string().empty(false),
  gender: Joi.string().empty(false).valid('male', 'female'),
  birthDate: Joi.date()
    .min('01-01-1900')
    .max('now')
    .required()
    .empty(false),
  height: Joi.number().min(0).required().empty(false),
  weight: Joi.number().min(0).required().empty(false),
  activityLevel: Joi.number()
    .valid(1.2, 1.375, 1.55, 1.725, 1.9)
    .required()
    .empty(false),
  avatar: Joi.any().meta({ swaggerType: 'file' }).description('Image file'),
});

const signinSchema = Joi.object({
  password: Joi.string().min(6).required().empty(false),
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in the format alex@gmail.com.',
  }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in the format alex@gmail.com.',
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string().valid('male', 'female'),
  birthDate: Joi.date()
    .min('01-01-1900')
    .max('now')
    .required()
    .empty(false),
  height: Joi.number().min(0),
  weight: Joi.number().min(0),
  activityLevel: Joi.number().valid(1.2, 1.375, 1.55, 1.725, 1.9),
  avatar: Joi.any().meta({ swaggerType: 'file' }).description('Image file'),
  email: Joi.string().pattern(emailRegexp).empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in the format alex@gmail.com.',
  }),
  goal: Joi.string().valid('Lose Fat', 'Maintain', 'Gain Muscle'),
  waterRate: Joi.number(),
  BMRRate: Joi.number(),
  proteinRate: Joi.number(),
  carbsRate: Joi.number(),
  fatRate: Joi.number(),
});

const goalUpdateUser = Joi.object({
  goal: Joi.string().valid('Lose Fat', 'Maintain', 'Gain Muscle').required(),
});
const weightUpdateUser = Joi.object({
  weight: Joi.number().required(),
});

const schemas = {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
  updateUserSchema,
  goalUpdateUser,
  weightUpdateUser,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
