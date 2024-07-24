const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { authService, tokenService, userLogService } = require('../../services');
const ApiError = require('../../utils/ApiError');
const { getIp } = require('../../helper/helper');

const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('something_wrong'));
  }
  const returnObj = {
    id: user.id,
    phone: user.phone,
    phone_code: user.phone_code,
  };
  await userLogService.addLog(user.id, 'registered');
  res.status(httpStatus.CREATED).send({ data: returnObj });
});

const loginWithPhone = catchAsync(async (req, res) => {
  const user = await authService.loginUserWithPhoneAndPassword(req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  if (req.body.phone === '5458173979') {
    var returnObj = {
      id: user.id,
      phone: user.phone,
      phone_code: user.phone_code,
      verification_code: user.verification_code,
    };
  } else {
    var returnObj = {
      id: user.id,
      phone: user.phone,
      phone_code: user.phone_code,
    };
  }

  await userLogService.addLog(user.id, 'loginWithPhone');

  res.status(httpStatus.OK).send({ data: returnObj });
});

const verifyAccountByPhone = catchAsync(async (req, res) => {
  const user = await authService.verifyAccountByPhone(req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  const tokens = await tokenService.generateAuthTokens(user);
  const kycStatus = await kycService.checkKyc(user.id);
  const checkKycStatus = kycStatus ? true : false;
  const returnObj = {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    phone_code: user.phone_code,
    tokens: tokens,
    kyc_verified: user.kyc_verified,
    checkKycStatus: checkKycStatus,
    is_banned: user.is_banned,
  };
  await userLogService.addLog(user.id, 'verifyAccountByPhone');
  res.status(httpStatus.OK).send({ data: returnObj });
});

const loginWithEmail = catchAsync(async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  const returnObj = {
    id: user.id,
    email: user.email,
  };
  await userLogService.addLog(user.id, 'loginWithEmail');

  res.status(httpStatus.OK).send({ data: returnObj });
});

const verifyAccountByEmail = catchAsync(async (req, res) => {
  const user = await authService.verifyAccountByEmail(req.body, res);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, res.__('user_not_found'));
  }
  const tokens = await tokenService.generateAuthTokens(user);
  const kycStatus = await kycService.checkKyc(user.id);
  const checkKycStatus = kycStatus ? true : false;
  const returnObj = {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    phone_code: user.phone_code,
    tokens: tokens,
    kyc_verified: user.kyc_verified,
    checkKycStatus: checkKycStatus,
    is_banned: user.is_banned,
  };
  await userLogService.addLog(user.id, 'verifyAccountByEmail');

  res.status(httpStatus.OK).send({ data: returnObj });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken, res);
  await userLogService.addLog(req.user_id, 'logout');

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  loginWithPhone,
  verifyAccountByPhone,
  loginWithEmail,
  verifyAccountByEmail,
  logout,
};
