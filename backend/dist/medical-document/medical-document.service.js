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
exports.MedicalDocumentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const medicalDocuments_schema_1 = require("../schemas/medicalDocuments.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let MedicalDocumentService = class MedicalDocumentService {
    constructor(medicalDocumentModel, cloudinaryService) {
        this.medicalDocumentModel = medicalDocumentModel;
        this.cloudinaryService = cloudinaryService;
    }
    async uploadDocument(userId, file, title) {
        let uploadResult = null;
        try {
            uploadResult = await this.cloudinaryService.uploadBuffer(file.buffer, 'medical_documents');
            const document = new this.medicalDocumentModel({
                userId,
                title,
                fileUrl: uploadResult.secure_url,
                fileType: file.mimetype,
                cloudinaryId: uploadResult.public_id,
                uploadedAt: new Date(),
            });
            return await document.save();
        }
        catch (error) {
            if (error && uploadResult?.public_id) {
                await this.cloudinaryService.deleteFile(uploadResult.public_id);
            }
            throw error;
        }
    }
    async getUserDocuments(userId) {
        return this.medicalDocumentModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .exec();
    }
    async deleteDocument(userId, documentId) {
        const document = await this.medicalDocumentModel.findById(documentId);
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        if (document.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('Not authorized to delete this document');
        }
        try {
            if (document.cloudinaryId) {
                await this.cloudinaryService.deleteFile(document.cloudinaryId);
            }
            await document.deleteOne();
            return { success: true };
        }
        catch (error) {
            throw new Error('Failed to delete document');
        }
    }
    async updateDocument(userId, documentId, updateData) {
        const document = await this.medicalDocumentModel.findById(documentId);
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        if (document.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('Not authorized to update this document');
        }
        document.title = updateData.title;
        return await document.save();
    }
};
exports.MedicalDocumentService = MedicalDocumentService;
exports.MedicalDocumentService = MedicalDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medicalDocuments_schema_1.MedicalDocuments.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], MedicalDocumentService);
//# sourceMappingURL=medical-document.service.js.map