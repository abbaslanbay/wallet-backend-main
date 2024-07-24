const mailgun = require('mailgun-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname + `../../config.${process.env.NODE_ENV}.env`),
});

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
const sendVerifyMail = async (to, verification_code) => {
  const mailgunData = {
    from: `Monifiex <support@monifiex.com>`,
    to: to,
    subject: 'Reset Password',
    template: 'monifiex-verify-code',
    'h:X-Mailgun-Variables': JSON.stringify({
      verification_code: verification_code,
    }),
  };
  mg.messages().send(mailgunData, function (error, body) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = {
  sendVerifyMail,
};
