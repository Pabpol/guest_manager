import type { Response } from 'express';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/guest.dto';
export declare class GuestController {
    private readonly guestService;
    constructor(guestService: GuestService);
    submitForm(guestData: CreateGuestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getGuestsDashboard(): Promise<{
        totalGuests: number;
        confirmedGuests: number;
        guestsWithCompanion: number;
        specialMenuCount: number;
        totalPeople: number;
    }>;
    downloadGuestList(res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
