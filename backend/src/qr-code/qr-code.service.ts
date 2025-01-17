import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QrCode, QrCodeDocument } from '../schemas/qrCode.schema';
import { Profile } from '../schemas/profile.schema';
import QRCode from 'qrcode';
import { randomBytes } from 'crypto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProfileService } from '../profile/profile.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class QRCodeService {
    constructor(
        @InjectModel(QrCode.name) private qrCodeModel: Model<QrCodeDocument>,
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
        @InjectModel(User.name) private userModel: Model<User>,
        private cloudinaryService: CloudinaryService,
        private profileService: ProfileService,
    ) { }

    private generatePublicId(): string {
        return randomBytes(16).toString('hex');
    }

    private async generateQRCodeBuffer(data: string): Promise<Buffer> {
        return QRCode.toBuffer(data, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 400,
        });
    }

    async generateQRCode(email: string) {
        // Find user by email
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Get user's profile data
        const profile = await this.profileModel.findOne({ userId: user._id }).exec();
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }


        // Generate a unique public ID for the QR code
        const publicId = this.generatePublicId();

        // Generate QR code buffer
        const qrCodeBuffer = await this.generateQRCodeBuffer(
            `${process.env.FRONTEND_URL || 'http://localhost:3000'}/emergency/${publicId}`
        );

        // Upload QR code to Cloudinary
        const uploadResult = await this.cloudinaryService.uploadBuffer(qrCodeBuffer, 'qr-codes');
        // Create or update QR code document
        const existingQRCode = await this.qrCodeModel.findOne({ email }).exec();
        if (existingQRCode) {
            existingQRCode.publicId = publicId;
            existingQRCode.qrImageUrl = uploadResult.secure_url;
            await existingQRCode.save();
            return existingQRCode;
        }

        // Create new QR code
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

    async getQRCode(email: string) {

        // First find the user by email
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            console.log('User not found for email:', email);
            throw new NotFoundException('User not found');
        }

        // Then find QR code by userId
        const qrCode = await this.qrCodeModel.findOne({ userId: user._id }).exec();
        if (!qrCode) {
            throw new NotFoundException('QR code not found');
        }

        return qrCode;
    }

    async updateQRCode(email: string) {
        // Find user by email first
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Get user's profile
        const profile = await this.profileModel.findOne({ userId: user._id }).exec();
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        // Get existing QR code
        const qrCode = await this.qrCodeModel.findOne({ userId: user._id }).exec();
        if (!qrCode) {
            throw new NotFoundException('QR code not found');
        }

        return qrCode;
    }

    async getEmergencyInfo(publicId: string) {
        const qrCode = await this.qrCodeModel.findOne({ publicId }).exec();
        if (!qrCode) {
            throw new NotFoundException('Emergency information not found');
        }

        // Increment scan count
        qrCode.scanCount += 1;
        await qrCode.save();

        return qrCode;
    }
}