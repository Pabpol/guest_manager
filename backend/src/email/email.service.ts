import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private emailEnabled: boolean;

  constructor(private readonly configService: ConfigService) {
    const emailPass = this.configService.get('EMAIL_PASS');
    this.emailEnabled = !!emailPass;
    
    if (this.emailEnabled) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'matricarolydaniel@gmail.com',
          pass: emailPass,
        },
      });
    }
  }

  async sendConfirmationEmail(email: string): Promise<void> {
    try {
      if (!this.emailEnabled) {
        console.log(`[DEMO MODE] Email would be sent to: ${email}`);
        return;
      }

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
      // Don't throw error in demo mode
      console.log(`[DEMO MODE] Email would be sent to: ${email}`);
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
