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
exports.MedicalDocumentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
const medical_document_service_1 = require("./medical-document.service");
let MedicalDocumentController = class MedicalDocumentController {
    constructor(medicalDocumentService) {
        this.medicalDocumentService = medicalDocumentService;
    }
    async uploadDocument(req, file, title) {
        return this.medicalDocumentService.uploadDocument(req.user.sub, file, title);
    }
    async getUserDocuments(req) {
        return this.medicalDocumentService.getUserDocuments(req.user.sub);
    }
    async deleteDocument(req, documentId) {
        return this.medicalDocumentService.deleteDocument(req.user.sub, documentId);
    }
    async updateDocument(req, documentId, title) {
        return this.medicalDocumentService.updateDocument(req.user.sub, documentId, { title });
    }
};
exports.MedicalDocumentController = MedicalDocumentController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(pdf|doc|docx|jpg|jpeg|png)$/ }),
        ],
    }))),
    __param(2, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], MedicalDocumentController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicalDocumentController.prototype, "getUserDocuments", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MedicalDocumentController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], MedicalDocumentController.prototype, "updateDocument", null);
exports.MedicalDocumentController = MedicalDocumentController = __decorate([
    (0, common_1.Controller)('medical-document'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [medical_document_service_1.MedicalDocumentService])
], MedicalDocumentController);
//# sourceMappingURL=medical-document.controller.js.map