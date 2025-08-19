import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private transporter;
    private emailEnabled;
    constructor(configService: ConfigService);
    sendConfirmationEmail(email: string): Promise<void>;
    private getEmailTemplate;
}
