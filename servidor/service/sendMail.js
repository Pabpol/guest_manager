const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const dotenv = require('dotenv');
const path = require('path')
const ejs = require('ejs');



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
    ejs.renderFile('views/mail.ejs', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: '"Carol y Daniel" <matricarolydaniel@gmail.com>', // sender address
          to: mail, // list of receivers
          subject: "Confirmadisimo", // Subject line
          html: data
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });
      }
    });
  }
};


