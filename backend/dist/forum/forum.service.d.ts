import { Model } from 'mongoose';
import { ForumGroup } from '../schemas/forumGroup.schema';
import { ForumPost } from '../schemas/forumPost.schema';
import { Comment } from '../schemas/comment.schema';
export declare class ForumService {
    private forumGroupModel;
    private forumPostModel;
    private commentModel;
    constructor(forumGroupModel: Model<ForumGroup>, forumPostModel: Model<ForumPost>, commentModel: Model<Comment>);
    createGroup(data: {
        name: string;
        disease: string;
        description?: string;
    }): Promise<import("mongoose").Document<unknown, {}, ForumGroup> & ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getGroups(): Promise<(import("mongoose").Document<unknown, {}, ForumGroup> & ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getGroupById(groupId: string): Promise<import("mongoose").Document<unknown, {}, ForumGroup> & ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    joinGroup(groupId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, ForumGroup> & ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createPost(userId: string, groupId: string, data: {
        title: string;
        content: string;
        tags?: string[];
    }): Promise<import("mongoose").Document<unknown, {}, ForumPost> & ForumPost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getGroupPosts(groupId: string): Promise<(import("mongoose").Document<unknown, {}, ForumPost> & ForumPost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPost(postId: string): Promise<import("mongoose").Document<unknown, {}, ForumPost> & ForumPost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    addComment(userId: string, postId: string, content: string): Promise<import("mongoose").Document<unknown, {}, Comment> & Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPostComments(postId: string): Promise<(import("mongoose").Document<unknown, {}, Comment> & Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteComment(userId: string, commentId: string): Promise<{
        success: boolean;
    }>;
}
