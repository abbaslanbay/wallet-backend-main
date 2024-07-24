const twilio = require('twilio');

const sendSMS = async (phone, phone_code, message) => {
  const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  client.messages
    .create({
      body: message,
      to: phone_code + phone, // Text this number
      from: process.env.TWILIO_FROM_NUMBER, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

module.exports = {
  sendSMS,
};
