const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

exports.responseError =  (res, errorcode, message) => {
  res.status(400).json({
    "errors": {
      "code": errorcode,
      "message": message
    }
  });
};

exports.sendEmail = async (option) => {
  try {
    return await transporter.sendMail(option);
  } catch (error) {
    return error;
  }
}