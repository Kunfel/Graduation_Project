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
exports.QRCodeController = void 0;
const common_1 = require("@nestjs/common");
const qr_code_service_1 = require("./qr-code.service");
const auth_guard_1 = require("../auth/auth.guard");
let QRCodeController = class QRCodeController {
    constructor(qrCodeService) {
        this.qrCodeService = qrCodeService;
    }
    async generateQRCode(req) {
        try {
            return await this.qrCodeService.generateQRCode(req.user.email);
        }
        catch (error) {
            throw error;
        }
    }
    async getQRCode(req) {
        try {
            return await this.qrCodeService.getQRCode(req.user.email);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('QR code not found');
            }
            throw error;
        }
    }
    async updateQRCode(req) {
        try {
            return await this.qrCodeService.updateQRCode(req.user.email);
        }
        catch (error) {
            throw error;
        }
    }
    async getEmergencyInfo(publicId) {
        try {
            return await this.qrCodeService.getEmergencyInfo(publicId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Emergency information not found');
            }
            throw error;
        }
    }
};
exports.QRCodeController = QRCodeController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QRCodeController.prototype, "generateQRCode", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QRCodeController.prototype, "getQRCode", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QRCodeController.prototype, "updateQRCode", null);
__decorate([
    (0, common_1.Get)('emergency/:publicId'),
    __param(0, (0, common_1.Param)('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QRCodeController.prototype, "getEmergencyInfo", null);
exports.QRCodeController = QRCodeController = __decorate([
    (0, common_1.Controller)('qr-code'),
    __metadata("design:paramtypes", [qr_code_service_1.QRCodeService])
], QRCodeController);
//# sourceMappingURL=qr-code.controller.js.map