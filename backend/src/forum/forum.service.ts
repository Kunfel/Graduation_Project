import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForumGroup } from '../schemas/forumGroup.schema';
import { ForumPost } from '../schemas/forumPost.schema';
import { Comment } from '../schemas/comment.schema';

@Injectable()
export class ForumService {
    constructor(
        @InjectModel(ForumGroup.name) private forumGroupModel: Model<ForumGroup>,
        @InjectModel(ForumPost.name) private forumPostModel: Model<ForumPost>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ) { }

    // Group Methods
    async createGroup(data: {
        name: string;
        disease: string;
        description?: string;
    }) {
        const group = new this.forumGroupModel(data);
        return await group.save();
    }

    async getGroups() {
        return this.forumGroupModel.find().populate('members', 'name');
    }

    async getGroupById(groupId: string) {
        const group = await this.forumGroupModel
            .findById(groupId)
            .populate('members', 'name');
        if (!group) throw new NotFoundException('Group not found');
        return group;
    }

    async joinGroup(groupId: string, userId: string) {
        const group = await this.forumGroupModel.findById(groupId);
        if (!group) throw new NotFoundException('Group not found');

        // if (!group.members.includes(userId)) {
        //     group.members.push(userId);
        //     await group.save();
        // }
        return group;
    }

    // Post Methods
    async createPost(userId: string, groupId: string, data: {
        title: string;
        content: string;
        tags?: string[];
    }) {
        const group = await this.forumGroupModel.findById(groupId);
        if (!group) throw new NotFoundException('Group not found');

        // if (!group.members.includes(userId)) {
        //     throw new ForbiddenException('Must be a group member to post');
        // }

        const post = new this.forumPostModel({
            userId,
            groupId,
            ...data,
        });
        return await post.save();
    }

    async getGroupPosts(groupId: string) {
        return this.forumPostModel
            .find({ groupId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
    }

    async getPost(postId: string) {
        const post = await this.forumPostModel
            .findById(postId)
            .populate('userId', 'name')
            .populate('groupId');
        if (!post) throw new NotFoundException('Post not found');
        return post;
    }

    // Comment Methods
    async addComment(userId: string, postId: string, content: string) {
        const post = await this.forumPostModel.findById(postId);
        if (!post) throw new NotFoundException('Post not found');

        const comment = new this.commentModel({
            userId,
            postId,
            content,
        });
        return await comment.save();
    }

    async getPostComments(postId: string) {
        return this.commentModel
            .find({ postId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
    }

    async deleteComment(userId: string, commentId: string) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) throw new NotFoundException('Comment not found');

        if (comment.userId.toString() !== userId) {
            throw new ForbiddenException('Not authorized to delete this comment');
        }

        await comment.deleteOne();
        return { success: true };
    }
}