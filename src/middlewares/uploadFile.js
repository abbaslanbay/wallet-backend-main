const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Files } = require('../models');

const uploadFile = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded'));
  }
  const obj = {
    user_id: req.user_id,
    original_name: file.originalname,
    file_name: file.key,
    path: file.location,
    mimetype: file.mimetype,
    size: file.size,
    storage_class: file.storageClass,
    etag: file.etag,
    version_id: file.versionId,
  };

  const fileData = await Files.create(obj);
  if (fileData) {
    req.file_id = fileData.id;
  }
  next();
};

module.exports = {
  uploadFile,
};
