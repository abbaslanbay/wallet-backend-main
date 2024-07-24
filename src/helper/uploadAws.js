var AWS = require('aws-sdk');
const { makeUuId } = require('./helper');
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
var s3 = new AWS.S3();

const uploadFile = (obj, cb) => {
  var buf = Buffer.from(JSON.stringify(obj));
  const uuid = makeUuId();
  var data = {
    Bucket: process.env.AWS_BUCKET,
    Key: uuid + '.json',
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'application/json',
    ACL: 'private',
  };
  s3.upload(data, function (err, data) {
    if (err) {
      cb({
        ...err,
        status: false,
      });
    } else {
      cb({
        ...data,
        status: true,
      });
    }
  });
};
const readFile = async (key, cb) => {
  var params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
  };
  s3.getObject(params, function (err, data) {
    if (err) {
      const res = {
        json: data,
        status: false,
      };
      cb(res);
    } else {
      const parseFile = data.Body.toString('utf-8');
      const res = {
        json: parseFile,
        status: true,
      };
      cb(res);
    }
  });
};

module.exports = {
  uploadFile,
  readFile,
};
