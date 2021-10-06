//VALIDATION
const Joi = require('@hapi/joi');

const registerValidtaion = data => {

    const schema = Joi.object({
        name: 
            Joi.string()
            .min(6)
            .required(),
        email: 
            Joi.string()
            .min(6)
            .required()
            .email(),
        password: 
            Joi.string()
            .min(6)
            .required(),
        date: 
            Joi.date()

    });

    return schema.validate(data);
};

const loginValidtaion = data => {

    const schema = Joi.object({
        email: 
            Joi.string()
            .min(6)
            .required()
            .email(),
        password: 
            Joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data);
};

module.exports.registerValidtaion = registerValidtaion;
module.exports.loginValidtaion = loginValidtaion;

