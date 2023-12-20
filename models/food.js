const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const currentDate = Date.now();
const today = new Date(currentDate);
const todayDate = today.toISOString().slice(0, 10)

const ProductSchema = new Schema({
     
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: Date,
        default: todayDate,
    },
    breakfast: [{
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
        
    }],
    dinner: [{
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
    }],
    lunch: [
        {
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
    ],
    snack: [
        {
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
            }
            ,
        } ],
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
    }


    }
);



// const foodSchema = new Schema(
//     {
//         owner: {
//             type: Schema.Types.ObjectId,
//             ref: "user",
//             // required: true,
//         },
//         date: {
//             type: Date,
//             default: Date.now
//         },
//         totalCalories: {
//             type: Number,
//             default: 0,
//         },
//         {
//             breakfast: [{

//                 name: {
//                     type: String,
//                     required: true
//                 },
//                 calories: {
//                     type: Number,
//                     default: 0,
//                 },
//                 nutrition: {
//                     carbogidrate: {
//                         type: Number,
//                         default: 0,
//                     },
//                     protein: {
//                         type: Number,
//                         require: true,
//                         default: 0,
//                     },
//                     fat: {
//                         type: Number,
//                         require: true,
//                         default: 0,

//                     },

//                 }],
//         }
//             dinner: [{
//                 name: {
//                     type: String,
//                     required: true
//                 },
//                 calories: {
//                     type: Number,
//                     default: 0,
//                 },
//                 nutrition: {
//                     carbogidrate: {
//                         type: Number,
//                         default: 0,
//                     },
//                     protein: {
//                         type: Number,
//                         require: true,
//                         default: 0,
//                     },
//                     fat: {
//                         type: Number,
//                         require: true,
//                         default: 0,

//                     },
//                 }],
//         }
//             lunch: [
//                 {
//                     name: {
//                         type: String,
//                         required: true
//                     },
//                     calories: {
//                         type: Number,
//                         default: 0,
//                     },
//                     nutrition: {
//                         carbogidrate: {
//                             type: Number,
//                             default: 0,
//                         },
//                         protein: {
//                             type: Number,
//                             require: true,
//                             default: 0,
//                         },
//                         fat: {
//                             type: Number,
//                             require: true,
//                             default: 0,

//                         },
// }
//             ],
        
//         snack: [
//             {
//                 name: {
//                     type: String,
//                     required: true
//                 },
//                 calories: {
//                     type: Number,
//                     default: 0,
//                 },
//                 nutrition: {
//                     carbogidrate: {
//                         type: Number,
//                         default: 0,
//                     },
//                     protein: {
//                         type: Number,
//                         require: true,
//                         default: 0,
//                     },
//                     fat: {
//                         type: Number,
//                         require: true,
//                         default: 0,

//                     },
//                 }
//             ],
//     }
// )
        
              

// foodSchema.post("save", handleMongooseError);
ProductSchema.post("save", handleMongooseError)
// const FoodIntakeSchema = Joi.object({
//     id: Joi.string().required(),
//     date: Joi.date().required(),
//     totalCalories: Joi.number().required(),
    
   
// });



const ProductJoiSchema = Joi.object({
    
    typeFood: Joi.string().required(),
    userFood: Joi.object({
        name: Joi.date().required(),
        calories: Joi.number().required(),
        fat: Joi.number().required(),
        proteine: Joi.number().required(),
        carbogidrate: Joi.number().required(), 
    }).required()
    
    

})

// const FoodIntake = model("FoodIntake", foodSchema);
const ProductIntake = model("ProductIntake", ProductSchema);

module.exports = {
    
 
    ProductJoiSchema,
    ProductIntake,
}
