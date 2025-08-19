import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Guest } from './guest.model';
import { CreateGuestDto, GuestResponseDto } from './dto/guest.dto';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel(Guest)
    private readonly guestModel: typeof Guest,
    private readonly emailService: EmailService,
    private readonly exportService: ExportService,
  ) {}

  async addGuest(guestData: CreateGuestDto): Promise<boolean> {
    try {
      if (!guestData.mail || guestData.mail === '') {
        throw new Error('El mail es un campo obligatorio.');
      }

      const existingGuest = await this.guestModel.findOne({
        where: { mail: guestData.mail }
      });

      if (!existingGuest) {
        const guestCreateData: any = {
          nombre: guestData.nombre,
          apellido: guestData.apellido,
          menu: guestData.menu,
          tieneAcompanante: guestData.tieneAcompanante,
          nombreAcompnanante: guestData.nombreAcompnanante,
          apellidoAcompanante: guestData.apellidoAcompanante,
          menuAcompanante: guestData.menuAcompanante,
          mail: guestData.mail,
        };
        await this.guestModel.create(guestCreateData);
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
      const guests = await this.guestModel.findAll({
        attributes: [
          'nombre',
          'apellido', 
          'menu',
          'nombreAcompnanante',
          'apellidoAcompanante',
          'menuAcompanante'
        ]
      });
      return guests.map(guest => guest.toJSON());
    } catch (error) {
      throw new Error('Error al listar los invitados');
    }
  }

  async exportGuests(): Promise<void> {
    try {
      const guests = await this.getAllGuests();
      await this.exportService.exportGuestsToExcel(guests);
    } catch (error) {
      throw new Error('Error al exportar los invitados');
    }
  }
}
