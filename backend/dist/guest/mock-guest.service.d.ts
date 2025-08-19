import { CreateGuestDto, GuestResponseDto } from '../guest/dto/guest.dto';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';
export declare class MockGuestService {
    private readonly emailService;
    private readonly exportService;
    private guests;
    constructor(emailService: EmailService, exportService: ExportService);
    addGuest(guestData: CreateGuestDto): Promise<boolean>;
    getAllGuests(): Promise<GuestResponseDto[]>;
    exportGuests(): Promise<void>;
}
