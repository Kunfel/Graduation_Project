import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { ForumPost } from './forumPost.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost', required: true })
    postId: ForumPost;

    @Prop({ required: true })
    content: string;

    @Prop()
    createdAt: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);       