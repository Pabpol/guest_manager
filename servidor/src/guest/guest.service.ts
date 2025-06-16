import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestEntity } from './guest.entity';
import { SendMailService } from './sendMail.service';
import { ExportGuestsService } from './exportGuests.service';
import { GuestInput } from './dto/guest.input';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(GuestEntity) private repo: Repository<GuestEntity>,
    private mailer: SendMailService,
    private exporter: ExportGuestsService,
  ) {}

  async addGuest(input: GuestInput): Promise<boolean> {
    if (!input.mail) {
      throw new Error('El mail es un cmapo obligatorio.');
    }
    const exists = await this.repo.findOne({ where: { mail: input.mail } });
    if (exists) return false;
    const guest = this.repo.create(input as any);
    await this.repo.save(guest);
    await this.mailer.send(input.mail);
    return true;
  }

  async listGuests(): Promise<GuestEntity[]> {
    const guests = await this.repo.find();
    await this.exporter.export(guests);
    return guests;
  }
}
