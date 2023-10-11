const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: "david0220anderson@gmail.com",
    pass: "mbno mkty zval gggz",
  },
});

module.exports = transporter;
