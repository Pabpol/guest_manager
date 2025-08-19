import { GuestResponseDto } from '../guest/dto/guest.dto';
export declare class ExportService {
    exportGuestsToExcel(guests: GuestResponseDto[]): Promise<void>;
}
