const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const dotenv = require('dotenv');


module.exports = {
  send: async (mail) => {
    dotenv.config();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'matricarolydaniel@gmail.com',
        pass: process.env.MAIL_PASS
      },
    });

    let infoParameter = {
      from: '"Carol y Daniel" <matricarolydaniel@gmail.com>', // sender address
      to: mail, // list of receivers
      subject: "Confirmadisimo", // Subject line
      html: await readFile("public/template/mail.html", "utf8"), // html body
    };

    transporter.sendMail(infoParameter);
  },
};

