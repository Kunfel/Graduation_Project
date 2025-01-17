import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ForumService } from './forum.service';

@Controller('forum')
@UseGuards(AuthGuard)
export class ForumController {
    constructor(private readonly forumService: ForumService) { }

    // Group Routes
    @Post('groups')
    async createGroup(
        @Body() data: {
            name: string;
            disease: string;
            description?: string;
        },
    ) {
        return this.forumService.createGroup(data);
    }

    @Get('groups')
    async getGroups() {
        return this.forumService.getGroups();
    }

    @Get('groups/:id')
    async getGroup(@Param('id') id: string) {
        return this.forumService.getGroupById(id);
    }

    @Put('groups/:id/join')
    async joinGroup(@Request() req, @Param('id') groupId: string) {
        return this.forumService.joinGroup(groupId, req.user.sub);
    }

    // Post Routes
    @Post('groups/:groupId/posts')
    async createPost(
        @Request() req,
        @Param('groupId') groupId: string,
        @Body() data: {
            title: string;
            content: string;
            tags?: string[];
        },
    ) {
        return this.forumService.createPost(req.user.sub, groupId, data);
    }

    @Get('groups/:groupId/posts')
    async getGroupPosts(@Param('groupId') groupId: string) {
        return this.forumService.getGroupPosts(groupId);
    }

    @Get('posts/:id')
    async getPost(@Param('id') id: string) {
        return this.forumService.getPost(id);
    }

    // Comment Routes
    @Post('posts/:postId/comments')
    async addComment(
        @Request() req,
        @Param('postId') postId: string,
        @Body('content') content: string,
    ) {
        return this.forumService.addComment(req.user.sub, postId, content);
    }

    @Get('posts/:postId/comments')
    async getPostComments(@Param('postId') postId: string) {
        return this.forumService.getPostComments(postId);
    }

    @Delete('comments/:id')
    async deleteComment(@Request() req, @Param('id') commentId: string) {
        return this.forumService.deleteComment(req.user.sub, commentId);
    }
}