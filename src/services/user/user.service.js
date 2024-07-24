const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { User } = require('../../models');
const Encrypter = require('../../helper/encrypter');

const getUserByEmail = async (email) => {
  return User.findOne({
    where: {
      email: email,
    },
  });
};
const getUserByPhone = async (phone) => {
  return User.findOne({
    where: {
      phone: phone,
    },
  });
};

/**
 * Verify account
 * @param {object} resetPassData
 * @returns {Promise<User>}
 */

const resetPasswordByEmail = async (email) => {
  const user = await getUserByEmail(email);
  return user;
};

const changePasswordByReset = async (body, res) => {
  const { email, passwordAgain, password, verification_code } = body;
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  if (password !== passwordAgain) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('password_not_match'));
  }
  if (user.verification_code !== verification_code) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('incorrect_verification_code'));
  }
  const passData = await Encrypter.password_enc(password);
  user.password = passData.encr;
  user.salt = passData.salt;
  await user.save();
  return user;
};

const getUser = async (id) => {
  return User.findOne({
    where: {
      id: id,
    },
  });
};

const changePassword = async (user_id, body, res) => {
  const { oldPassword, password, passwordAgain } = body;
  const user = await getUser(user_id);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  const oldPassData = await Encrypter.password_dec(oldPassword, user.salt);
  if (oldPassData !== user.password) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('incorrect_old_password'));
  }
  if (password !== passwordAgain) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('password_not_match'));
  }
  const passData = await Encrypter.password_enc(password);
  user.password = passData.encr;
  user.salt = passData.salt;
  await user.save();
  return user;
};

const updateUser = async (user_id, body, res) => {
  const user = await getUser(user_id);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  user.first_name = body.first_name;
  user.last_name = body.last_name;
  user.email = body.email;
  user.phone = body.phone;
  await user.save();
  return user;
};

const updateNotifySettings = async (user_id, body, res) => {
  const user = await getUser(user_id);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  user.is_email_campaing = body.is_email_campaing;
  user.is_sms_campaing = body.is_sms_campaing;
  user.is_push_notification = body.is_push_notification;
  await user.save();
  return user;
};

const updateAllUserWalletAddress = async () => {
  const user = await User.findAll();
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }

  for (let i = 0; i < user.length; i++) {
    user[i].wallet_address = address;
    user[i].private_key = privateKey;
    await user[i].save();
  }
  return;
};

const getUserWalletAddress = async (user_id) => {
  const user = await getUser(user_id);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  return user.wallet_address;
};

const getUserByWalletAddress = async (address) => {
  const findUser = await User.findOne({
    attributes: ['id'],
    where: {
      wallet_address: address,
    },
  });
  return findUser;
};

module.exports = {
  getUserByEmail,
  getUserByPhone,
  resetPasswordByEmail,
  changePassword,
  getUser,
  changePasswordByReset,
  updateUser,
  updateNotifySettings,
  updateAllUserWalletAddress,
  getUserWalletAddress,
  getUserByWalletAddress,
};
