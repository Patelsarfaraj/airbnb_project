const joi = require("joi");
module.exports.listingscema = joi.object({
    list: joi.object({
        title: joi.string().required(),
        dec: joi.string().required(),
        image: joi.string().allow("", null),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        country: joi.string().required(),
        category: joi.string().required()
    }).required()
});
module.exports.reviewschema = joi.object({
    review: joi.object({
        rating: joi.string().required(),
        comments: joi.string().required()
    }).required()
})