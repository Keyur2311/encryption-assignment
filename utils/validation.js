const Joi = require('joi');

// Define schema for user validation using Joi
const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('Admin', 'Editor', 'Viewer').required(),
});

function validateUser(userData) {
    const { error } = userSchema.validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
}

module.exports = { validateUser };
