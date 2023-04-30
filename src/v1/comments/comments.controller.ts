import { CommentsService } from './comments.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/modules/jwt-auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { CreateCommentDTO, UpdateCommentDTO } from './dtos';

@Controller({ path: 'comments', version: '1' })
export class CommentsController {
  @Inject(CommentsService)
  private readonly commentsService: CommentsService;

  @Get()
  getAllComments() {
    return this.commentsService.selectAll();
  }

  @Get(':id')
  getCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.selectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(@CurrentUser() user: User, @Body() body: CreateCommentDTO) {
    return this.commentsService.create({ ...body, author: user });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateComment(
    @Body() body: UpdateCommentDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteById(id);
  }
}
