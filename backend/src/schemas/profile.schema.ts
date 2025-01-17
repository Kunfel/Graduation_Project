import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Address {
    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    place: string;

    @Prop({ required: true })
    zipcode: string;
}

export class EmergencyContact {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    relationship: string;

    @Prop({ required: true })
    phone: string;
}

@Schema()
export class Profile {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    dateOfBirth: Date;

    @Prop({ required: true })
    insuranceNumber: string;

    @Prop({ type: Address, required: true })
    address: Address;

    @Prop({ enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] })
    bloodType?: string;

    @Prop([String])
    allergies?: string[];

    @Prop([String])
    medications?: string[];

    @Prop({ type: String })
    diseases?: string;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ type: [EmergencyContact], default: [] })
    emergencyContacts: EmergencyContact[];

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);