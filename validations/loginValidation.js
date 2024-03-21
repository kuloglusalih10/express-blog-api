const Joi = require('joi');

const schema = Joi.object({

    email : Joi.string().trim().required(),
    password: Joi.required()

});


module.exports = schema