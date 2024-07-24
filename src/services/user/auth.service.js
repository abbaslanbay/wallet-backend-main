const httpStatus = require('http-status');
const userService = require('./user.service');
const { User, Token } = require('../../models');
const ApiError = require('../../utils/ApiError');
const Encrypter = require('../../helper/encrypter');
const Helper = require('../../helper/helper');
const { sendSMS } = require('../../helper/sms');
const { sendVerifyMail } = require('../../helper/mail');
const { tokenTypes } = require('../../config/tokens');
/**
 * Register
 * @param {Object} registerBody
 * @returns {Promise<User>}
 */
const register = async (registerBody, res) => {
  const user = await userService.getUserByEmail(registerBody.email);
  const userPhone = await userService.getUserByPhone(registerBody.phone);
  if (user || userPhone) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_already_exists'));
  }
  var verification_code = Helper.otp();
  const password = await Encrypter.password_enc(registerBody.password);
  const data = {
    email: registerBody.email,
    phone: registerBody.phone,
    password: password.encr,
    salt: password.salt,
    ip_address: registerBody.ip_address,
    verification_code: verification_code,
    phone_code: registerBody.phone_code,
    first_name: registerBody.first_name,
    last_name: registerBody.last_name,
    wallet_address: address,
    private_key: privateKey,
  };
  sendVerifyMail(registerBody.email, verification_code);

  const userData = await User.create(data);
  return userData;
};

/**
 * Login with username and password
 * @param {object} loginBody
 * @returns {Promise<User>}
 */
const loginUserWithPhoneAndPassword = async (loginBody, res) => {
  const user = await userService.getUserByPhone(loginBody.phone);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  const pass = await Encrypter.password_dec(loginBody.password, user.salt);
  if (pass !== user.password) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('incorrect_password'));
  }
  var verification_code = Helper.otp();
  sendVerifyMail(user.email, verification_code);
  user.verification_code = verification_code;
  user.tfa_verified = false;
  await user.save();
  return user;
};

/**
 * Login with username and password
 * @param {object} loginMailBody
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (loginMailBody, res) => {
  const user = await userService.getUserByEmail(loginMailBody.email);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  const pass = await Encrypter.password_dec(loginMailBody.password, user.salt);
  if (pass !== user.password) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('incorrect_password'));
  }
  var verification_code = Helper.otp();
  sendVerifyMail(user.email, verification_code);
  user.verification_code = verification_code;
  user.tfa_verified = false;
  await user.save();
  return user;
};

/**
 * Verify account
 * @param {object} verifyBody
 * @returns {Promise<User>}
 */
const verifyAccountByPhone = async (verifyBody, res) => {
  const user = await userService.getUserByPhone(verifyBody.phone);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  if (user.verification_code !== verifyBody.verification_code) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('incorrect_verification_code'));
  }

  user.verification_code = '';
  user.tfa_verified = true;
  await user.save();
  return user;
};

/**
 * Verify account
 * @param {object} verifyEmailBody
 * @returns {Promise<User>}
 */
const verifyAccountByEmail = async (verifyEmailBody, res) => {
  const user = await userService.getUserByEmail(verifyEmailBody.email);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  if (user.verification_code !== verifyEmailBody.verification_code) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('incorrect_verification_code'));
  }
  user.verification_code = '';
  user.tfa_verified = true;
  await user.save();
  return user;
};

const logout = async (refreshToken, res) => {
  const refreshTokenDoc = await Token.findOne({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    },
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, res.__('token_not_found'));
  }
  await refreshTokenDoc.remove();
};

module.exports = {
  register,
  loginUserWithPhoneAndPassword,
  verifyAccountByPhone,
  loginUserWithEmailAndPassword,
  verifyAccountByEmail,
  logout,
};
