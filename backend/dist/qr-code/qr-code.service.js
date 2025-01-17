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
exports.QRCodeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const qrCode_schema_1 = require("../schemas/qrCode.schema");
const profile_schema_1 = require("../schemas/profile.schema");
const qrcode_1 = require("qrcode");
const crypto_1 = require("crypto");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const profile_service_1 = require("../profile/profile.service");
const user_schema_1 = require("../schemas/user.schema");
let QRCodeService = class QRCodeService {
    constructor(qrCodeModel, profileModel, userModel, cloudinaryService, profileService) {
        this.qrCodeModel = qrCodeModel;
        this.profileModel = profileModel;
        this.userModel = userModel;
        this.cloudinaryService = cloudinaryService;
        this.profileService = profileService;
    }
    generatePublicId() {
        return (0, crypto_1.randomBytes)(16).toString('hex');
    }
    async generateQRCodeBuffer(data) {
        return qrcode_1.default.toBuffer(data, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 400,
        });
    }
    async generateQRCode(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const profile = await this.profileModel.findOne({ userId: user._id }).exec();
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const publicId = this.generatePublicId();
        const qrCodeBuffer = await this.generateQRCodeBuffer(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/emergency/${publicId}`);
        const uploadResult = await this.cloudinaryService.uploadBuffer(qrCodeBuffer, 'qr-codes');
        const existingQRCode = await this.qrCodeModel.findOne({ email }).exec();
        if (existingQRCode) {
            existingQRCode.publicId = publicId;
            existingQRCode.qrImageUrl = uploadResult.secure_url;
            await existingQRCode.save();
            return existingQRCode;
        }
        const newQRCode = new this.qrCodeModel({
            userId: user._id,
            publicId,
            qrImageUrl: uploadResult.secure_url,
            scanCount: 0,
            isActive: true
        });
        await newQRCode.save();
        return newQRCode;
    }
    async getQRCode(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            console.log('User not found for email:', email);
            throw new common_1.NotFoundException('User not found');
        }
        const qrCode = await this.qrCodeModel.findOne({ userId: user._id }).exec();
        if (!qrCode) {
            throw new common_1.NotFoundException('QR code not found');
        }
        return qrCode;
    }
    async updateQRCode(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const profile = await this.profileModel.findOne({ userId: user._id }).exec();
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        const qrCode = await this.qrCodeModel.findOne({ userId: user._id }).exec();
        if (!qrCode) {
            throw new common_1.NotFoundException('QR code not found');
        }
        return qrCode;
    }
    async getEmergencyInfo(publicId) {
        const qrCode = await this.qrCodeModel.findOne({ publicId }).exec();
        if (!qrCode) {
            throw new common_1.NotFoundException('Emergency information not found');
        }
        qrCode.scanCount += 1;
        await qrCode.save();
        return qrCode;
    }
};
exports.QRCodeService = QRCodeService;
exports.QRCodeService = QRCodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(qrCode_schema_1.QrCode.name)),
    __param(1, (0, mongoose_1.InjectModel)(profile_schema_1.Profile.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService,
        profile_service_1.ProfileService])
], QRCodeService);
//# sourceMappingURL=qr-code.service.js.map