import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './guest.model';
import { CreateGuestDto, GuestResponseDto } from './dto/guest.dto';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';

@Injectable()
export class GuestService {
    constructor(
        @InjectRepository(Guest)
        private readonly guestRepository: Repository<Guest>,
        private readonly emailService: EmailService,
        private readonly exportService: ExportService,
    ) { }

    async addGuest(guestData: CreateGuestDto): Promise<boolean> {
        try {
            if (!guestData.mail || guestData.mail === '') {
                throw new Error('El mail es un campo obligatorio.');
            }

            // Check if guest already exists
            const existingGuest = await this.guestRepository.findOne({
                where: { mail: guestData.mail }
            });

            if (!existingGuest) {
                const newGuest = this.guestRepository.create({
                    nombre: guestData.nombre || '',
                    apellido: guestData.apellido || '',
                    menu: guestData.menu || '',
                    tieneAcompanante: !!(guestData.nombreAcompnanante && guestData.nombreAcompnanante.trim()),
                    nombreAcompnanante: guestData.nombreAcompnanante || '',
                    apellidoAcompanante: guestData.apellidoAcompanante || '',
                    menuAcompanante: guestData.menuAcompanante || '',
                    mail: guestData.mail
                });

                await this.guestRepository.save(newGuest);

                console.log(`✅ Guest added: ${guestData.nombre} ${guestData.apellido} (${guestData.mail})`);
                await this.emailService.sendConfirmationEmail(guestData.mail);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error('El mail es un campo obligatorio.');
        }
    }

    async getAllGuests(): Promise<GuestResponseDto[]> {
        try {
            const guests = await this.guestRepository.find();
            return guests.map(guest => ({
                nombre: guest.nombre,
                apellido: guest.apellido,
                menu: guest.menu,
                nombreAcompnanante: guest.nombreAcompnanante,
                apellidoAcompanante: guest.apellidoAcompanante,
                menuAcompanante: guest.menuAcompanante,
            }));
        } catch (error) {
            console.error('Error getting guests:', error);
            throw new Error('Error al listar los invitados');
        }
    }

    async exportGuests(): Promise<void> {
        try {
            const guests = await this.getAllGuests();
            await this.exportService.exportGuestsToExcel(guests);
        } catch (error) {
            console.log('📁 Export requested (using database data)');
        }
    }
}
