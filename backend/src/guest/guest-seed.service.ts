import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './guest.model';

@Injectable()
export class GuestSeedService implements OnModuleInit {
    constructor(
        @InjectRepository(Guest)
        private readonly guestRepository: Repository<Guest>,
    ) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        try {
            // Check if we already have data
            const count = await this.guestRepository.count();
            if (count > 0) {
                console.log('🌱 Database already has data, skipping seed');
                return;
            }

            // Seed initial data
            const seedGuests: Partial<Guest>[] = [
                {
                    nombre: 'Juan',
                    apellido: 'Pérez',
                    menu: 'vegetariano',
                    tieneAcompanante: true,
                    nombreAcompnanante: 'María',
                    apellidoAcompanante: 'González',
                    menuAcompanante: 'normal',
                    mail: 'juan@example.com'
                },
                {
                    nombre: 'Ana',
                    apellido: 'García',
                    menu: 'normal',
                    tieneAcompanante: false,
                    nombreAcompnanante: '',
                    apellidoAcompanante: '',
                    menuAcompanante: '',
                    mail: 'ana@example.com'
                },
                {
                    nombre: 'Carlos',
                    apellido: 'Rodríguez',
                    menu: 'Sin gluten',
                    tieneAcompanante: true,
                    nombreAcompnanante: 'Laura',
                    apellidoAcompanante: 'Martínez',
                    menuAcompanante: 'vegetariano',
                    mail: 'carlos@example.com'
                }
            ];

            await this.guestRepository.save(seedGuests);
            console.log('🌱 Database seeded with initial guest data');
        } catch (error) {
            console.error('❌ Error seeding database:', error);
        }
    }
}
