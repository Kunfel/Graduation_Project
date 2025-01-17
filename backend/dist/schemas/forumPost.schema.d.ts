import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { ForumGroup } from './forumGroup.schema';
export type ForumPostDocument = HydratedDocument<ForumPost>;
export declare class ForumPost {
    userId: User;
    groupId: ForumGroup;
    title: string;
    content: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const ForumPostSchema: mongoose.Schema<ForumPost, mongoose.Model<ForumPost, any, any, any, mongoose.Document<unknown, any, ForumPost> & ForumPost & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ForumPost, mongoose.Document<unknown, {}, mongoose.FlatRecord<ForumPost>> & mongoose.FlatRecord<ForumPost> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
