import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { ForumGroup, ForumGroupSchema } from '../schemas/forumGroup.schema';
import { ForumPost, ForumPostSchema } from '../schemas/forumPost.schema';
import { Comment, CommentSchema } from '../schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ForumGroup.name, schema: ForumGroupSchema },
      { name: ForumPost.name, schema: ForumPostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule { }