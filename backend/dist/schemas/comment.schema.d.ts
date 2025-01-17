import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { ForumPost } from './forumPost.schema';
export type CommentDocument = HydratedDocument<Comment>;
export declare class Comment {
    userId: User;
    postId: ForumPost;
    content: string;
    createdAt: Date;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Comment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
