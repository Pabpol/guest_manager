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
exports.GuestController = void 0;
const common_1 = require("@nestjs/common");
const guest_service_1 = require("./guest.service");
const guest_dto_1 = require("./dto/guest.dto");
let GuestController = class GuestController {
    guestService;
    constructor(guestService) {
        this.guestService = guestService;
    }
    async submitForm(guestData, res) {
        try {
            const success = await this.guestService.addGuest(guestData);
            if (success) {
                return res.json({ success: true, redirect: '/confirmado' });
            }
            else {
                return res.json({ success: true, redirect: '/ya-confirmado' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error al confirmar',
                redirect: '/error'
            });
        }
    }
    async getGuestsDashboard() {
        try {
            const guests = await this.guestService.getAllGuests();
            const totalGuests = guests.length;
            const guestsWithCompanion = guests.filter(guest => guest.nombreAcompnanante && guest.nombreAcompnanante.trim() !== '').length;
            const specialMenuCount = guests.filter(guest => (guest.menu && guest.menu !== 'normal') ||
                (guest.menuAcompanante && guest.menuAcompanante !== 'normal')).length;
            return {
                totalGuests,
                confirmedGuests: totalGuests,
                guestsWithCompanion,
                specialMenuCount,
                totalPeople: totalGuests + guestsWithCompanion
            };
        }
        catch (error) {
            throw error;
        }
    }
    async downloadGuestList(res) {
        try {
            await this.guestService.exportGuests();
            setTimeout(() => {
                res.download('invitados.xlsx');
            }, 5000);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error exporting guest list'
            });
        }
    }
};
exports.GuestController = GuestController;
__decorate([
    (0, common_1.Post)('form'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guest_dto_1.CreateGuestDto, Object]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "submitForm", null);
__decorate([
    (0, common_1.Get)('invitados'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "getGuestsDashboard", null);
__decorate([
    (0, common_1.Get)('download-list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "downloadGuestList", null);
exports.GuestController = GuestController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [guest_service_1.GuestService])
], GuestController);
//# sourceMappingURL=guest.controller.js.map