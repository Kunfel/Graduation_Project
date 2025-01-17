import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type AiFirstAidDocument = HydratedDocument<AiFirstAid>;

@Schema({ timestamps: true })
export class AiFirstAid {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ required: true })
    disease: string;

    @Prop({ required: true })
    symptoms: string[];

    @Prop({ required: true })
    emergencyLevel: 'low' | 'medium' | 'high' | 'critical';

    @Prop({ required: true })
    firstAidSteps: string[];

    @Prop({ required: true })
    warnings: string[];

    @Prop({ required: true })
    additionalNotes: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const AiFirstAidSchema = SchemaFactory.createForClass(AiFirstAid);