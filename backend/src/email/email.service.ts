import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'matricarolydaniel@gmail.com',
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendConfirmationEmail(email: string): Promise<void> {
    try {
      const mailOptions = {
        from: '"Carol y Daniel" <matricarolydaniel@gmail.com>',
        to: email,
        subject: 'Confirmadisimo',
        html: this.getEmailTemplate(),
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to: ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending confirmation email');
    }
  }

  private getEmailTemplate(): string {
    // Basic email template - this should ideally be loaded from a template file
    return `
      <h1>¡Confirmación Recibida!</h1>
      <p>Gracias por confirmar tu asistencia a nuestra boda.</p>
      <p>Con amor,</p>
      <p>Carol y Daniel</p>
    `;
  }
}
