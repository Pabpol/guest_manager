import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

@Injectable()
export class SendMailService {
  async send(mail: string): Promise<void> {
    dotenv.config();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'matricarolydaniel@gmail.com',
        pass: process.env.MAIL_PASS,
      },
    });

    const template = fs.readFileSync('views/mail.ejs', 'utf8');
    const html = ejs.render(template);
    await transporter.sendMail({
      from: '"Carol y Daniel" <matricarolydaniel@gmail.com>',
      to: mail,
      subject: 'Confirmadisimo',
      html,
    });
  }
}
