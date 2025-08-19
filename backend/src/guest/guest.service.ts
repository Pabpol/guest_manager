import { Injectable, ConflictException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Guest } from './guest.model';
import { CreateGuestDto, GuestResponseDto } from './dto/guest.dto';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';

@Injectable()
export class GuestService {
  private mockGuests: (GuestResponseDto & { mail: string })[] = [
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
    },
    {
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      menu: 'Sin gluten',
      nombreAcompnanante: 'Laura',
      apellidoAcompanante: 'Martínez',
      menuAcompanante: 'vegetariano',
      mail: 'carlos@example.com'
    }
  ];

  constructor(
    // @InjectModel(Guest)
    // private readonly guestModel: typeof Guest,
    private readonly emailService: EmailService,
    private readonly exportService: ExportService,
  ) {}

  async addGuest(guestData: CreateGuestDto): Promise<boolean> {
    try {
      if (!guestData.mail || guestData.mail === '') {
        throw new Error('El mail es un campo obligatorio.');
      }

      const existingGuest = this.mockGuests.find(guest => guest.mail === guestData.mail);
      
      if (!existingGuest) {
        this.mockGuests.push({
          nombre: guestData.nombre || '',
          apellido: guestData.apellido || '',
          menu: guestData.menu || '',
          nombreAcompnanante: guestData.nombreAcompnanante || '',
          apellidoAcompanante: guestData.apellidoAcompanante || '',
          menuAcompanante: guestData.menuAcompanante || '',
          mail: guestData.mail
        });
        
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
      return this.mockGuests.map(({ mail, ...guest }) => guest);
    } catch (error) {
      throw new Error('Error al listar los invitados');
    }
  }

  async exportGuests(): Promise<void> {
    try {
      const guests = await this.getAllGuests();
      await this.exportService.exportGuestsToExcel(guests);
    } catch (error) {
      console.log('📁 Export requested (using mock data)');
    }
  }
}
