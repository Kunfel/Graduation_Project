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
exports.ForumController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const forum_service_1 = require("./forum.service");
let ForumController = class ForumController {
    constructor(forumService) {
        this.forumService = forumService;
    }
    async createGroup(data) {
        return this.forumService.createGroup(data);
    }
    async getGroups() {
        return this.forumService.getGroups();
    }
    async getGroup(id) {
        return this.forumService.getGroupById(id);
    }
    async joinGroup(req, groupId) {
        return this.forumService.joinGroup(groupId, req.user.sub);
    }
    async createPost(req, groupId, data) {
        return this.forumService.createPost(req.user.sub, groupId, data);
    }
    async getGroupPosts(groupId) {
        return this.forumService.getGroupPosts(groupId);
    }
    async getPost(id) {
        return this.forumService.getPost(id);
    }
    async addComment(req, postId, content) {
        return this.forumService.addComment(req.user.sub, postId, content);
    }
    async getPostComments(postId) {
        return this.forumService.getPostComments(postId);
    }
    async deleteComment(req, commentId) {
        return this.forumService.deleteComment(req.user.sub, commentId);
    }
};
exports.ForumController = ForumController;
__decorate([
    (0, common_1.Post)('groups'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)('groups'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Get)('groups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getGroup", null);
__decorate([
    (0, common_1.Put)('groups/:id/join'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Post)('groups/:groupId/posts'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('groups/:groupId/posts'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getGroupPosts", null);
__decorate([
    (0, common_1.Get)('posts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)('posts/:postId/comments'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)('posts/:postId/comments'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getPostComments", null);
__decorate([
    (0, common_1.Delete)('comments/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "deleteComment", null);
exports.ForumController = ForumController = __decorate([
    (0, common_1.Controller)('forum'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumController);
//# sourceMappingURL=forum.controller.js.map