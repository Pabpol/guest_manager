import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { Guest } from './guest.model';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';

@Module({
  imports: [SequelizeModule.forFeature([Guest])],
  controllers: [GuestController],
  providers: [GuestService, EmailService, ExportService],
  exports: [GuestService],
})
export class GuestModule {}
