import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalDocuments } from '../schemas/medicalDocuments.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';

@Injectable()
export class MedicalDocumentService {
    constructor(
        @InjectModel(MedicalDocuments.name)
        private medicalDocumentModel: Model<MedicalDocuments>,
        private cloudinaryService: CloudinaryService,
    ) { }

    async uploadDocument(
        userId: string,
        file: Express.Multer.File,
        title: string,
    ) {
        let uploadResult: CloudinaryResponse | null = null;
        try {
            // Upload to Cloudinary
            uploadResult = await this.cloudinaryService.uploadBuffer(file.buffer, 'medical_documents');

            // Create document record
            const document = new this.medicalDocumentModel({
                userId,
                title,
                fileUrl: uploadResult.secure_url,
                fileType: file.mimetype,
                cloudinaryId: uploadResult.public_id,
                uploadedAt: new Date(),
            });

            return await document.save();
        } catch (error) {
            // If document creation fails, delete from Cloudinary
            if (error && uploadResult?.public_id) {
                await this.cloudinaryService.deleteFile(uploadResult.public_id);
            }
            throw error;
        }
    }

    async getUserDocuments(userId: string) {
        return this.medicalDocumentModel
            .find({ userId })
            .sort({ createdAt: -1 }) // Latest first
            .exec();
    }

    async deleteDocument(userId: string, documentId: string) {
        const document = await this.medicalDocumentModel.findById(documentId);

        if (!document) {
            throw new NotFoundException('Document not found');
        }

        if (document.userId.toString() !== userId) {
            throw new ForbiddenException('Not authorized to delete this document');
        }

        try {
            // Delete from Cloudinary first
            if (document.cloudinaryId) {
                await this.cloudinaryService.deleteFile(document.cloudinaryId);
            }

            // Then delete from database
            await document.deleteOne();
            return { success: true };
        } catch (error) {
            throw new Error('Failed to delete document');
        }
    }

    async updateDocument(
        userId: string,
        documentId: string,
        updateData: { title: string }
    ) {
        const document = await this.medicalDocumentModel.findById(documentId);

        if (!document) {
            throw new NotFoundException('Document not found');
        }

        if (document.userId.toString() !== userId) {
            throw new ForbiddenException('Not authorized to update this document');
        }

        document.title = updateData.title;
        return await document.save();
    }
}