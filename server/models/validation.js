//VALIDATION
const Joi = require('@hapi/joi');

const registerValidtaion = data => {

    const schema = Joi.object({
        name: 
            Joi.string()
            .min(6)
            .required()
            .messages({
                'string.empty': `"name" cannot be an empty field`,
                'string.min': `"name" should have a minimum length of 6 characters`,
                'any.required': `"name" is a required field`
              }),
        email: 
            Joi.string()
            .min(6)
            .required()
            .email()
            .messages({
                'string.empty': `"Email" cannot be an empty field`,
                'string.min': `"Email" should have a minimum length of 6 characters`,
                'any.required': `"Email" is a required field`
              }),
        password: 
            Joi.string()
            .min(8)
            .required()
            .messages({
                'string.empty': `"password" cannot be an empty field`,
                'string.min': `"password" should have a minimum length of 8 characters`,
                'any.required': `"password" is a required field`
              }),

        categories:
        Joi.array()
        .items(Joi.string())
        .allow(null),

        allTasks:
            Joi.array()
            .items(Joi.string())
            .allow(null),
        date: 
            Joi.date(),
    
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

