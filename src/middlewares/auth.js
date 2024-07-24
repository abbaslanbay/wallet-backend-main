const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { isTokenIncluded, getAccessTokenFromHeader } = require('../helper/auth');
const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models');

const authVerify = async (req, res, next) => {
  if (isTokenIncluded(req) === false) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token not included'));
  }
  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Permission denied'));
    const checkUser = await User.findOne({
      attributes: ['id', 'uuid', 'phone', 'phone_code', 'email', 'first_name', 'last_name'],
      where: {
        uuid: decoded.uuid,
      },
    });
    if (!checkUser) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Permission denied'));
    }
    req.user_id = decoded.user_id;
    req.user = checkUser;
    next();
  });
};
const authAdminVerify = async (req, res, next) => {
  if (isTokenIncluded(req) === false) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token not included'));
  }
  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, process.env.JWT_SECRET_ADMIN, async (err, decoded) => {
    if (err) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Permission denied'));

    const checkAdmin = await Admin.findOne({
      attributes: ['id', 'office_id'],
      where: {
        id: decoded.admin_id,
      },
    });
    if (!checkAdmin) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Permission denied'));
    }
    req.admin_id = decoded.admin_id;
    req.admin = checkAdmin;
    next();
  });
};
module.exports = {
  authVerify,
  authAdminVerify,
};
