const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Please provide your email address!",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required!",
  }),
});

module.exports = loginSchema;
