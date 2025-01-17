import mongoose, { HydratedDocument } from 'mongoose';
export type ProfileDocument = HydratedDocument<Profile>;
export declare class Address {
    street: string;
    place: string;
    zipcode: string;
}
export declare class EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}
export declare class Profile {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    dateOfBirth: Date;
    insuranceNumber: string;
    address: Address;
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    diseases?: string;
    updatedAt: Date;
    emergencyContacts: EmergencyContact[];
    isActive: boolean;
    createdAt: Date;
}
export declare const ProfileSchema: mongoose.Schema<Profile, mongoose.Model<Profile, any, any, any, mongoose.Document<unknown, any, Profile> & Profile & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Profile, mongoose.Document<unknown, {}, mongoose.FlatRecord<Profile>> & mongoose.FlatRecord<Profile> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
