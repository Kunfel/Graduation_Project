import { Model } from 'mongoose';
import { Profile, ProfileDocument } from '../schemas/profile.schema';
export declare class ProfileService {
    private profileModel;
    constructor(profileModel: Model<ProfileDocument>);
    getProfiles(userId: string): Promise<ProfileDocument>;
    createProfile(profileData: Partial<Profile>): Promise<ProfileDocument>;
    updateProfile(userId: string, profileData: Partial<Profile>): Promise<ProfileDocument>;
    deleteProfile(userId: string): Promise<void>;
}
