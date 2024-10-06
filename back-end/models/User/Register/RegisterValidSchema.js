const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Please provide your name",
    "string.min": "Your name must be at least 3 characters long",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "An email address is required",
    "string.email": "Please enter a valid email address",
  }),

  password: Joi.string().min(10).required().messages({
    "string.empty": "A password is required",
    "string.min":
      "Your password must be at least 10 characters long for security reasons",
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Please confirm your password",
    "any.only":
      "Passwords must match",
  }),
});

module.exports = registerSchema;
