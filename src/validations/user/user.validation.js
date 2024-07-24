const Joi = require('joi');
const { password } = require('../custom.validation');

const resetPasswordByEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const changePasswordByReset = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    verification_code: Joi.string().required(),
    password: Joi.string().required().custom(password),
    passwordAgain: Joi.string().required().custom(password),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().custom(password),
    password: Joi.string().required().custom(password),
    passwordAgain: Joi.string().required().custom(password),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
  }),
};

const updateNotifySettings = {
  body: Joi.object().keys({
    is_email_campaing: Joi.boolean().required(),
    is_sms_campaing: Joi.boolean().required(),
    is_push_notification: Joi.boolean().required(),
  }),
};
const updateAllUserWalletAddress = {
  body: Joi.object().keys({
    isWallet: Joi.boolean().required(),
  }),
};

module.exports = {
  resetPasswordByEmail,
  changePasswordByReset,
  changePassword,
  updateUser,
  updateNotifySettings,
  updateAllUserWalletAddress,
};
