const joi  = require("joi");

const schema = joi.object({
    comment : joi.string().required().min(6),
    post : joi.string().required(),
    author : joi.string().required()
});

module.exports = schema;