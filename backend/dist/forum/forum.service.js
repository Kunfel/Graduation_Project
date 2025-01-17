"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const forumGroup_schema_1 = require("../schemas/forumGroup.schema");
const forumPost_schema_1 = require("../schemas/forumPost.schema");
const comment_schema_1 = require("../schemas/comment.schema");
let ForumService = class ForumService {
    constructor(forumGroupModel, forumPostModel, commentModel) {
        this.forumGroupModel = forumGroupModel;
        this.forumPostModel = forumPostModel;
        this.commentModel = commentModel;
    }
    async createGroup(data) {
        const group = new this.forumGroupModel(data);
        return await group.save();
    }
    async getGroups() {
        return this.forumGroupModel.find().populate('members', 'name');
    }
    async getGroupById(groupId) {
        const group = await this.forumGroupModel
            .findById(groupId)
            .populate('members', 'name');
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        return group;
    }
    async joinGroup(groupId, userId) {
        const group = await this.forumGroupModel.findById(groupId);
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        return group;
    }
    async createPost(userId, groupId, data) {
        const group = await this.forumGroupModel.findById(groupId);
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        const post = new this.forumPostModel({
            userId,
            groupId,
            ...data,
        });
        return await post.save();
    }
    async getGroupPosts(groupId) {
        return this.forumPostModel
            .find({ groupId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
    }
    async getPost(postId) {
        const post = await this.forumPostModel
            .findById(postId)
            .populate('userId', 'name')
            .populate('groupId');
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async addComment(userId, postId, content) {
        const post = await this.forumPostModel.findById(postId);
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const comment = new this.commentModel({
            userId,
            postId,
            content,
        });
        return await comment.save();
    }
    async getPostComments(postId) {
        return this.commentModel
            .find({ postId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
    }
    async deleteComment(userId, commentId) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        if (comment.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('Not authorized to delete this comment');
        }
        await comment.deleteOne();
        return { success: true };
    }
};
exports.ForumService = ForumService;
exports.ForumService = ForumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(forumGroup_schema_1.ForumGroup.name)),
    __param(1, (0, mongoose_1.InjectModel)(forumPost_schema_1.ForumPost.name)),
    __param(2, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ForumService);
//# sourceMappingURL=forum.service.js.map