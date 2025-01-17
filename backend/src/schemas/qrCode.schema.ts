import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type QrCodeDocument = HydratedDocument<QrCode>;

@Schema({ timestamps: true })
export class QrCode {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ required: true })
    publicId: string;

    @Prop()
    qrImageUrl: string;

    @Prop({ default: 0 })
    scanCount: number;

    @Prop()
    lastScannedAt: Date;

    @Prop()
    isActive: Boolean;

}
export const QrCodeSchema = SchemaFactory.createForClass(QrCode);       