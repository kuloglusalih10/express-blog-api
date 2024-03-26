const joi  = require("joi");

const schema = joi.object({
    title : joi.string().required().min(8),
    subTitle : joi.string().required().min(15),
    description : joi.string().required().min(25),
    date : joi.date().required(),
    author : joi.string().required()
});

module.exports = schema;