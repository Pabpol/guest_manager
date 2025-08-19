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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const guest_model_1 = require("./guest.model");
const email_service_1 = require("../email/email.service");
const export_service_1 = require("../export/export.service");
let GuestService = class GuestService {
    guestModel;
    emailService;
    exportService;
    constructor(guestModel, emailService, exportService) {
        this.guestModel = guestModel;
        this.emailService = emailService;
        this.exportService = exportService;
    }
    async addGuest(guestData) {
        try {
            if (!guestData.mail || guestData.mail === '') {
                throw new Error('El mail es un campo obligatorio.');
            }
            const existingGuest = await this.guestModel.findOne({
                where: { mail: guestData.mail }
            });
            if (!existingGuest) {
                const guestCreateData = {
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
            throw new Error('Error al exportar los invitados');
        }
    }
};
exports.GuestService = GuestService;
exports.GuestService = GuestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(guest_model_1.Guest)),
    __metadata("design:paramtypes", [Object, email_service_1.EmailService,
        export_service_1.ExportService])
], GuestService);
//# sourceMappingURL=guest.service.js.map