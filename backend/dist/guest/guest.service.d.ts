import { Guest } from './guest.model';
import { CreateGuestDto, GuestResponseDto } from './dto/guest.dto';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';
export declare class GuestService {
    private readonly guestModel;
    private readonly emailService;
    private readonly exportService;
    constructor(guestModel: typeof Guest, emailService: EmailService, exportService: ExportService);
    addGuest(guestData: CreateGuestDto): Promise<boolean>;
    getAllGuests(): Promise<GuestResponseDto[]>;
    exportGuests(): Promise<void>;
}
