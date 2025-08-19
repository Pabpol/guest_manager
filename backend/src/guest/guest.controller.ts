import { Controller, Post, Get, Body, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/guest.dto';

@Controller()
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post('form')
  async submitForm(@Body() guestData: CreateGuestDto, @Res() res: Response) {
    try {
      const success = await this.guestService.addGuest(guestData);
      if (success) {
        return res.json({ success: true, redirect: '/confirmado' });
      } else {
        return res.json({ success: true, redirect: '/ya-confirmado' });
      }
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al confirmar',
        redirect: '/error'
      });
    }
  }

  @Get('invitados')
  async getGuestsDashboard() {
    try {
      const guests = await this.guestService.getAllGuests();
      
      // Calculate statistics like the original dashboard
      const totalGuests = guests.length;
      const guestsWithCompanion = guests.filter(guest => 
        guest.nombreAcompnanante && guest.nombreAcompnanante.trim() !== ''
      ).length;
      const specialMenuCount = guests.filter(guest => 
        (guest.menu && guest.menu !== 'normal') || 
        (guest.menuAcompanante && guest.menuAcompanante !== 'normal')
      ).length;

      return {
        totalGuests,
        confirmedGuests: totalGuests, // All retrieved guests are confirmed
        guestsWithCompanion,
        specialMenuCount,
        totalPeople: totalGuests + guestsWithCompanion
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('download-list')
  async downloadGuestList(@Res() res: Response) {
    try {
      await this.guestService.exportGuests();
      
      // Wait for file generation (similar to original timeout)
      setTimeout(() => {
        res.download('invitados.xlsx');
      }, 5000);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error exporting guest list'
      });
    }
  }
}
