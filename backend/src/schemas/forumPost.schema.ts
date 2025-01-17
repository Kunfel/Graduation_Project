import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { ForumGroup } from './forumGroup.schema';

export type ForumPostDocument = HydratedDocument<ForumPost>;

@Schema({ timestamps: true })
export class ForumPost {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ForumGroup', required: true })
    groupId: ForumGroup;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop([String])
    tags: string[];

    @Prop()
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}
export const ForumPostSchema = SchemaFactory.createForClass(ForumPost);       