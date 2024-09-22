const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        f_Name : Joi.string().required(),
        f_Email : Joi.string().required(),
        f_Mobile : Joi.number().required().min(0),
        f_Designation : Joi.string().required(),
        f_Gender : Joi.string().required(),
        f_Course: Joi.string(),
        image : Joi.string().allow("",null)
    }).required(),
})


