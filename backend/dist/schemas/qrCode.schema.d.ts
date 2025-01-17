import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
export type QrCodeDocument = HydratedDocument<QrCode>;
export declare class QrCode {
    userId: User;
    publicId: string;
    qrImageUrl: string;
    scanCount: number;
    lastScannedAt: Date;
    isActive: Boolean;
}
export declare const QrCodeSchema: mongoose.Schema<QrCode, mongoose.Model<QrCode, any, any, any, mongoose.Document<unknown, any, QrCode> & QrCode & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, QrCode, mongoose.Document<unknown, {}, mongoose.FlatRecord<QrCode>> & mongoose.FlatRecord<QrCode> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
