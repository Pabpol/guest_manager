import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { GuestResponseDto } from '../guest/dto/guest.dto';

@Injectable()
export class ExportService {
  async exportGuestsToExcel(guests: GuestResponseDto[]): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Invitados');

      // Column headers
      worksheet.columns = [
        { header: 'Nombre Invitado', key: 'nombre', width: 30 },
        { header: 'Apellido Invitado', key: 'apellido', width: 30 },
        { header: 'Menú', key: 'menu', width: 30 },
        { header: 'Nombre Acompañante', key: 'nombreAcompnanante', width: 30 },
        { header: 'Apellido Acompañante', key: 'apellidoAcompanante', width: 30 },
        { header: 'Menú Acompañante', key: 'menuAcompanante', width: 30 },
      ];

      // Add guest data
      guests.forEach((guest) => {
        worksheet.addRow(guest);
      });

      // Make first row bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Save file
      await workbook.xlsx.writeFile('invitados.xlsx');
    } catch (error) {
      throw new Error('Error al exportar la lista');
    }
  }
}
