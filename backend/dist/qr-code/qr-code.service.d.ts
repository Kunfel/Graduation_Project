import { Model } from 'mongoose';
import { QrCode, QrCodeDocument } from '../schemas/qrCode.schema';
import { Profile } from '../schemas/profile.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProfileService } from '../profile/profile.service';
import { User } from 'src/schemas/user.schema';
export declare class QRCodeService {
    private qrCodeModel;
    private profileModel;
    private userModel;
    private cloudinaryService;
    private profileService;
    constructor(qrCodeModel: Model<QrCodeDocument>, profileModel: Model<Profile>, userModel: Model<User>, cloudinaryService: CloudinaryService, profileService: ProfileService);
    private generatePublicId;
    private generateQRCodeBuffer;
    generateQRCode(email: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getQRCode(email: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateQRCode(email: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getEmergencyInfo(publicId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, QrCode> & QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
