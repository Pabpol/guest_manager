import { Injectable } from '@nestjs/common';
import * as excelJS from 'exceljs';
import { GuestEntity } from './guest.entity';

@Injectable()
export class ExportGuestsService {
  async export(guests: GuestEntity[]): Promise<void> {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Invitados');
    worksheet.columns = [
      { header: 'Nombre Invitado', key: 'nombre', width: 30 },
      { header: 'Apellido Invitado', key: 'apellido', width: 30 },
      { header: 'Menú', key: 'menu', width: 30 },
      { header: 'Nombre Acompañante', key: 'nombreAcompnanante', width: 30 },
      { header: 'Apellido Acompañante', key: 'apellidoAcompanante', width: 30 },
      { header: 'Menú Acompañante', key: 'menuAcompanante', width: 30 },
    ];
    guests.forEach(g => worksheet.addRow(g));
    worksheet.getRow(1).eachCell(cell => { cell.font = { bold: true }; });
    await workbook.xlsx.writeFile('invitados.xlsx');
  }
}
