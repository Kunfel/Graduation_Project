import { Model } from 'mongoose';
import { MedicalDocuments } from '../schemas/medicalDocuments.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class MedicalDocumentService {
    private medicalDocumentModel;
    private cloudinaryService;
    constructor(medicalDocumentModel: Model<MedicalDocuments>, cloudinaryService: CloudinaryService);
    uploadDocument(userId: string, file: Express.Multer.File, title: string): Promise<import("mongoose").Document<unknown, {}, MedicalDocuments> & MedicalDocuments & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserDocuments(userId: string): Promise<(import("mongoose").Document<unknown, {}, MedicalDocuments> & MedicalDocuments & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteDocument(userId: string, documentId: string): Promise<{
        success: boolean;
    }>;
    updateDocument(userId: string, documentId: string, updateData: {
        title: string;
    }): Promise<import("mongoose").Document<unknown, {}, MedicalDocuments> & MedicalDocuments & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
