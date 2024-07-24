var CryptoJS = require('crypto-js');

var jwt = require('jsonwebtoken'),
  request = require('request');
const axios = require('axios');

var key = CryptoJS.enc.Base64.parse('#base64Key#');
var iv = CryptoJS.enc.Base64.parse('#base64IV#');

const create_payload = (data, key) => {
  var token = jwt.sign(data, key, { algorithm: 'HS384' }, { expiresIn: '1d' });
  return token;
};

const admin_create_payload = (data, key) => {
  var token = jwt.sign(data, key, { algorithm: 'HS384' }, { expiresIn: '2h' });
  return token;
};

const _get_location_details = (ip, cb) => {
  var options = {
    url: `https://ipinfo.io/${ip}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    qs: { token: '38689f73a82631' },
  };
  request(options, (error, response, body) => {
    if (body) cb(JSON.parse(body));
    else
      cb({
        geoplugin_city: 'Madurai',
        geoplugin_regionName: 'Tamil Nadu',
        geoplugin_countryName: 'India',
        geoplugin_currencyCode: 'INR',
        geoplugin_countryCode: 'IN',
      });
  });
};
const dateToDMY = (date) => {
  var obj = new Date(date);
  var year = obj.getFullYear();
  var m = obj.getMonth() + 1;
  var month = m < 10 ? '0' + m : m;
  var d = obj.getDate();
  var day = d < 10 ? '0' + d : d;
  return day + '-' + month + '-' + year;
};

const dateToYMD = (date) => {
  var obj = new Date(date);
  var year = obj.getFullYear();
  var m = obj.getMonth() + 1;
  var month = m < 10 ? '0' + m : m;
  var d = obj.getDate();
  var day = d < 10 ? '0' + d : d;
  return year + '-' + month + '-' + day;
};
const decrypt_data = (param) => {
  var decipher = CryptoJS.AES.decrypt(param, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
  return decipher;
};
const dateTime = (zone) => {
  var obj = new Date().toLocaleString('en-US', { timeZone: zone });
  obj = obj.split('/').join('-');
  return obj.split(',')[1];
};

const send_sms_otp = (mobile, otp, cb) => {
  var options = {
    url: `https://2factor.in/API/V1/a3b54739-ab5e-11ec-a4c2-0200cd936042/SMS/${mobile}/${otp}`,
    method: 'GET',
  };
  request(options, (error, response, body) => {
    if (body) {
      var result = JSON.parse(body);
      cb({ status: true, data: result });
    } else cb({ status: false, data: {} });
  });
};

const otp = () => {
  var result = Math.floor(100000 + +Math.random() * (999999 - 100000));
  return result;
};

const _change_decimal = (data, num) => {
  data = parseFloat(data).toFixed(10).toString();
  var decimals = data.split('.'),
    first = decimals[0],
    second = decimals[1].substring(0, num);
  return parseFloat(`${first}.${second}`);
};

const getIp = async () => {
  const ipAddress = await axios.get('https://api.ipify.org?format=json');
  return ipAddress.data.ip;
};

const makeUuId = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

module.exports = {
  create_payload,
  admin_create_payload,
  _get_location_details,
  dateToDMY,
  dateToYMD,
  decrypt_data,
  dateTime,
  send_sms_otp,
  otp,
  _change_decimal,
  getIp,
  makeUuId,
};
