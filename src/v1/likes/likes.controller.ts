import { User } from 'src/v1/users/users.entity';
import { JwtAuthGuard } from './../../common/modules/jwt-auth/guards/jwt-auth.guard';
import {
  Controller,
  Post,
  Delete,
  Get,
  Inject,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller({ version: '1', path: 'likes' })
export class LikesController {
  @Inject(LikesService)
  likesService: LikesService;

  @UseGuards(JwtAuthGuard)
  @Post('/course/:courseId')
  createLike(
    @CurrentUser() user: User,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.likesService.create(user, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  dislike(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.likesService.delete(user.id, id);
  }

  @Get()
  getAllLikes() {
    return this.likesService.selectAll();
  }
}
