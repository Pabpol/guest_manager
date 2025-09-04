import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { GuestSeedService } from './guest-seed.service';
import { Guest } from './guest.model';
import { EmailService } from '../email/email.service';
import { ExportService } from '../export/export.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guest])
  ],
  controllers: [GuestController],
  providers: [GuestService, GuestSeedService, EmailService, ExportService],
  exports: [GuestService],
})
export class GuestModule { }
