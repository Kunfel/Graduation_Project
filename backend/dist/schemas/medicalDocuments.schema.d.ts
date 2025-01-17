import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
export type MedicalDocumentsDocument = HydratedDocument<MedicalDocuments>;
export declare class MedicalDocuments {
    userId: User;
    title: string;
    fileUrl: string;
    fileType: string;
    uploadedAt: Date;
    public: boolean;
    cloudinaryId: string;
}
export declare const MedicalDocumentsSchema: mongoose.Schema<MedicalDocuments, mongoose.Model<MedicalDocuments, any, any, any, mongoose.Document<unknown, any, MedicalDocuments> & MedicalDocuments & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MedicalDocuments, mongoose.Document<unknown, {}, mongoose.FlatRecord<MedicalDocuments>> & mongoose.FlatRecord<MedicalDocuments> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
