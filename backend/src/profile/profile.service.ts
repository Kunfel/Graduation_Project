import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { Profile, ProfileDocument } from '../schemas/profile.schema'

type ProfileType = {
    userId: string;
    fullName: string;
    dateOfBirth: Date;
    insuranceNumber: string;
    address: string;
    bloodType: string;
    allergies: string[];
    medications: string[];
    diseases: string;
    emergencyContacts: string[];
    isActive: boolean;
};

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    ) { }

    async getProfiles(userId: string): Promise<ProfileDocument> {
        const profile = await this.profileModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();
        if (!profile) {
            // Wenn kein Profil existiert, erstellen wir ein leeres Profil
            const newProfile = await this.createProfile({
                userId: new mongoose.Types.ObjectId(userId),
                fullName: '',
                dateOfBirth: new Date(),
                insuranceNumber: '',
                address: {
                    street: '',
                    place: '',
                    zipcode: ''
                },
                bloodType: '',
                allergies: [],
                medications: [],
                diseases: '',
                emergencyContacts: []
            });
            return newProfile;
        }
        return profile;
    }

    async createProfile(profileData: Partial<Profile>): Promise<ProfileDocument> {
        const profile = new this.profileModel(profileData);
        return profile.save();
    }

    async updateProfile(userId: string, profileData: Partial<Profile>): Promise<ProfileDocument> {
        const profile = await this.profileModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();

        if (!profile) {
            return this.createProfile({
                ...profileData,
                userId: new mongoose.Types.ObjectId(userId)
            });
        }

        // Update existing profile
        Object.assign(profile, profileData);
        return profile.save();
    }

    async deleteProfile(userId: string): Promise<void> {
        const result = await this.profileModel.deleteOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Profile not found');
        }
    }
}
