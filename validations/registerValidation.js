const joi = require("joi")

const schema = joi.object({
    name : joi.string().trim().required(),
    email: joi.string().trim().required().email(),
    password: joi.string().trim().required().min(6)
})


module.exports = schema