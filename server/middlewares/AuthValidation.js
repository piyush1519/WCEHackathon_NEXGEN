import Joi from 'joi'; 

// req -- request, res -- result
export const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        motherTongue: Joi.string().max(10).required(),
        fluency: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(", ");
        return res.status(400).json({ message: 'Bad Request', error: errorMessage });
    }

    next(); // Continue to controller
};

export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(", ");
        return res.status(400).json({ message: 'Bad Request', error: errorMessage });
    }

    next(); // Continue to database check
};

