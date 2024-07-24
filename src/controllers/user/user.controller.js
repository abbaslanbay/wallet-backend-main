const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { userService, kycService, userLogService } = require('../../services');
const ApiError = require('../../utils/ApiError');
const Helper = require('../../helper/helper');
const { sendVerifyMail } = require('../../helper/mail');

const resetPasswordByEmail = catchAsync(async (req, res) => {
  const user = await userService.resetPasswordByEmail(req.body.email);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  var verification_code = Helper.otp();
  sendVerifyMail(user.email, verification_code);
  user.verification_code = verification_code;
  user.tfa_verified = false;
  await user.save();
  await userLogService.addLog(user.id, 'resetPasswordByEmail');
  return res.status(httpStatus.OK).send({ data: user, message: res.__('verification_code_sent') });
});

const changePasswordByReset = catchAsync(async (req, res) => {
  const user = await userService.changePasswordByReset(req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  await userLogService.addLog(user.id, 'changePasswordByReset');

  return res.status(httpStatus.OK).send({ data: user, message: res.__('password_changed_successfuly') });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUser(req.user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, res.__('user_not_found'));
  }
  const kycStatus = await kycService.checkKyc(req.user_id);
  const checkKycStatus = kycStatus ? true : false;
  const kycStatusValue = kycStatus ? kycStatus.status : null;
  const resultData = {
    user_id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    kyc_verified: user.kyc_verified,
    is_banned: user.is_banned,
    checkKycStatus: checkKycStatus,
    kyc_status: kycStatusValue,
    is_email_campaing: user.is_email_campaing,
    is_sms_campaing: user.is_sms_campaing,
    is_push_notification: user.is_push_notification,
  };
  return res.status(httpStatus.OK).send({ data: resultData });
});

const changePassword = catchAsync(async (req, res) => {
  await userService.changePassword(req.user_id, req.body, res);
  await userLogService.addLog(req.user.id, 'changePassword');
  return res.status(httpStatus.OK).send({ message: res.__('password_changed_successfuly') });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.user_id, req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('something_went_wrong'));
  }
  await userLogService.addLog(req.user.id, 'updateUser');
  return res.status(httpStatus.OK).send({ data: user, message: res.__('user_updated_successfully') });
});

const updateNotifySettings = catchAsync(async (req, res) => {
  const user = await userService.updateNotifySettings(req.user_id, req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('something_went_wrong'));
  }
  await userLogService.addLog(req.user.id, 'updateNotifySettings');
  return res.status(httpStatus.OK).send({ data: user, message: res.__('notify_settings_updated_successfully') });
});

const updateAllUserWalletAddress = catchAsync(async (req, res) => {
  await userService.updateAllUserWalletAddress();
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('something_went_wrong'));
  }
  return res.status(httpStatus.OK).send({ data: user, message: res.__('user_wallet_address_updated_successfully') });
});

module.exports = {
  resetPasswordByEmail,
  changePasswordByReset,
  getUser,
  changePassword,
  updateUser,
  updateNotifySettings,
  updateAllUserWalletAddress,
};
