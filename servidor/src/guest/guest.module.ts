import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestEntity } from './guest.entity';
import { GuestService } from './guest.service';
import { GuestResolver } from './guest.resolver';
import { SendMailService } from './sendMail.service';
import { ExportGuestsService } from './exportGuests.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuestEntity])],
  providers: [GuestService, GuestResolver, SendMailService, ExportGuestsService],
})
export class GuestModule {}
