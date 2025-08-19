"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const export_service_1 = require("../export/export.service");
let GuestService = class GuestService {
    emailService;
    exportService;
    mockGuests = [
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
    constructor(emailService, exportService) {
        this.emailService = emailService;
        this.exportService = exportService;
    }
    async addGuest(guestData) {
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
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw new Error('El mail es un campo obligatorio.');
        }
    }
    async getAllGuests() {
        try {
            return this.mockGuests.map(({ mail, ...guest }) => guest);
        }
        catch (error) {
            throw new Error('Error al listar los invitados');
        }
    }
    async exportGuests() {
        try {
            const guests = await this.getAllGuests();
            await this.exportService.exportGuestsToExcel(guests);
        }
        catch (error) {
            console.log('📁 Export requested (using mock data)');
        }
    }
};
exports.GuestService = GuestService;
exports.GuestService = GuestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        export_service_1.ExportService])
], GuestService);
//# sourceMappingURL=guest.service.js.map