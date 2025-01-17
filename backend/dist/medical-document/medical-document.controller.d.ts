import { MedicalDocumentService } from './medical-document.service';
export declare class MedicalDocumentController {
    private readonly medicalDocumentService;
    constructor(medicalDocumentService: MedicalDocumentService);
    uploadDocument(req: any, file: Express.Multer.File, title: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/medicalDocuments.schema").MedicalDocuments> & import("../schemas/medicalDocuments.schema").MedicalDocuments & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUserDocuments(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/medicalDocuments.schema").MedicalDocuments> & import("../schemas/medicalDocuments.schema").MedicalDocuments & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteDocument(req: any, documentId: string): Promise<{
        success: boolean;
    }>;
    updateDocument(req: any, documentId: string, title: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/medicalDocuments.schema").MedicalDocuments> & import("../schemas/medicalDocuments.schema").MedicalDocuments & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
