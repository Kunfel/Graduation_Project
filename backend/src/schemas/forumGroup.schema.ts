import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ForumGroupDocument = HydratedDocument<ForumGroup>;

@Schema({ timestamps: true })
export class ForumGroup {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    disease: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    members: User[];

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ForumGroupSchema = SchemaFactory.createForClass(ForumGroup);