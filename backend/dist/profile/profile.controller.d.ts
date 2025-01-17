import { ProfileService } from './profile.service';
import { Profile } from '../schemas/profile.schema';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateProfile(req: any, profileData: Partial<Profile>): Promise<import("mongoose").Document<unknown, {}, Profile> & Profile & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
