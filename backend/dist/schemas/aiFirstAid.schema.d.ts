import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
export type AiFirstAidDocument = HydratedDocument<AiFirstAid>;
export declare class AiFirstAid {
    userId: User;
    disease: string;
    symptoms: string[];
    emergencyLevel: 'low' | 'medium' | 'high' | 'critical';
    firstAidSteps: string[];
    warnings: string[];
    additionalNotes: string;
    createdAt: Date;
}
export declare const AiFirstAidSchema: mongoose.Schema<AiFirstAid, mongoose.Model<AiFirstAid, any, any, any, mongoose.Document<unknown, any, AiFirstAid> & AiFirstAid & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, AiFirstAid, mongoose.Document<unknown, {}, mongoose.FlatRecord<AiFirstAid>> & mongoose.FlatRecord<AiFirstAid> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
