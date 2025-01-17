import { CloudinaryResponse } from './cloudinary-response';
export declare class CloudinaryService {
    constructor();
    uploadBuffer(buffer: Buffer, folder: string): Promise<CloudinaryResponse>;
    deleteFile(publicId: string): Promise<void>;
}
