import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type MedicalDocumentsDocument = HydratedDocument<MedicalDocuments>;

@Schema({ timestamps: true })
export class MedicalDocuments {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    fileUrl: string;

    @Prop({ required: true })
    fileType: string;

    @Prop()
    uploadedAt: Date;

    @Prop()
    public: boolean;

    @Prop()
    cloudinaryId: string;
}

export const MedicalDocumentsSchema = SchemaFactory.createForClass(MedicalDocuments);