import { Injectable } from '@nestjs/common';
import { CreateGuestDto, GuestResponseDto } from '../guest/dto/guest.dto';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';

@Injectable()
export class MockGuestService {
  private guests: (GuestResponseDto & { mail: string })[] = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      menu: 'vegetariano',
      nombreAcompnanante: 'María',
      apellidoAcompanante: 'González',
      menuAcompanante: 'normal',
      mail: 'juan@example.com'
    },
    {
      nombre: 'Ana',
      apellido: 'García',
      menu: 'normal',
      nombreAcompnanante: '',
      apellidoAcompanante: '',
      menuAcompanante: '',
      mail: 'ana@example.com'
    }
  ];

  constructor(
    private readonly emailService: EmailService,
    private readonly exportService: ExportService,
  ) {}

  async addGuest(guestData: CreateGuestDto): Promise<boolean> {
    try {
      if (!guestData.mail || guestData.mail === '') {
        throw new Error('El mail es un campo obligatorio.');
      }

      const existingGuest = this.guests.find(guest => guest.mail === guestData.mail);

      if (!existingGuest) {
        this.guests.push({
          nombre: guestData.nombre || '',
          apellido: guestData.apellido || '',
          menu: guestData.menu || '',
          nombreAcompnanante: guestData.nombreAcompnanante || '',
          apellidoAcompanante: guestData.apellidoAcompanante || '',
          menuAcompanante: guestData.menuAcompanante || '',
          mail: guestData.mail
        });
        
        console.log(`Mock: Guest added - ${guestData.nombre} ${guestData.apellido}`);
        // Skip email sending in mock
        // await this.emailService.sendConfirmationEmail(guestData.mail);
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
      return this.guests.map(({ mail, ...guest }) => guest);
    } catch (error) {
      throw new Error('Error al listar los invitados');
    }
  }

  async exportGuests(): Promise<void> {
    try {
      const guests = await this.getAllGuests();
      await this.exportService.exportGuestsToExcel(guests);
    } catch (error) {
      console.log('Mock: Excel export requested');
      // Don't throw error in mock mode
    }
  }
}