const Joi = require('joi');
const { password } = require('../custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string().required().custom(password),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_code: Joi.string(),
    ip_address: Joi.string(),
  }),
};
const loginWithPhone = {
  body: Joi.object().keys({
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    phone_code: Joi.string(),
    password: Joi.string().required().custom(password),
  }),
};
const loginWithEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};
const verifyAccountByPhone = {
  body: Joi.object().keys({
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    verification_code: Joi.string().length(6).required(),
  }),
};
const verifyAccountByEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    verification_code: Joi.string().length(6).required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
module.exports = {
  register,
  loginWithPhone,
  loginWithEmail,
  verifyAccountByPhone,
  verifyAccountByEmail,
  logout,
};
