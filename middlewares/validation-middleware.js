const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const validationContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).trim(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number(),
    favorite: Joi.boolean(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

const validationUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(2).max(28).trim().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }

  next();
};

module.exports = {
  validationContact,
  validationUser,
};
