import Joi from 'joi';

//
export const validate = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if(error){
            const errors = error.details.map((detail) => detail.message).join(", ");
            return res.status(400).json({ message: errors });
        }
        next();
    };
};

// Vadlidation schemas
export const registerSchema = Joi.object({
    name: Joi.string().required().trim().messages({
        'string.empty': 'Please enter your full name',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().trim().messages({
        'string.empty': 'Please enter your email address',
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Please enter a password',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});

export const loginSchema = Joi.object({
        email: Joi.string().email().required().trim().messages({
        'string.empty': 'Please enter your email address',
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
        password: Joi.string().min(6).required().messages({
        'string.empty': 'Please enter a password',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })

});
