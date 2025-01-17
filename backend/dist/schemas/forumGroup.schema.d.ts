import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
export type ForumGroupDocument = HydratedDocument<ForumGroup>;
export declare class ForumGroup {
    name: string;
    disease: string;
    members: User[];
    createdAt: Date;
}
export declare const ForumGroupSchema: mongoose.Schema<ForumGroup, mongoose.Model<ForumGroup, any, any, any, mongoose.Document<unknown, any, ForumGroup> & ForumGroup & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ForumGroup, mongoose.Document<unknown, {}, mongoose.FlatRecord<ForumGroup>> & mongoose.FlatRecord<ForumGroup> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
