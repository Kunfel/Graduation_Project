import { ForumService } from './forum.service';
export declare class ForumController {
    private readonly forumService;
    constructor(forumService: ForumService);
    createGroup(data: {
        name: string;
        disease: string;
        description?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/forumGroup.schema").ForumGroup> & import("../schemas/forumGroup.schema").ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getGroups(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/forumGroup.schema").ForumGroup> & import("../schemas/forumGroup.schema").ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getGroup(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/forumGroup.schema").ForumGroup> & import("../schemas/forumGroup.schema").ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    joinGroup(req: any, groupId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/forumGroup.schema").ForumGroup> & import("../schemas/forumGroup.schema").ForumGroup & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createPost(req: any, groupId: string, data: {
        title: string;
        content: string;
        tags?: string[];
    }): Promise<import("mongoose").Document<unknown, {}, import("../schemas/forumPost.schema").ForumPost> & import("../schemas/forumPost.schema").ForumPost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getGroupPosts(groupId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/forumPost.schema").ForumPost> & import("../schemas/forumPost.schema").ForumPost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPost(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/forumPost.schema").ForumPost> & import("../schemas/forumPost.schema").ForumPost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    addComment(req: any, postId: string, content: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/comment.schema").Comment> & import("../schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getPostComments(postId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/comment.schema").Comment> & import("../schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteComment(req: any, commentId: string): Promise<{
        success: boolean;
    }>;
}
