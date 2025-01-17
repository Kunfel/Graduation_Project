import { QRCodeService } from './qr-code.service';
export declare class QRCodeController {
    private readonly qrCodeService;
    constructor(qrCodeService: QRCodeService);
    generateQRCode(req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getQRCode(req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateQRCode(req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getEmergencyInfo(publicId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("../schemas/qrCode.schema").QrCode> & import("../schemas/qrCode.schema").QrCode & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
